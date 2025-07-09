
import { Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full py-6 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Zephyre</h2>
            <p className="text-sm text-white/60">Derma AI</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#analysis" className="text-white/80 hover:text-white transition-colors">
            Analysis
          </a>
          <a href="#weather" className="text-white/80 hover:text-white transition-colors">
            Weather
          </a>
          <a href="#recommendations" className="text-white/80 hover:text-white transition-colors">
            Recommendations
          </a>
        </nav>
      </div>
    </header>
  );
};
