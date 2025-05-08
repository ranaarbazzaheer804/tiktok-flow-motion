
import { ReactNode } from "react";
import { Header } from "./Header";
import { BackgroundShapes } from "./AnimatedShapes";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen transition-theme">
      <BackgroundShapes />
      <Header />
      <main className="pt-16">
        {children}
      </main>
      <footer className="border-t border-border transition-theme mt-20">
        <div className="container mx-auto py-8 px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xl font-bold">
              <span className="text-gradient">GetViralFast</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} GetViralFast. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
