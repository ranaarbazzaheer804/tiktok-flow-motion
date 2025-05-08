
import { cn } from "@/lib/utils";

export function FloatingShape({
  className,
  size = "md",
  color = "purple",
  animationDelay = "0s",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "purple" | "blue" | "pink" | "orange";
  animationDelay?: string;
}) {
  const sizeClass = {
    sm: "h-8 w-8",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };
  
  const colorClass = {
    purple: "bg-viral-purple/20 dark:bg-viral-purple/30",
    blue: "bg-viral-blue/20 dark:bg-viral-blue/30",
    pink: "bg-viral-pink/20 dark:bg-viral-pink/30",
    orange: "bg-viral-orange/20 dark:bg-viral-orange/30",
  };
  
  return (
    <div 
      className={cn(
        "rounded-full absolute backdrop-blur-xl transition-theme", 
        sizeClass[size], 
        colorClass[color],
        className
      )}
      style={{ 
        animationDelay: animationDelay,
        animationDuration: "6s",
      }}
    />
  );
}

export function BackgroundShapes() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <FloatingShape 
        size="lg" 
        color="purple" 
        className="animate-float top-20 left-[10%] opacity-70"
      />
      <FloatingShape 
        size="md" 
        color="blue" 
        className="animate-float top-[40%] left-[20%] opacity-60 animate-delay-1000"
        animationDelay="1s"
      />
      <FloatingShape 
        size="sm" 
        color="pink" 
        className="animate-float top-[30%] left-[70%] opacity-70 animate-delay-2000"
        animationDelay="2s"
      />
      <FloatingShape 
        size="lg" 
        color="orange" 
        className="animate-float top-[70%] left-[80%] opacity-60 animate-delay-3000"
        animationDelay="3s"
      />
      <FloatingShape 
        size="md" 
        color="purple" 
        className="animate-float top-[80%] left-[15%] opacity-70 animate-delay-4000"
        animationDelay="4s"
      />
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-viral-purple/20 to-viral-blue/20 dark:from-viral-purple/10 dark:to-viral-blue/10 blur-3xl opacity-50 dark:opacity-30 -z-10"></div>
    </div>
  );
}
