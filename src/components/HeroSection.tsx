
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="pt-20 pb-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Generate Viral TikTok Scripts with
              <span className="text-gradient"> ChatGPT AI</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create trending content that captivates your audience and boosts engagement.
              Our ChatGPT-powered AI analyzes trending topics to generate scripts that go viral.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-viral-purple to-viral-pink text-white hover:opacity-90 px-6 py-6 text-lg font-medium">
                  Start Free 30-Day Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" className="px-6 py-6 text-lg font-medium">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="glass-card p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-viral-purple to-viral-pink w-full"></div>
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-4 text-muted-foreground text-sm">
                  <div className="flex gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  </div>
                  <span>ChatGPT Script Generator</span>
                </div>
                <div className="mb-4 space-y-2">
                  <div className="h-6 bg-foreground/5 rounded animate-pulse w-3/4"></div>
                  <div className="h-6 bg-foreground/5 rounded animate-pulse w-full"></div>
                  <div className="h-6 bg-foreground/5 rounded animate-pulse w-2/3"></div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    Copy Script
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
