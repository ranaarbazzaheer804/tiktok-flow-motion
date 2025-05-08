
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader, Copy, RefreshCw } from "lucide-react";

const Demo = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState("trend");
  const [generatedScript, setGeneratedScript] = useState("");
  
  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGeneratedScript("");
    
    // Simulate AI generation
    setTimeout(() => {
      const scripts = [
        "This morning routine hack changed my life! ☀️ I used to always feel tired, but now I have so much energy! #morningroutine #productivity #lifehack",
        "I can't believe this fashion trick works! 👗 Watch until the end to see the transformation. #fashion #stylingtips #outfithack",
        "POV: You discover the food hack that's breaking the internet right now! 🍕 Tag someone who needs to see this #foodie #kitchenhack #viral",
        "This simple beauty trick will save you so much money! 💄 I used to spend $50 but now I only spend $5! #beauty #moneysaver #beautyhack"
      ];
      
      setGeneratedScript(scripts[Math.floor(Math.random() * scripts.length)]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedScript);
    alert("Copied to clipboard!");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Try Our <span className="text-gradient">Script Generator</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              See how our AI can create viral TikTok scripts for you in seconds
            </p>
          </div>
          
          <div className="glass-card p-6 md:p-8 mb-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium mb-2">
                  What would you like to create content about?
                </label>
                <Input
                  id="prompt"
                  placeholder="e.g., morning routine, fashion tips, cooking hack"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="content-type" className="block text-sm font-medium mb-2">
                  Content Type
                </label>
                <Select
                  value={contentType}
                  onValueChange={setContentType}
                >
                  <SelectTrigger id="content-type" className="w-full">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trend">Trending Content</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="product">Product Showcase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-gradient-to-r from-viral-purple to-viral-pink text-white hover:opacity-90"
              >
                {isGenerating ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Script
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {generatedScript && (
            <Card className="mb-12 glass-card overflow-hidden">
              <div className="p-3 bg-viral-purple/10 border-b border-viral-purple/20 flex items-center justify-between">
                <h3 className="font-medium">Generated TikTok Script</h3>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleCopy}
                    className="h-8"
                  >
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copy
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleGenerate}
                    className="h-8"
                    disabled={isGenerating}
                  >
                    <RefreshCw className={`h-3.5 w-3.5 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
                    Regenerate
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <Textarea 
                  value={generatedScript} 
                  readOnly 
                  className="min-h-[100px] text-lg leading-relaxed"
                />
              </CardContent>
            </Card>
          )}
          
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Ready to create unlimited viral scripts?
            </p>
            <Button className="bg-gradient-to-r from-viral-purple to-viral-pink text-white hover:opacity-90 px-8">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Demo;
