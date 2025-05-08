
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export function FeatureCard({ title, description, icon, className }: FeatureCardProps) {
  return (
    <div 
      className={cn(
        "glass-card p-6 flex flex-col gap-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group",
        className
      )}
    >
      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-viral-purple/20 to-viral-pink/20 dark:from-viral-purple/30 dark:to-viral-pink/30 flex items-center justify-center text-viral-purple group-hover:shadow-glow transition-shadow duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
