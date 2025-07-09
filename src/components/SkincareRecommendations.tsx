
import { useState } from "react";
import { Lightbulb, Shield, Droplets, Sun, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { WeatherData } from "@/pages/Index";

interface SkincareRecommendationsProps {
  skinType: string;
  weather: WeatherData;
}

export const SkincareRecommendations: React.FC<SkincareRecommendationsProps> = ({ 
  skinType, 
  weather 
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['routine']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  // Generate recommendations based on skin type and weather
  const getRecommendations = () => {
    const baseRecommendations = {
      routine: {
        morning: ["Gentle cleanser", "Moisturizer", "Sunscreen SPF 30+"],
        evening: ["Cleansing oil", "Night moisturizer", "Treatment serum"]
      },
      products: {
        cleanser: "Gentle foaming cleanser",
        moisturizer: "Lightweight daily moisturizer",
        sunscreen: "Broad-spectrum SPF 50",
        treatment: "Hydrating serum"
      },
      tips: [
        "Stay hydrated throughout the day",
        "Use lukewarm water for cleansing",
        "Apply sunscreen 20 minutes before sun exposure"
      ]
    };

    // Customize based on skin type
    if (skinType.includes('oily')) {
      baseRecommendations.products.cleanser = "Salicylic acid cleanser";
      baseRecommendations.products.moisturizer = "Oil-free gel moisturizer";
      baseRecommendations.tips.push("Use clay masks 1-2 times per week");
    } else if (skinType.includes('dry')) {
      baseRecommendations.products.cleanser = "Cream-based gentle cleanser";
      baseRecommendations.products.moisturizer = "Rich hydrating cream";
      baseRecommendations.tips.push("Use a humidifier at night");
    } else if (skinType.includes('sensitive')) {
      baseRecommendations.products.cleanser = "Fragrance-free gentle cleanser";
      baseRecommendations.products.treatment = "Soothing aloe vera gel";
      baseRecommendations.tips.push("Patch test new products before use");
    }

    // Customize based on weather
    if (weather.humidity > 70) {
      baseRecommendations.products.moisturizer = "Lightweight gel moisturizer";
      baseRecommendations.tips.push("Blot excess oil during the day");
    } else if (weather.humidity < 40) {
      baseRecommendations.products.moisturizer = "Rich hydrating cream";
      baseRecommendations.tips.push("Use a facial mist throughout the day");
    }

    if (weather.temperature > 25) {
      baseRecommendations.tips.push("Seek shade during peak sun hours (10am-4pm)");
      baseRecommendations.products.sunscreen = "Water-resistant SPF 50+";
    }

    return baseRecommendations;
  };

  const recommendations = getRecommendations();

  const getWeatherImpact = () => {
    const impacts = [];
    
    if (weather.humidity > 70) {
      impacts.push("High humidity may increase oil production");
    } else if (weather.humidity < 40) {
      impacts.push("Low humidity may cause skin dehydration");
    }
    
    if (weather.temperature > 25) {
      impacts.push("Hot weather increases UV exposure risk");
    } else if (weather.temperature < 15) {
      impacts.push("Cold weather may cause skin dryness");
    }
    
    return impacts;
  };

  const weatherImpacts = getWeatherImpact();

  const RecommendationSection = ({ 
    title, 
    icon, 
    sectionKey, 
    children 
  }: { 
    title: string;
    icon: React.ReactNode;
    sectionKey: string;
    children: React.ReactNode;
  }) => {
    const isExpanded = expandedSections.has(sectionKey);
    
    return (
      <div className="border border-white/10 rounded-lg overflow-hidden">
        <Button
          variant="ghost"
          onClick={() => toggleSection(sectionKey)}
          className="w-full p-4 flex items-center justify-between text-white hover:bg-white/5"
        >
          <div className="flex items-center space-x-3">
            {icon}
            <span className="font-medium">{title}</span>
          </div>
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
        
        {isExpanded && (
          <div className="p-4 pt-0 border-t border-white/10">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="glass-card border-white/20 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Sparkles className="h-5 w-5" />
          <span>Personalized Skincare Plan</span>
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
            {skinType.replace('_', ' ')}
          </Badge>
          <Badge variant="secondary" className="bg-green-500/20 text-green-300">
            {weather.condition} Weather
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Daily Routine */}
        <RecommendationSection
          title="Daily Routine"
          icon={<Sun className="h-5 w-5 text-yellow-400" />}
          sectionKey="routine"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2 flex items-center">
                <Sun className="h-4 w-4 mr-2 text-yellow-400" />
                Morning Routine
              </h4>
              <ul className="space-y-1">
                {recommendations.routine.morning.map((step, index) => (
                  <li key={index} className="text-white/80 text-sm flex items-center">
                    <span className="w-5 h-5 bg-yellow-500/20 rounded-full flex items-center justify-center text-xs text-yellow-300 mr-2">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2 flex items-center">
                <span className="h-4 w-4 mr-2 text-purple-400">🌙</span>
                Evening Routine
              </h4>
              <ul className="space-y-1">
                {recommendations.routine.evening.map((step, index) => (
                  <li key={index} className="text-white/80 text-sm flex items-center">
                    <span className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center text-xs text-purple-300 mr-2">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RecommendationSection>

        {/* Product Recommendations */}
        <RecommendationSection
          title="Recommended Products"
          icon={<Droplets className="h-5 w-5 text-blue-400" />}
          sectionKey="products"
        >
          <div className="grid gap-3">
            {Object.entries(recommendations.products).map(([category, product]) => (
              <div key={category} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                <div>
                  <div className="text-white/60 text-xs uppercase tracking-wide">
                    {category.replace('_', ' ')}
                  </div>
                  <div className="text-white text-sm">{product}</div>
                </div>
                <Shield className="h-4 w-4 text-green-400" />
              </div>
            ))}
          </div>
        </RecommendationSection>

        {/* Weather-Based Tips */}
        {weatherImpacts.length > 0 && (
          <RecommendationSection
            title="Weather-Based Adjustments"
            icon={<span className="text-lg">🌤️</span>}
            sectionKey="weather"
          >
            <div className="space-y-2">
              {weatherImpacts.map((impact, index) => (
                <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <p className="text-white/80 text-sm">{impact}</p>
                </div>
              ))}
            </div>
          </RecommendationSection>
        )}

        {/* General Tips */}
        <RecommendationSection
          title="Pro Tips"
          icon={<Lightbulb className="h-5 w-5 text-yellow-400" />}
          sectionKey="tips"
        >
          <div className="space-y-2">
            {recommendations.tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 bg-white/5 rounded-lg p-3">
                <Lightbulb className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-white/80 text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </RecommendationSection>
      </CardContent>
    </Card>
  );
};
