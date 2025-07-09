
import { TrendingUp, Info, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { SkinAnalysis } from "@/pages/Index";

interface SkinAnalysisResultsProps {
  analysis: SkinAnalysis;
}

export const SkinAnalysisResults: React.FC<SkinAnalysisResultsProps> = ({ analysis }) => {
  const getSkinTypeColor = (skinType: string) => {
    const colorMap: Record<string, string> = {
      'normal': 'bg-green-500',
      'oily': 'bg-yellow-500',
      'dry': 'bg-orange-500',
      'combination': 'bg-purple-500',
      'sensitive': 'bg-red-500',
      'acne_prone': 'bg-red-600',
      'dehydrated': 'bg-blue-500',
      'mature_skin': 'bg-indigo-500',
      'hyperpigmented_skin': 'bg-amber-600',
      'redness_rosacea': 'bg-rose-500',
      'textured': 'bg-stone-500',
      'dull_skin': 'bg-gray-500',
      'eczema': 'bg-red-400',
      'allergy_prone': 'bg-orange-400',
      'sun_damaged': 'bg-yellow-600',
      'uneven_tone': 'bg-amber-500',
      'pimple_prone': 'bg-red-500',
      'open_pores': 'bg-cyan-600',
      'healthy_skin': 'bg-emerald-500'
    };
    return colorMap[skinType] || 'bg-gray-500';
  };

  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 90) return { level: "Very High", color: "text-green-400" };
    if (confidence >= 80) return { level: "High", color: "text-blue-400" };
    if (confidence >= 70) return { level: "Good", color: "text-yellow-400" };
    return { level: "Moderate", color: "text-orange-400" };
  };

  const confidenceData = getConfidenceLevel(analysis.confidence);

  return (
    <Card className="glass-card border-white/20 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span>Skin Analysis Results</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Skin Type Display */}
        <div className="text-center">
          <Badge 
            className={`${getSkinTypeColor(analysis.skinType)} text-white text-lg px-4 py-2 mb-3`}
          >
            {analysis.skinType.replace('_', ' ').toUpperCase()}
          </Badge>
          <p className="text-white/80 text-sm">Detected Skin Type</p>
        </div>

        {/* Confidence Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white/80 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Confidence Score</span>
            </span>
            <span className={`font-bold ${confidenceData.color}`}>
              {confidenceData.level}
            </span>
          </div>
          
          <Progress 
            value={analysis.confidence} 
            className="h-3 bg-white/20"
          />
          
          <div className="flex justify-between text-sm">
            <span className="text-white/60">0%</span>
            <span className="text-white font-medium">{analysis.confidence}%</span>
            <span className="text-white/60">100%</span>
          </div>
        </div>

        {/* Analysis Notes */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">Analysis Notes</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                {analysis.additionalNotes}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
            <div className="text-2xl font-bold text-white">{analysis.confidence}%</div>
            <div className="text-xs text-white/60">Accuracy</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
            <div className="text-2xl font-bold text-white">19</div>
            <div className="text-xs text-white/60">Types Analyzed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
