
import { useState } from "react";
import { Lightbulb, Shield, Droplets, Sun, Sparkles, ChevronDown, ChevronUp, Clock, AlertTriangle, TrendingUp, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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

  // Generate comprehensive recommendations based on skin type and weather
  const getRecommendations = () => {
    const baseRecommendations = {
      routine: {
        morning: ["Gentle cleanser", "Toner", "Serum", "Moisturizer", "Sunscreen SPF 30+"],
        evening: ["Double cleanse", "Exfoliant (2-3x/week)", "Treatment serum", "Night moisturizer", "Face oil (optional)"]
      },
      products: {
        cleanser: "Gentle foaming cleanser",
        toner: "Alcohol-free hydrating toner",
        serum: "Vitamin C serum (morning) / Retinol (evening)",
        moisturizer: "Lightweight daily moisturizer",
        sunscreen: "Broad-spectrum SPF 50",
        treatment: "Hydrating serum with hyaluronic acid",
        exfoliant: "BHA or AHA exfoliant",
        mask: "Hydrating sheet mask"
      },
      tips: [
        "Drink at least 8 glasses of water daily",
        "Use lukewarm water for cleansing",
        "Apply sunscreen 20 minutes before sun exposure",
        "Change pillowcases weekly to prevent bacteria buildup",
        "Avoid touching your face throughout the day",
        "Use a silk or satin pillowcase to reduce friction"
      ],
      lifestyle: [
        "Get 7-9 hours of quality sleep",
        "Manage stress through meditation or exercise",
        "Eat a balanced diet rich in antioxidants",
        "Avoid smoking and limit alcohol consumption"
      ],
      warnings: [],
      urgentCare: []
    };

    // Customize based on skin type with detailed recommendations
    if (skinType.includes('oily') || skinType.includes('acne_prone') || skinType.includes('pimple_prone')) {
      baseRecommendations.products.cleanser = "Salicylic acid or tea tree oil cleanser";
      baseRecommendations.products.moisturizer = "Oil-free gel moisturizer with niacinamide";
      baseRecommendations.products.serum = "Niacinamide serum (morning) / Retinol (evening)";
      baseRecommendations.products.mask = "Clay or charcoal mask";
      baseRecommendations.tips.push("Use clay masks 2-3 times per week", "Avoid over-cleansing which can strip natural oils", "Look for non-comedogenic products");
      baseRecommendations.lifestyle.push("Reduce dairy intake as it may trigger breakouts");
    } else if (skinType.includes('dry') || skinType.includes('dehydrated')) {
      baseRecommendations.products.cleanser = "Cream-based gentle cleanser or cleansing oil";
      baseRecommendations.products.moisturizer = "Rich hydrating cream with ceramides";
      baseRecommendations.products.serum = "Hyaluronic acid serum";
      baseRecommendations.products.mask = "Hydrating gel or cream mask";
      baseRecommendations.tips.push("Use a humidifier at night", "Apply moisturizer on damp skin", "Avoid hot showers", "Use facial oils as last step");
      baseRecommendations.lifestyle.push("Increase omega-3 fatty acids in diet");
    } else if (skinType.includes('sensitive') || skinType.includes('redness_rosacea') || skinType.includes('allergy_prone')) {
      baseRecommendations.products.cleanser = "Fragrance-free gentle milk cleanser";
      baseRecommendations.products.moisturizer = "Gentle, fragrance-free moisturizer";
      baseRecommendations.products.serum = "Calming serum with centella asiatica";
      baseRecommendations.products.treatment = "Soothing aloe vera gel";
      baseRecommendations.tips.push("Patch test ALL new products", "Avoid products with fragrances and alcohol", "Use lukewarm water only");
      baseRecommendations.warnings.push("Avoid retinoids and strong acids without dermatologist approval");
    } else if (skinType.includes('mature_skin') || skinType.includes('sun_damaged')) {
      baseRecommendations.products.serum = "Vitamin C (morning) / Retinol or peptides (evening)";
      baseRecommendations.products.moisturizer = "Anti-aging moisturizer with peptides";
      baseRecommendations.products.treatment = "Antioxidant-rich serum";
      baseRecommendations.tips.push("Use retinoids gradually to build tolerance", "Never skip sunscreen", "Consider professional treatments");
      baseRecommendations.lifestyle.push("Sleep on back to prevent sleep lines", "Use antioxidant-rich skincare");
    } else if (skinType.includes('hyperpigmented') || skinType.includes('uneven_tone')) {
      baseRecommendations.products.serum = "Vitamin C with kojic acid or arbutin";
      baseRecommendations.products.treatment = "Brightening serum with vitamin C";
      baseRecommendations.tips.push("Use SPF 50+ daily to prevent further pigmentation", "Be patient - results take 3-6 months");
      baseRecommendations.warnings.push("Avoid lemon juice or DIY lightening remedies");
    } else if (skinType.includes('eczema')) {
      baseRecommendations.products.cleanser = "Soap-free, pH-balanced cleanser";
      baseRecommendations.products.moisturizer = "Thick, occlusive moisturizer";
      baseRecommendations.tips.push("Moisturize immediately after cleansing", "Avoid long hot showers");
      baseRecommendations.urgentCare.push("Consult dermatologist for severe flare-ups");
    }

    // Customize based on weather conditions
    if (weather.humidity > 70) {
      baseRecommendations.products.moisturizer = "Lightweight gel moisturizer";
      baseRecommendations.tips.push("Blot excess oil during the day", "Use oil-blotting papers", "Consider mattifying primer");
      baseRecommendations.lifestyle.push("Stay in air-conditioned environments when possible");
    } else if (weather.humidity < 40) {
      baseRecommendations.products.moisturizer = "Rich hydrating cream with hyaluronic acid";
      baseRecommendations.tips.push("Use a facial mist throughout the day", "Apply multiple thin layers of moisturizer", "Use a humidifier indoors");
      baseRecommendations.lifestyle.push("Drink extra water to combat dehydration");
    }

    if (weather.temperature > 25) {
      baseRecommendations.tips.push("Seek shade during peak sun hours (10am-4pm)", "Reapply sunscreen every 2 hours", "Wear protective clothing");
      baseRecommendations.products.sunscreen = "Water-resistant SPF 50+ with zinc oxide";
      baseRecommendations.lifestyle.push("Wear wide-brimmed hats and UV-protective clothing");
    } else if (weather.temperature < 10) {
      baseRecommendations.tips.push("Use richer moisturizers", "Protect skin from wind", "Don't forget lips and hands");
      baseRecommendations.products.treatment = "Healing balm for wind-damaged areas";
    }

    if (weather.condition.toLowerCase().includes('rain') || weather.condition.toLowerCase().includes('humid')) {
      baseRecommendations.tips.push("Use waterproof sunscreen", "Carry blotting papers");
    }

    if (weather.condition.toLowerCase().includes('wind')) {
      baseRecommendations.tips.push("Use barrier creams", "Protect with scarves or face coverings");
      baseRecommendations.warnings.push("Wind can cause micro-tears in sensitive skin");
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

        {/* Lifestyle Tips */}
        <RecommendationSection
          title="Lifestyle & Wellness"
          icon={<Heart className="h-5 w-5 text-pink-400" />}
          sectionKey="lifestyle"
        >
          <div className="space-y-2">
            {recommendations.lifestyle.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 bg-pink-500/10 rounded-lg p-3">
                <Heart className="h-4 w-4 text-pink-400 mt-0.5 flex-shrink-0" />
                <p className="text-white/80 text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </RecommendationSection>

        {/* Pro Tips */}
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

        {/* Warnings */}
        {recommendations.warnings.length > 0 && (
          <RecommendationSection
            title="Important Warnings"
            icon={<AlertTriangle className="h-5 w-5 text-orange-400" />}
            sectionKey="warnings"
          >
            <div className="space-y-2">
              {recommendations.warnings.map((warning, index) => (
                <div key={index} className="flex items-start space-x-3 bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                  <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white/80 text-sm">{warning}</p>
                </div>
              ))}
            </div>
          </RecommendationSection>
        )}

        {/* Urgent Care */}
        {recommendations.urgentCare.length > 0 && (
          <RecommendationSection
            title="Seek Professional Care"
            icon={<TrendingUp className="h-5 w-5 text-red-400" />}
            sectionKey="urgent"
          >
            <div className="space-y-2">
              {recommendations.urgentCare.map((care, index) => (
                <div key={index} className="flex items-start space-x-3 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <TrendingUp className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-white/80 text-sm">{care}</p>
                </div>
              ))}
            </div>
          </RecommendationSection>
        )}

        {/* Progress Tracking */}
        <RecommendationSection
          title="Track Your Progress"
          icon={<Clock className="h-5 w-5 text-green-400" />}
          sectionKey="tracking"
        >
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Expected Timeline</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Week 1-2</span>
                  <Progress value={25} className="flex-1 mx-3 h-2" />
                  <span className="text-white/70 text-sm">Adjustment period</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Week 3-4</span>
                  <Progress value={50} className="flex-1 mx-3 h-2" />
                  <span className="text-white/70 text-sm">Initial improvements</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Week 6-8</span>
                  <Progress value={75} className="flex-1 mx-3 h-2" />
                  <span className="text-white/70 text-sm">Visible changes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Week 12+</span>
                  <Progress value={100} className="flex-1 mx-3 h-2" />
                  <span className="text-white/70 text-sm">Optimal results</span>
                </div>
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <p className="text-white/80 text-sm">
                <strong>Pro tip:</strong> Take weekly photos in the same lighting to track your progress objectively.
              </p>
            </div>
          </div>
        </RecommendationSection>
      </CardContent>
    </Card>
  );
};
