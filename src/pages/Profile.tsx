import { useState } from "react";
import { User, Calendar, TrendingUp, History, Download, Share2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProfileProps {
  onBack: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    joinDate: "March 2024",
    totalAnalyses: 23,
    currentSkinType: "combination",
    skinScore: 78,
    improvementRate: 12
  };

  const analysisHistory = [
    {
      date: "2024-01-15",
      skinType: "combination",
      confidence: 89,
      weather: "Sunny, 22°C",
      location: "New York"
    },
    {
      date: "2024-01-10",
      skinType: "oily",
      confidence: 76,
      weather: "Humid, 28°C",
      location: "New York"
    },
    {
      date: "2024-01-05",
      skinType: "combination",
      confidence: 84,
      weather: "Cloudy, 18°C",
      location: "New York"
    },
    {
      date: "2024-01-01",
      skinType: "oily",
      confidence: 82,
      weather: "Rainy, 15°C",
      location: "New York"
    }
  ];

  const skinProgress = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 70 },
    { month: "Mar", score: 75 },
    { month: "Apr", score: 78 }
  ];

  const achievements = [
    {
      title: "Consistency Champion",
      description: "Completed 10 analyses",
      earned: true,
      icon: "🏆"
    },
    {
      title: "Weather Warrior",
      description: "Analyzed in 5 different weather conditions",
      earned: true,
      icon: "🌦️"
    },
    {
      title: "Skin Scientist",
      description: "Tracked progress for 30 days",
      earned: false,
      icon: "🔬"
    },
    {
      title: "Perfect Score",
      description: "Achieved 90%+ confidence score",
      earned: true,
      icon: "⭐"
    }
  ];

  const getSkinTypeColor = (skinType: string) => {
    const colorMap: Record<string, string> = {
      'normal': 'bg-green-500',
      'oily': 'bg-yellow-500',
      'dry': 'bg-orange-500',
      'combination': 'bg-purple-500',
      'sensitive': 'bg-red-500'
    };
    return colorMap[skinType] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
          >
            ← Back to Dashboard
          </Button>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Profile Header */}
        <Card className="glass-card border-white/20 mb-8">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">{userData.name}</h1>
                <p className="text-white/60 mb-4">Member since {userData.joinDate}</p>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{userData.totalAnalyses}</div>
                    <div className="text-white/60 text-sm">Analyses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">{userData.skinScore}</div>
                    <div className="text-white/60 text-sm">Skin Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">+{userData.improvementRate}%</div>
                    <div className="text-white/60 text-sm">Improvement</div>
                  </div>
                </div>
              </div>
              <Badge className={`${getSkinTypeColor(userData.currentSkinType)} text-white px-4 py-2`}>
                {userData.currentSkinType.toUpperCase()} SKIN
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-white/20">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white/20">
              Overview
            </TabsTrigger>
            <TabsTrigger value="history" className="text-white data-[state=active]:bg-white/20">
              History
            </TabsTrigger>
            <TabsTrigger value="progress" className="text-white data-[state=active]:bg-white/20">
              Progress
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-white data-[state=active]:bg-white/20">
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Current Skin Status */}
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Current Skin Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Skin Type</span>
                    <Badge className={`${getSkinTypeColor(userData.currentSkinType)} text-white`}>
                      {userData.currentSkinType}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Overall Health Score</span>
                      <span className="text-cyan-400 font-bold">{userData.skinScore}/100</span>
                    </div>
                    <Progress value={userData.skinScore} className="h-2 bg-white/20" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Improvement Rate</span>
                      <span className="text-green-400 font-bold">+{userData.improvementRate}%</span>
                    </div>
                    <Progress value={userData.improvementRate} className="h-2 bg-white/20" />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Analysis */}
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Latest Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">January 15, 2024</span>
                      <Badge className="bg-blue-500/20 text-blue-300">89% Confidence</Badge>
                    </div>
                    <div className="text-white/70 text-sm">
                      <p>Weather: Sunny, 22°C</p>
                      <p>Location: New York</p>
                      <p>Detected: Combination skin</p>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                    View Full Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <History className="h-5 w-5 mr-2" />
                  Analysis History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisHistory.map((analysis, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">
                          {new Date(analysis.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                        <Badge className={`${getSkinTypeColor(analysis.skinType)} text-white`}>
                          {analysis.skinType}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-white/60">Confidence</span>
                          <p className="text-white">{analysis.confidence}%</p>
                        </div>
                        <div>
                          <span className="text-white/60">Weather</span>
                          <p className="text-white">{analysis.weather}</p>
                        </div>
                        <div>
                          <span className="text-white/60">Location</span>
                          <p className="text-white">{analysis.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Skin Health Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-4 gap-4">
                    {skinProgress.map((data, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-cyan-400 mb-1">{data.score}</div>
                        <div className="text-white/60 text-sm">{data.month}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white/5 rounded-lg p-6">
                    <h4 className="text-white font-medium mb-4">Progress Insights</h4>
                    <ul className="space-y-2 text-white/80 text-sm">
                      <li>• Your skin health has improved by 20% over the last 4 months</li>
                      <li>• Most consistent improvement seen in hydration levels</li>
                      <li>• Weather adaptation strategies are working effectively</li>
                      <li>• Continue current routine for optimal results</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card 
                  key={index} 
                  className={`glass-card border ${
                    achievement.earned ? 'border-yellow-400/50 bg-yellow-500/10' : 'border-white/20'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`text-4xl ${achievement.earned ? 'grayscale-0' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold mb-1 ${
                          achievement.earned ? 'text-yellow-400' : 'text-white/60'
                        }`}>
                          {achievement.title}
                        </h3>
                        <p className="text-white/70 text-sm">
                          {achievement.description}
                        </p>
                        {achievement.earned && (
                          <Badge className="bg-yellow-500/20 text-yellow-400 mt-2">
                            Earned
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};