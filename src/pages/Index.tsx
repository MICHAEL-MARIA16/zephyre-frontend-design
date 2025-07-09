
import { useState } from "react";
import { WebcamCapture } from "@/components/WebcamCapture";
import { WeatherCard } from "@/components/WeatherCard";
import { SkinAnalysisResults } from "@/components/SkinAnalysisResults";
import { SkincareRecommendations } from "@/components/SkincareRecommendations";
import { Header } from "@/components/Header";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Cloud, Sun, CloudRain } from "lucide-react";

export interface SkinAnalysis {
  skinType: string;
  confidence: number;
  additionalNotes: string;
}

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  description: string;
}

const Index = () => {
  const [skinAnalysis, setSkinAnalysis] = useState<SkinAnalysis | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageCapture = async (imageData: string) => {
    setIsAnalyzing(true);
    
    // Simulate skin analysis - replace with actual ML model later
    setTimeout(() => {
      const skinTypes = [
        'normal', 'oily', 'dry', 'combination', 'sensitive', 'acne_prone',
        'dehydrated', 'mature_skin', 'hyperpigmented_skin', 'redness_rosacea',
        'textured', 'dull_skin', 'eczema', 'allergy_prone', 'sun_damaged',
        'uneven_tone', 'pimple_prone', 'open_pores', 'healthy_skin'
      ];
      
      const randomSkinType = skinTypes[Math.floor(Math.random() * skinTypes.length)];
      const confidence = Math.floor(Math.random() * 30) + 70; // 70-100%
      
      setSkinAnalysis({
        skinType: randomSkinType,
        confidence,
        additionalNotes: `Based on image analysis, your skin shows characteristics of ${randomSkinType.replace('_', ' ')} skin type.`
      });
      
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleWeatherUpdate = (weather: WeatherData) => {
    setWeatherData(weather);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-float">
          <Cloud className="h-16 w-16 text-white/20" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Sun className="h-12 w-12 text-yellow-300/30" />
        </div>
        <div className="absolute bottom-40 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <CloudRain className="h-14 w-14 text-blue-300/25" />
        </div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              Zephyre
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-2">
              Your Weather-Powered Derma AI
            </p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Advanced AI skin analysis combined with real-time weather data to provide personalized skincare recommendations
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left Column */}
            <div className="space-y-6">
              <WebcamCapture 
                onCapture={handleImageCapture}
                isAnalyzing={isAnalyzing}
              />
              
              {skinAnalysis && (
                <SkinAnalysisResults analysis={skinAnalysis} />
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <WeatherCard onWeatherUpdate={handleWeatherUpdate} />
              
              {skinAnalysis && weatherData && (
                <SkincareRecommendations 
                  skinType={skinAnalysis.skinType}
                  weather={weatherData}
                />
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Skin Analysis</h3>
              <p className="text-white/70">Advanced CNN model predicts from 19+ skin types with high accuracy</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌤️</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Weather Integration</h3>
              <p className="text-white/70">Real-time weather data influences personalized skincare advice</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Smart Recommendations</h3>
              <p className="text-white/70">AI-powered skincare advice tailored to your skin and environment</p>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="fixed bottom-6 right-6">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Index;
