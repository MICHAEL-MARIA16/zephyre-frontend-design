import { useState } from "react";
import { ArrowRight, Camera, Brain, MapPin, Sparkles, Star, Users, Award, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";

interface LandingProps {
  onGetStarted: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Camera className="h-6 w-6" />,
      title: "AI Skin Analysis",
      description: "Advanced CNN model analyzes your skin from webcam or uploaded images",
      details: "Our proprietary AI model trained on thousands of skin images can detect 19 different skin types with up to 95% accuracy."
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Weather Integration",
      description: "Real-time weather data influences personalized skincare advice",
      details: "Weather conditions like humidity, temperature, and UV index directly affect your skin's needs throughout the day."
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Smart Recommendations",
      description: "AI-powered skincare advice tailored to your skin and environment",
      details: "Get personalized product recommendations, daily routines, and lifestyle tips based on your unique skin profile."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Executive",
      content: "Zephyre helped me understand my combination skin better. The weather-based tips are game-changing!",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Software Engineer",
      content: "Finally, an app that considers environmental factors. My skin has never looked better!",
      rating: 5
    },
    {
      name: "Dr. Emma Watson",
      role: "Dermatologist",
      content: "The AI accuracy is impressive. I recommend Zephyre to patients for daily skincare guidance.",
      rating: 5
    }
  ];

  const stats = [
    { value: "50K+", label: "Happy Users" },
    { value: "95%", label: "AI Accuracy" },
    { value: "19", label: "Skin Types" },
    { value: "24/7", label: "Weather Data" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-20 h-20 rounded-full bg-cyan-500/10 backdrop-blur-sm"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-16 h-16 rounded-full bg-purple-500/10 backdrop-blur-sm"></div>
        </div>
        <div className="absolute bottom-40 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-24 h-24 rounded-full bg-blue-500/10 backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full py-6 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Zephyre</h1>
              <p className="text-sm text-white/60">Derma AI</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              Zephyre
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-4 font-light">
              Your Weather-Powered Skincare Assistant
            </p>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover your unique skin type with AI precision and get personalized skincare recommendations 
              that adapt to your local weather conditions in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={onGetStarted}
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 text-lg rounded-full"
              >
                Start Your Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full"
                onClick={() => {
                  const learnMoreText = `
"Beneath the clouds, your skin speaks.
Zephyre listens, with code as its conscience.
A lens, a moment, a weather-tuned whisper.
Not just advice — a ritual, reborn.
Let your skin breathe with Zephyre."

Experience the future of personalized skincare with AI-powered analysis that adapts to your environment.`;
                  alert(learnMoreText);
                }}
              >
                Learn More
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-6 text-center border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Revolutionary Skincare Technology
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Combining cutting-edge AI with environmental science for personalized skin health
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Feature List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className={`glass-card border cursor-pointer transition-all duration-300 ${
                    activeFeature === index 
                      ? 'border-cyan-400/50 bg-white/10' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${
                        activeFeature === index ? 'bg-cyan-500/20' : 'bg-white/10'
                      }`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-white/70">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Feature Detail */}
            <div className="glass-card p-8 border border-white/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg">
                  {features[activeFeature].icon}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {features[activeFeature].title}
                </h3>
              </div>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                {features[activeFeature].details}
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-white/60">
                  <Award className="h-4 w-4 mr-2" />
                  <span>Clinically tested accuracy</span>
                </div>
                <div className="flex items-center text-white/60">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Trusted by 50,000+ users</span>
                </div>
                <div className="flex items-center text-white/60">
                  <Star className="h-4 w-4 mr-2" />
                  <span>4.9/5 user satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Loved by Users Worldwide
            </h2>
            <p className="text-xl text-white/70">
              Join thousands who've transformed their skincare routine
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card border border-white/20">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/80 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-white/60 text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <div className="glass-card p-12 border border-white/20 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Skincare?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Get your personalized skincare analysis in under 2 minutes
            </p>
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-12 py-4 text-xl rounded-full"
            >
              Start Free Analysis
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <p className="text-white/50 text-sm mt-4">
              No signup required • Results in seconds • 100% private
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};