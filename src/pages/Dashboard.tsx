
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ScriptCard } from "@/components/ScriptCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Sparkles, TrendingUp, Zap, Plus, Loader } from "lucide-react";

const Dashboard = () => {
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

  const savedScripts = scripts.filter(script => script.saved);

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
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to your Dashboard</h1>
            <p className="text-muted-foreground">Generate and manage your viral TikTok scripts</p>
          </div>
          <Button 
            onClick={handleGenerateScript}
            disabled={isGenerating}
            className="bg-gradient-to-r from-viral-purple to-viral-pink text-white hover:opacity-90"
          >
            {isGenerating ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Generate New Script
              </>
            )}
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Scripts</TabsTrigger>
            <TabsTrigger value="saved">Saved Scripts</TabsTrigger>
            <TabsTrigger value="insights">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </TabsContent>
          <TabsContent value="saved" className="space-y-6">
            {savedScripts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't saved any scripts yet.</p>
                <Button 
                  onClick={handleGenerateScript}
                  variant="outline"
                  className="mx-auto"
                >
                  Generate a script
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedScripts.map((script) => (
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
            )}
          </TabsContent>
          <TabsContent value="insights">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Total Scripts</h3>
                  <TrendingUp className="h-5 w-5 text-viral-purple" />
                </div>
                <p className="text-3xl font-bold">{scripts.length}</p>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Saved Scripts</h3>
                  <Sparkles className="h-5 w-5 text-viral-purple" />
                </div>
                <p className="text-3xl font-bold">{savedScripts.length}</p>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Trend Score</h3>
                  <BarChart className="h-5 w-5 text-viral-purple" />
                </div>
                <p className="text-3xl font-bold">87%</p>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Generation Power</h3>
                  <Zap className="h-5 w-5 text-viral-purple" />
                </div>
                <p className="text-3xl font-bold">42/50</p>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4">Performance Analytics</h3>
              <p className="text-muted-foreground mb-8">Analytics visualization would be displayed here in a real application.</p>
              <div className="h-64 bg-foreground/5 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Analytics dashboard visualization</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
