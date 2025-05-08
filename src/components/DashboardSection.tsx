
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScriptCard } from "./ScriptCard";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

export function DashboardSection() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [scripts, setScripts] = useState([
    {
      id: 1,
      title: "Morning Routine Hack",
      content: "Start your morning with this 5-minute routine that will change your life! #morningroutine #productivity #lifehack",
      trend: "Morning Routines",
      engagement: "High Engagement",
      saved: false,
    },
    {
      id: 2,
      title: "Viral Dance Challenge",
      content: "This easy dance is going viral right now! Let me show you how to do it step by step. #dancechallenge #viral #easydance",
      trend: "Dance Trends",
      engagement: "Medium Engagement",
      saved: true,
    },
    {
      id: 3,
      title: "Food Hack You Need",
      content: "This cooking hack will save you so much time in the kitchen! Wait until you see the result. #foodhack #cooking #timesaver",
      trend: "Food Hacks",
      engagement: "High Engagement",
      saved: false,
    },
  ]);

  const handleGenerateScript = () => {
    setIsGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      const newScript = {
        id: scripts.length + 1,
        title: "Shopping Haul Reaction",
        content: "I can't believe what I found at this store! Wait until you see the last item. #shoppinghaul #fashion #musthave",
        trend: "Shopping Hauls",
        engagement: "Trending",
        saved: false,
      };
      setScripts([newScript, ...scripts]);
      setIsGenerating(false);
    }, 2000);
  };

  const toggleSaveScript = (id: number) => {
    setScripts(
      scripts.map(script => 
        script.id === id ? { ...script, saved: !script.saved } : script
      )
    );
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Try Our <span className="text-gradient">Script Generator</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            See how our AI can help you create engaging TikTok content
          </p>
          <Button 
            onClick={handleGenerateScript}
            disabled={isGenerating}
            className="bg-gradient-to-r from-viral-purple to-viral-pink text-white hover:opacity-90 px-6 py-6 text-lg font-medium"
          >
            {isGenerating ? (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate New Script"
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {scripts.map((script) => (
            <ScriptCard
              key={script.id}
              title={script.title}
              content={script.content}
              trend={script.trend}
              engagement={script.engagement}
              saved={script.saved}
              onSave={() => toggleSaveScript(script.id)}
              onCopy={() => alert(`Script copied: ${script.title}`)}
              onEdit={() => alert(`Edit script: ${script.title}`)}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/demo">
            <Button className="bg-gradient-to-r from-viral-purple to-viral-pink text-white hover:opacity-90 px-8 py-2">
              Try More Features
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
