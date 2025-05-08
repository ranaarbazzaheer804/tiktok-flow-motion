
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      alert("Signup functionality requires backend integration");
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md glass-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Start your <span className="text-gradient">Free Trial</span>
            </CardTitle>
            <CardDescription className="text-center">
              Create an account to start generating viral TikTok content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full name</label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                  className="transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="hello@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="transition-all duration-200"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <div className="h-5 w-5 mt-0.5 rounded-full bg-viral-purple flex items-center justify-center text-white">
                    <Check className="h-3 w-3" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-viral-purple to-viral-pink text-white hover:opacity-90" 
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Start Free Trial"} 
                {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-viral-purple hover:underline">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Signup;
