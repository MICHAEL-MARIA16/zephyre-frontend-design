
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
    // Create varied recommendation pools to avoid repetition
    const tipPools = {
      hydration: [
        "Drink at least 8 glasses of water daily for optimal skin hydration",
        "Use a humidifier in your bedroom to maintain skin moisture overnight",
        "Apply serums on slightly damp skin to boost absorption",
        "Layer lightweight hydrating products instead of one heavy cream",
        "Carry a facial mist for instant hydration throughout the day",
        "Eat water-rich foods like cucumber, watermelon, and oranges",
        "Use lukewarm water for cleansing to prevent moisture loss"
      ],
      protection: [
        "Apply sunscreen 20-30 minutes before sun exposure",
        "Reapply sunscreen every 2 hours, especially after sweating",
        "Use SPF 30+ even on cloudy days as UV rays penetrate clouds",
        "Wear protective clothing and wide-brimmed hats outdoors",
        "Seek shade during peak UV hours (10am-4pm)",
        "Use lip balm with SPF to protect your lips",
        "Consider UV-blocking window film for your car and home"
      ],
      hygiene: [
        "Change pillowcases every 2-3 days to prevent bacteria buildup",
        "Clean your phone screen daily as it touches your face frequently",
        "Avoid touching your face throughout the day",
        "Use separate towels for face and body",
        "Clean makeup brushes weekly to prevent bacterial contamination",
        "Sanitize your hands before applying skincare products",
        "Use a silk or satin pillowcase to reduce friction on skin"
      ],
      application: [
        "Apply products from thinnest to thickest consistency",
        "Gently pat products into skin instead of rubbing vigorously",
        "Wait 5-10 minutes between applying different products",
        "Use upward circular motions when cleansing",
        "Don't forget your neck and décolletage in your routine",
        "Apply eye cream with your ring finger for gentle pressure",
        "Use clean hands or tools when applying skincare products"
      ]
    };

    const lifestylePools = {
      sleep: [
        "Get 7-9 hours of quality sleep for optimal skin repair",
        "Sleep on your back to prevent sleep lines and wrinkles",
        "Use a cool, dark room to promote better sleep quality",
        "Elevate your head slightly to reduce morning puffiness",
        "Establish a consistent bedtime routine for better sleep",
        "Avoid screens 1 hour before bed to improve sleep quality"
      ],
      diet: [
        "Eat a balanced diet rich in antioxidants and omega-3 fatty acids",
        "Include vitamin C-rich foods like citrus fruits and berries",
        "Consume foods high in zinc like pumpkin seeds and legumes",
        "Limit processed sugar which can cause inflammation",
        "Reduce dairy intake if you notice it triggers breakouts",
        "Include probiotics to support gut and skin health",
        "Eat foods rich in vitamin E like almonds and spinach"
      ],
      stress: [
        "Practice meditation or deep breathing for 10 minutes daily",
        "Exercise regularly to improve circulation and reduce stress",
        "Take relaxing baths with Epsom salts or essential oils",
        "Practice yoga or stretching to release tension",
        "Spend time in nature to reduce cortisol levels",
        "Journal your thoughts to process stress effectively",
        "Listen to calming music or nature sounds"
      ],
      habits: [
        "Avoid smoking and limit alcohol consumption",
        "Stay consistent with your skincare routine",
        "Don't over-exfoliate - 2-3 times per week is sufficient",
        "Remove makeup thoroughly before bed every night",
        "Take progress photos to track improvements",
        "Be patient - skincare results take 6-12 weeks to show",
        "Consult a dermatologist for persistent concerns"
      ]
    };

    // Randomly select tips to ensure variety
    const getRandomTips = (pool: string[], count: number = 4) => {
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    };

    const baseRecommendations = {
      routine: {
        morning: ["Gentle cleanser", "Hydrating toner", "Vitamin C serum", "Moisturizer", "Broad-spectrum sunscreen SPF 30+"],
        evening: ["Oil cleanser (if wearing makeup)", "Water-based cleanser", "Treatment serum", "Night moisturizer", "Face oil (optional)"]
      },
      products: {
        cleanser: "pH-balanced gentle foaming cleanser",
        toner: "Alcohol-free hydrating toner with ceramides",
        serum: "Vitamin C serum (morning) / Hyaluronic acid (evening)",
        moisturizer: "Lightweight daily moisturizer with niacinamide",
        sunscreen: "Broad-spectrum SPF 50 with zinc oxide",
        treatment: "Hydrating serum with peptides",
        exfoliant: "Gentle BHA or AHA exfoliant (2-3x/week)",
        mask: "Hydrating gel mask with aloe vera"
      },
      tips: [
        ...getRandomTips(tipPools.hydration, 2),
        ...getRandomTips(tipPools.protection, 2),
        ...getRandomTips(tipPools.hygiene, 2),
        ...getRandomTips(tipPools.application, 2)
      ],
      lifestyle: [
        ...getRandomTips(lifestylePools.sleep, 2),
        ...getRandomTips(lifestylePools.diet, 2),
        ...getRandomTips(lifestylePools.stress, 1),
        ...getRandomTips(lifestylePools.habits, 2)
      ],
      warnings: [],
      urgentCare: []
    };

    // Extensive skin type customization
    if (skinType.includes('oily') || skinType.includes('acne_prone') || skinType.includes('pimple_prone')) {
      baseRecommendations.products.cleanser = "Salicylic acid cleanser or tea tree oil foam cleanser";
      baseRecommendations.products.toner = "BHA toner with salicylic acid";
      baseRecommendations.products.serum = "Niacinamide 10% serum (morning) / Retinol 0.5% (evening)";
      baseRecommendations.products.moisturizer = "Oil-free gel moisturizer with zinc";
      baseRecommendations.products.mask = "Clay mask with bentonite or kaolin clay";
      baseRecommendations.products.treatment = "Spot treatment with benzoyl peroxide";
      baseRecommendations.tips.push(
        "Use clay masks 2-3 times per week to absorb excess oil",
        "Avoid over-cleansing which can increase oil production",
        "Look for non-comedogenic products to prevent clogged pores",
        "Use oil-blotting papers instead of touching your face",
        "Double cleanse at night to remove all makeup and sunscreen"
      );
      baseRecommendations.lifestyle.push(
        "Reduce high-glycemic foods that may trigger breakouts",
        "Change bed sheets weekly to prevent bacterial transfer"
      );
    } else if (skinType.includes('dry') || skinType.includes('dehydrated')) {
      baseRecommendations.products.cleanser = "Cream-based gentle cleanser or micellar water";
      baseRecommendations.products.toner = "Hydrating essence with hyaluronic acid";
      baseRecommendations.products.serum = "Hyaluronic acid serum with multiple molecular weights";
      baseRecommendations.products.moisturizer = "Rich cream with ceramides and squalane";
      baseRecommendations.products.mask = "Overnight hydrating mask with glycerin";
      baseRecommendations.products.treatment = "Facial oil with rosehip or argan oil";
      baseRecommendations.tips.push(
        "Apply moisturizer on slightly damp skin to lock in hydration",
        "Use a gentle, fragrance-free cleanser morning and night",
        "Layer hydrating products from thinnest to thickest",
        "Use a humidifier at night, especially in dry climates",
        "Avoid hot showers which can strip natural oils"
      );
      baseRecommendations.lifestyle.push(
        "Increase omega-3 rich foods like salmon and flaxseeds",
        "Use a hydrating face mask 2-3 times per week"
      );
    } else if (skinType.includes('sensitive') || skinType.includes('redness_rosacea') || skinType.includes('allergy_prone')) {
      baseRecommendations.products.cleanser = "Fragrance-free gentle milk cleanser";
      baseRecommendations.products.toner = "Calming toner with chamomile or calendula";
      baseRecommendations.products.serum = "Calming serum with centella asiatica or niacinamide";
      baseRecommendations.products.moisturizer = "Gentle, fragrance-free moisturizer with ceramides";
      baseRecommendations.products.treatment = "Soothing aloe vera gel or azulene serum";
      baseRecommendations.products.mask = "Calming sheet mask with oat extract";
      baseRecommendations.tips.push(
        "Patch test ALL new products on your inner arm first",
        "Avoid products with fragrances, essential oils, and alcohol",
        "Use lukewarm water only and pat skin dry gently",
        "Introduce new products one at a time",
        "Keep skincare routine simple with minimal ingredients"
      );
      baseRecommendations.warnings.push(
        "Avoid retinoids and strong acids without dermatologist guidance",
        "Be cautious with physical exfoliation - chemical is often gentler"
      );
    } else if (skinType.includes('mature_skin') || skinType.includes('sun_damaged')) {
      baseRecommendations.products.serum = "Vitamin C with ferulic acid (morning) / Retinol or bakuchiol (evening)";
      baseRecommendations.products.moisturizer = "Anti-aging moisturizer with peptides and ceramides";
      baseRecommendations.products.treatment = "Antioxidant serum with vitamin E and resveratrol";
      baseRecommendations.products.mask = "Firming mask with collagen or peptides";
      baseRecommendations.tips.push(
        "Start retinoids slowly - 2-3 times per week initially",
        "Never skip sunscreen - UV protection is anti-aging priority #1",
        "Consider professional treatments like chemical peels",
        "Use gentle upward motions when applying products",
        "Focus on neck and décolletage in your anti-aging routine"
      );
      baseRecommendations.lifestyle.push(
        "Sleep on your back to prevent sleep lines",
        "Use silk pillowcases to reduce friction on delicate skin",
        "Incorporate antioxidant-rich foods into your diet"
      );
    } else if (skinType.includes('hyperpigmented') || skinType.includes('uneven_tone')) {
      baseRecommendations.products.serum = "Vitamin C with kojic acid, arbutin, or tranexamic acid";
      baseRecommendations.products.treatment = "Brightening serum with alpha arbutin and licorice root";
      baseRecommendations.products.mask = "Brightening mask with vitamin C or kojic acid";
      baseRecommendations.tips.push(
        "Use SPF 50+ daily to prevent further pigmentation",
        "Be patient - brightening results take 3-6 months minimum",
        "Use brightening products consistently for best results",
        "Consider professional treatments like IPL or chemical peels",
        "Avoid picking at dark spots which can worsen pigmentation"
      );
      baseRecommendations.warnings.push(
        "Avoid lemon juice or DIY lightening remedies",
        "Some brightening ingredients increase sun sensitivity"
      );
    } else if (skinType.includes('eczema')) {
      baseRecommendations.products.cleanser = "Soap-free, pH-balanced gentle cleanser";
      baseRecommendations.products.moisturizer = "Thick, occlusive moisturizer with ceramides";
      baseRecommendations.products.treatment = "Barrier repair cream with niacinamide";
      baseRecommendations.tips.push(
        "Moisturize immediately after cleansing while skin is damp",
        "Avoid long hot showers which can worsen eczema",
        "Use fragrance-free laundry detergent",
        "Wear soft, breathable fabrics like cotton"
      );
      baseRecommendations.urgentCare.push(
        "Consult dermatologist for severe flare-ups",
        "Consider prescription treatments for persistent eczema"
      );
    } else if (skinType.includes('combination')) {
      baseRecommendations.products.cleanser = "Gentle gel cleanser suitable for mixed skin";
      baseRecommendations.products.moisturizer = "Lightweight gel for T-zone, cream for dry areas";
      baseRecommendations.products.treatment = "Multi-zone treatment products";
      baseRecommendations.tips.push(
        "Use different products for different areas of your face",
        "Focus clay masks only on oily T-zone",
        "Use lighter products in summer, richer in winter",
        "Pay attention to seasonal changes in your skin"
      );
    }

    // Enhanced weather-based customization
    if (weather.humidity > 70) {
      baseRecommendations.products.moisturizer = "Lightweight gel moisturizer with hyaluronic acid";
      baseRecommendations.tips.push(
        "Use oil-blotting papers throughout the day",
        "Consider a mattifying primer before makeup",
        "Switch to water-based products in humid weather",
        "Use a setting spray to control shine"
      );
      baseRecommendations.lifestyle.push("Stay in air-conditioned environments when possible");
    } else if (weather.humidity < 40) {
      baseRecommendations.products.moisturizer = "Rich hydrating cream with squalane and ceramides";
      baseRecommendations.tips.push(
        "Layer hydrating products for extra moisture",
        "Use a hydrating facial mist throughout the day",
        "Apply face oil as the last step in your routine",
        "Use a thicker night cream in low humidity"
      );
      baseRecommendations.lifestyle.push("Use a humidifier indoors, especially at night");
    }

    if (weather.temperature > 25) {
      baseRecommendations.tips.push(
        "Reapply sunscreen every 2 hours when outdoors",
        "Use water-resistant sunscreen if swimming or sweating",
        "Seek shade during peak UV hours (10am-4pm)",
        "Cool your skincare products in the fridge for soothing effect"
      );
      baseRecommendations.products.sunscreen = "Water-resistant SPF 50+ with zinc oxide and titanium dioxide";
      baseRecommendations.lifestyle.push("Wear wide-brimmed hats and UV-protective clothing");
    } else if (weather.temperature < 10) {
      baseRecommendations.tips.push(
        "Use richer, more emollient moisturizers",
        "Protect exposed skin from harsh winds",
        "Don't forget to moisturize lips, hands, and neck",
        "Use a gentle exfoliant to remove dry, flaky skin"
      );
      baseRecommendations.products.treatment = "Healing balm for wind-damaged or chapped areas";
    }

    if (weather.condition.toLowerCase().includes('rain') || weather.condition.toLowerCase().includes('humid')) {
      baseRecommendations.tips.push(
        "Use waterproof sunscreen and makeup",
        "Carry oil-blotting papers for touch-ups",
        "Consider a dehumidifier in your skincare storage area"
      );
    }

    if (weather.condition.toLowerCase().includes('wind')) {
      baseRecommendations.tips.push(
        "Use barrier creams or balms on exposed areas",
        "Protect your face with scarves or face coverings",
        "Apply extra moisturizer before going outside"
      );
      baseRecommendations.warnings.push(
        "Wind can cause micro-tears in sensitive skin",
        "Windburn can look like sunburn but requires different treatment"
      );
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
