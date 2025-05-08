
import { ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Select Your Niche",
      description: "Choose your content niche and target audience to customize script generation.",
    },
    {
      number: "02",
      title: "Generate Scripts",
      description: "Our AI analyzes trending content and creates engaging scripts tailored to your niche.",
    },
    {
      number: "03",
      title: "Edit and Customize",
      description: "Fine-tune the generated scripts to match your unique voice and style.",
    },
    {
      number: "04",
      title: "Create and Post",
      description: "Use your scripts to film TikTok videos and watch your engagement grow.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-secondary/50 dark:bg-secondary/10 transition-theme">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-gradient">GetViralFast</span> Works
          </h2>
          <p className="text-muted-foreground text-lg">
            A simple four-step process to create viral TikTok content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="glass-card p-6 h-full flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-gradient mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
