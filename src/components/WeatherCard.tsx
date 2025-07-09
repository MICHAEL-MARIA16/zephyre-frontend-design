
import { useState, useEffect } from "react";
import { MapPin, Thermometer, Droplets, Wind, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import type { WeatherData } from "@/pages/Index";

interface WeatherCardProps {
  onWeatherUpdate: (weather: WeatherData) => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ onWeatherUpdate }) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mockWeatherData = [
    { city: "New York", temp: 22, condition: "Sunny", humidity: 60, desc: "Clear skies with gentle breeze" },
    { city: "London", temp: 15, condition: "Cloudy", humidity: 75, desc: "Overcast with light humidity" },
    { city: "Tokyo", temp: 28, condition: "Humid", humidity: 85, desc: "Hot and humid summer day" },
    { city: "Mumbai", temp: 32, condition: "Hot", humidity: 90, desc: "Very hot and humid monsoon weather" },
    { city: "Sydney", temp: 20, condition: "Mild", humidity: 55, desc: "Pleasant spring weather" },
  ];

  const fetchWeather = async (cityName: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockData = mockWeatherData.find(
        data => data.city.toLowerCase().includes(cityName.toLowerCase())
      ) || {
        city: cityName,
        temp: Math.floor(Math.random() * 30) + 10,
        condition: ["Sunny", "Cloudy", "Rainy", "Humid", "Windy"][Math.floor(Math.random() * 5)],
        humidity: Math.floor(Math.random() * 40) + 40,
        desc: "Current weather conditions"
      };

      const weatherData: WeatherData = {
        city: mockData.city,
        temperature: mockData.temp,
        condition: mockData.condition,
        humidity: mockData.humidity,
        description: mockData.desc
      };

      setWeather(weatherData);
      onWeatherUpdate(weatherData);
      setIsLoading(false);
      toast.success(`Weather data loaded for ${weatherData.city}!`);
    }, 1000);
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city.trim());
    } else {
      toast.error("Please enter a city name");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Auto-detect location (mock)
  useEffect(() => {
    const detectLocation = () => {
      // Simulate geolocation detection
      setTimeout(() => {
        setCity("New York");
        fetchWeather("New York");
      }, 500);
    };

    detectLocation();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return '☀️';
      case 'cloudy': return '☁️';
      case 'rainy': return '🌧️';
      case 'humid': return '💧';
      case 'hot': return '🔥';
      default: return '🌤️';
    }
  };

  const getWeatherGradient = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return 'from-yellow-400 to-orange-500';
      case 'cloudy': return 'from-gray-400 to-gray-600';
      case 'rainy': return 'from-blue-400 to-blue-600';
      case 'humid': return 'from-teal-400 to-cyan-500';
      case 'hot': return 'from-red-400 to-orange-600';
      default: return 'from-blue-400 to-purple-500';
    }
  };

  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span>Weather Conditions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="flex space-x-2">
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your city..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
          <Button 
            onClick={handleSearch} 
            disabled={isLoading}
            size="sm"
          >
            {isLoading ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Weather Display */}
        {weather && (
          <div className={`rounded-lg p-6 bg-gradient-to-r ${getWeatherGradient(weather.condition)} text-white`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold">{weather.city}</h3>
                <p className="text-sm opacity-90">{weather.description}</p>
              </div>
              <div className="text-4xl">
                {getWeatherIcon(weather.condition)}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Thermometer className="h-5 w-5 mx-auto mb-1" />
                <div className="text-2xl font-bold">{weather.temperature}°C</div>
                <div className="text-xs opacity-75">Temperature</div>
              </div>
              
              <div className="text-center">
                <Droplets className="h-5 w-5 mx-auto mb-1" />
                <div className="text-2xl font-bold">{weather.humidity}%</div>
                <div className="text-xs opacity-75">Humidity</div>
              </div>
              
              <div className="text-center">
                <Wind className="h-5 w-5 mx-auto mb-1" />
                <div className="text-2xl font-bold">{weather.condition}</div>
                <div className="text-xs opacity-75">Condition</div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !weather && (
          <div className="text-center py-8">
            <div className="animate-pulse-slow text-white/60">
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <p>Fetching weather data...</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
