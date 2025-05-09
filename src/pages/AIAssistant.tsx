
import { useState, useEffect } from 'react';
import { Layout } from "@/components/Layout";
import { ChatWindow } from "@/components/ChatWindow";
import { ChatMessage } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Copy, Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const AIAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedScript, setGeneratedScript] = useState("");
  const [platform, setPlatform] = useState("tiktok");
  
  // Initialize with a welcome message
  useEffect(() => {
    const initialMessage: ChatMessage = {
      id: uuidv4(),
      role: 'assistant',
      content: "Hi there! I'm your ChatGPT-powered AI assistant. I'll help you create a viral script for your content. What type of content are you looking to create today?",
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, []);
  
  const handleSendMessage = async (content: string) => {
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    try {
      // In a real implementation, this would call the OpenAI API
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a response based on the platform
      let responseContent = "";
      
      if (content.toLowerCase().includes("marketing") || content.toLowerCase().includes("business")) {
        responseContent = generateMarketingResponse(platform);
      } else if (content.toLowerCase().includes("review") || content.toLowerCase().includes("product")) {
        responseContent = generateReviewResponse(platform);
      } else if (content.toLowerCase().includes("educational") || content.toLowerCase().includes("learn")) {
        responseContent = generateEducationalResponse(platform);
      } else {
        responseContent = generateGenericResponse(platform);
      }
      
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Extract script content from response
      const scriptMatch = responseContent.match(/```([\s\S]*?)```/);
      if (scriptMatch && scriptMatch[1]) {
        setGeneratedScript(scriptMatch[1].trim());
      }
      
    } catch (error) {
      console.error("Error processing message:", error);
      toast.error("Failed to process message", {
        description: "There was an error processing your message. Please try again."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(generatedScript);
    toast.success("Script copied to clipboard!");
  };

  const handleSaveScript = () => {
    // In a real app, this would save to a database
    toast.success("Script saved successfully!");
  };

  const handleRegenerateScript = () => {
    // Find the last user message and resend it
    const lastUserMessage = [...messages].reverse().find(m => m.role === "user");
    if (lastUserMessage) {
      handleSendMessage(lastUserMessage.content);
    } else {
      toast.error("No previous message to regenerate from");
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">ChatGPT Script Generator</h1>
        <p className="text-muted-foreground mb-8">Create customized viral content scripts with ChatGPT AI</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Panel - Chat UI */}
          <div className="h-[70vh]">
            <ChatWindow
              messages={messages}
              onSendMessage={handleSendMessage}
              isProcessing={isProcessing}
              title="Chat with ChatGPT"
              subtitle="Our advanced AI will help you create the perfect content script"
            />
          </div>
          
          {/* Right Panel - Script Output */}
          <div className="flex flex-col h-[70vh]">
            <div className="glass-card p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Script Output</h2>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSuggestedPrompt("Create a marketing tips script for small businesses")}
                >
                  Marketing tips
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSuggestedPrompt("Write a product review video script")}
                >
                  Product review
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSuggestedPrompt("Create an educational content script about a trending topic")}
                >
                  Educational content
                </Button>
              </div>
            </div>
            
            <Card className="flex-1 overflow-hidden glass-card">
              <div className="p-3 bg-viral-purple/10 border-b border-viral-purple/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${platform === 'tiktok' ? 'bg-viral-pink' : platform === 'youtube' ? 'bg-red-500' : 'bg-blue-400'}`}></span>
                  <span className="font-medium">{platform.charAt(0).toUpperCase() + platform.slice(1)} Script</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleSaveScript}
                    className="h-8"
                    disabled={!generatedScript}
                  >
                    <Save className="h-3.5 w-3.5 mr-1" />
                    Save
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleCopyScript}
                    className="h-8"
                    disabled={!generatedScript}
                  >
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copy
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleRegenerateScript}
                    className="h-8"
                    disabled={isProcessing || messages.length <= 1}
                  >
                    <RefreshCw className={`h-3.5 w-3.5 mr-1 ${isProcessing ? 'animate-spin' : ''}`} />
                    Regenerate
                  </Button>
                </div>
              </div>
              <CardContent className="p-4 overflow-auto h-full pb-16">
                {generatedScript ? (
                  <Textarea 
                    value={generatedScript} 
                    className="min-h-[300px] text-foreground" 
                    readOnly
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Sparkles className="mx-auto h-8 w-8 mb-2 text-viral-purple opacity-50" />
                      <p>Chat with the AI assistant to generate a script</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper functions to generate mock responses based on platform
function generateMarketingResponse(platform: string) {
  if (platform === 'tiktok') {
    return "Here's a viral TikTok marketing script for small businesses:\n\n```Hey small business owners! ✨ Want to grow your audience without breaking the bank? 💰\n\nHere are 3 marketing hacks that transformed my business:\n\n1️⃣ User-generated content is GOLD! Encourage customers to tag you and repost their content. It's authentic and costs nothing! 📱\n\n2️⃣ Batch content creation on ONE day for the entire week. This saves time and keeps you consistent! ⏰\n\n3️⃣ Use trending sounds! They boost your reach by 300%! 🔊\n\nSave this if you're a small business owner! 👇 And comment your favorite marketing hack below!```";
  } else if (platform === 'youtube') {
    return "Here's a YouTube marketing script for small businesses:\n\n```[Intro - Energetic]\nWhat's up entrepreneurs! Today I'm sharing the TOP 5 marketing strategies that helped me grow my small business from ZERO to $10k per month.\n\n[Hook - First 20 seconds]\nIn this video, you'll discover the exact marketing tactics that cost me almost nothing but delivered massive ROI. And stay until the end where I'll share the one strategy that 90% of businesses get wrong!\n\n[Main Content]\n1. Content Batching System\nLet me walk you through my exact process for creating a month's worth of content in just ONE day. This saved me 15+ hours every week!\n\n2. Email Marketing Automation\nI'll show you my simple 5-email sequence that converts subscribers into customers on autopilot.\n\n3. Strategic Partnerships\nLearn how I found complementary businesses to collaborate with and double our audience reach.\n\n4. Customer Retention Program\nThe simple follow-up system that increased our repeat purchases by 78%.\n\n5. Analytics That Actually Matter\nForget vanity metrics - these are the ONLY numbers small businesses should track.\n\n[Call to Action]\nIf you're ready to implement these strategies, download my free marketing template in the description below. And don't forget to subscribe for weekly business growth tips!```";
  } else {
    return "Here's a Twitter marketing thread for small businesses:\n\n```🧵 5 free marketing tactics I used to grow my small business to $100k in revenue:\n\n1/ Audience research:\nI spent 2 weeks in Facebook groups where my ideal customers hang out. I noted their exact phrases, pain points and desires. This became my marketing language.\n\n2/ Email marketing automation:\nI created a simple welcome sequence that introduces new subscribers to my brand story and values before selling anything. 40% open rate consistently.\n\n3/ Content repurposing system:\nOne video becomes:\n- 3 short-form clips\n- 5 tweets\n- 1 blog post\n- 3 email segments\n80% less work, 4x the content.\n\n4/ Micro-testimonials:\nI ask customers one simple question after purchase: \"What was your favorite part about this product?\"\nThese one-line answers become powerful social proof across all platforms.\n\n5/ The 1:10:89 content strategy:\n1% creating original research\n10% transforming it into valuable content\n89% distributing everywhere your audience exists\n\nSave this thread for reference! What marketing tactic are you implementing next?```";
  }
}

function generateReviewResponse(platform: string) {
  if (platform === 'tiktok') {
    return "Here's a TikTok product review script:\n\n```I finally tried this viral product that's all over my FYP... and WOW 🤯\n\nI was skeptical because it's $49.99, but here's my honest review:\n\n👍 The quality is INCREDIBLE\n👍 It works exactly as advertised\n👍 Saved me SO much time\n\n👎 Shipping took 2 weeks\n👎 Packaging could be better\n\nIs it worth it? ABSOLUTELY YES! I've already ordered a second one as a gift.\n\nLink in bio if you want to try it! #honestreviews #viraltiktokproducts```";
  } else if (platform === 'youtube') {
    return "Here's a YouTube product review script:\n\n```[Intro]\nWhat's up everyone! Today we're reviewing the [Product Name] that's been taking over social media lately. I've been testing it for 3 weeks now, and I have some THOUGHTS.\n\n[Hook]\nThis product claims to [main benefit], but does it actually deliver? Stay until the end where I'll share a major flaw nobody's talking about.\n\n[Unboxing Section]\nLet's start with the unboxing experience. The packaging is [describe packaging]. Inside we have [list contents]. First impressions: the build quality feels [quality assessment].\n\n[Features Breakdown]\nNow let's break down the main features:\n1. Feature One: How it works and my experience\n2. Feature Two: Performance tests and results\n3. Feature Three: Comparison with alternatives\n\n[Pros and Cons]\nWhat I loved:\n- Pro point 1\n- Pro point 2\n- Pro point 3\n\nWhat could be improved:\n- Con point 1\n- Con point 2\n\n[Value Assessment]\nAt [price point], is it worth your money? Here's my take...\n\n[Alternative Options]\nIf you're not convinced, here are some alternatives you might want to consider...\n\n[Conclusion]\nFinal verdict: [rating out of 10] and who this product is perfect for.\n\n[Call to Action]\nIf you found this review helpful, hit that like button and subscribe for more honest product reviews. Check the description for purchase links and any discount codes I could get for you.\n\nSee you in the next video!```";
  } else {
    return "Here's a Twitter product review thread:\n\n```I spent $299 on the new [Product] that everyone's talking about. After 2 weeks of testing, here's my unfiltered review 🧵\n\n1/ First impression: The packaging is minimal but premium. Unboxing experience is satisfying but not over-engineered. The product itself feels substantial - weighing about 12oz with a sleek matte finish.\n\n2/ Setup took less than 5 minutes. The app connected instantly via Bluetooth. Interface is clean but there's a learning curve with the gesture controls.\n\n3/ Battery life: Claimed 12 hours, but I'm consistently getting 10.5 hours at 70% volume. Not bad, but slightly below advertised specs.\n\n4/ Main feature performance: Exceptional. The [key feature] works 40% faster than my previous device and the results are noticeably better. This alone might justify the price.\n\n5/ The not-so-good: Gets warm after 2hrs of continuous use. The button placement is awkward for left-handed users.\n\n6/ Price analysis: At $299 it's pricier than competitors, but the build quality and performance put it ahead. If you use this daily, the cost-per-use makes it reasonable over time.\n\n7/ Who should buy: If you value [key benefit] and use it 3+ times weekly, this is worth it. If you're a casual user, the [alternative product] at $199 might be better value.\n\nVerdict: 8.5/10 - Not perfect, but currently the best option in this category if it's within your budget.\n\nAny questions about the [Product]? Reply and I'll answer!```";
  }
}

function generateEducationalResponse(platform: string) {
  if (platform === 'tiktok') {
    return "Here's an educational TikTok script:\n\n```Did you know your brain processes visuals 60,000X faster than text? 🧠\n\nThat's why infographics go viral! Let me show you 3 psychology hacks that make information stick:\n\n1️⃣ The Rule of 3 - Our brains love patterns of three! That's why I always structure my content with 3 main points.\n\n2️⃣ The Von Restorff Effect - When something stands OUT from everything else, we remember it. That's why I highlight key words in a different color!\n\n3️⃣ The Picture Superiority Effect - We remember images way better than words. Add visuals to boost memory by 65%!\n\nSave this to remember these hacks! And follow for more psychology secrets! #LearnOnTikTok #PsychologyTricks```";
  } else if (platform === 'youtube') {
    return "Here's an educational YouTube script:\n\n```[Intro Animation with Logo]\n\n[Greeting]\nHey everyone, welcome back to the channel! Today we're diving into a fascinating topic that most schools never taught us - how compound interest actually works and why Einstein called it the 8th wonder of the world.\n\n[Hook - First 30 Seconds]\nWhat if I told you there's a mathematical formula so powerful it can turn $1,000 into $50,000 without you doing any extra work? By the end of this video, you'll understand exactly how to harness this formula in your own life.\n\n[Topic Introduction]\nCompound interest is the concept of earning interest on your interest. It sounds simple, but the implications are mind-blowing when you see the math.\n\n[Visual Explanation]\nLet me show you with this simple visualization... [explain with graphics]\n\n[Real-World Example]\nLet's look at a practical example: If you invested $200 monthly from age 25 to 65 with an 8% average return, you'd end up with over $700,000! But wait until you see what happens if you start just 5 years earlier...\n\n[Common Misconceptions]\nNow let's address the three biggest myths about compound interest that keep most people from building wealth...\n\n[Practical Applications]\nHere's how you can apply this knowledge regardless of your current financial situation...\n\n[Conclusions and Takeaways]\nTo summarize the key points we've covered today...\n\n[Call to Action]\nIf you found this helpful, hit that like button and subscribe for more financial education. Check out our free compound interest calculator in the description below.\n\nSee you in the next video!```";
  } else {
    return "Here's an educational Twitter thread:\n\n```The 80/20 Rule is the most powerful concept I've ever learned.\n\nHere's how it can transform your productivity, business, and life in 5 minutes 🧵\n\n1/ What is it? The Pareto Principle states that 80% of results come from 20% of causes.\n\n• 80% of your output comes from 20% of your effort\n• 80% of revenue comes from 20% of clients\n• 80% of problems come from 20% of sources\n\n2/ How to apply it to productivity:\n\nAnalyze your daily tasks. Which 20% create 80% of your impact?\n\nI tracked my work for 2 weeks and discovered writing + 3 client calls produced more results than everything else combined.\n\n3/ How to apply it to business:\n\nIdentify which 20% of:\n• Products generate 80% of profit\n• Marketing channels drive 80% of leads\n• Features deliver 80% of user value\n\nThen reallocate resources accordingly.\n\n4/ How to apply it to learning:\n\nIn any subject, 20% of concepts unlock 80% of practical use cases.\n\nExample: In a language, learning the 1,000 most common words gives you ~85% comprehension.\n\n5/ How to apply it to problem-solving:\n\nIdentify the vital few (20%) problems causing most issues. Solving these high-leverage problems creates cascading benefits.\n\n6/ Warning: This isn't exactly 80/20 every time. Sometimes it's 90/10 or 70/30. The principle is what matters - outcomes are rarely distributed equally.\n\n7/ Implementation steps:\n1. Identify your desired outcome\n2. List all inputs contributing to that outcome\n3. Measure the impact of each input\n4. Double down on the vital few\n5. Minimize or eliminate the trivial many\n\nThis simple approach will transform your results.\n\nSave this thread for reference!```";
  }
}

function generateGenericResponse(platform: string) {
  if (platform === 'tiktok') {
    return "Here's a general viral TikTok script:\n\n```🤯 This is the HACK that no one is talking about! 🤯\n\nI discovered something that changed EVERYTHING for me and I had to share...\n\n[Pause for effect]\n\nDid you know that [interesting fact/statistic]? Most people have NO idea this exists!\n\nHere's what you need to do:\n\nStep 1: [Simple action step]\nStep 2: [Simple action step with unexpected twist]\nStep 3: [Final action step with benefit]\n\nI was SHOCKED by the results! I went from [before state] to [improved state] in just [timeframe]!\n\nTry this and comment your results below! Save this for later ⬇️\n\n#viralhack #gamechangertips #learntok```";
  } else if (platform === 'youtube') {
    return "Here's a general viral YouTube script:\n\n```[Dramatic Intro - 0:00-0:15]\n[Sound effect or attention-grabbing statement]\nWhat I'm about to show you changed everything for me, and I'm still shocked more people don't know about this...\n\n[Hook - 0:15-0:45]\nIn this video, I'll reveal the exact method that [promising result]. This isn't some theory - I've personally used this to [credibility-building statement], and I've helped [number] others do the same.\n\n[Quick Channel Plug - 0:45-1:00]\nBefore we dive in, if you're new here, I post videos every week about [channel topic]. Make sure to subscribe and hit the notification bell so you don't miss anything!\n\n[Content Overview - 1:00-2:00]\nHere's what we're covering today:\n1. Why traditional approaches to [topic] don't work\n2. The step-by-step method that actually gets results\n3. Real examples and case studies\n4. How you can start implementing this today\n\n[Main Content - 2:00-8:00]\n[Deliver on the promise with valuable information, demonstrations, examples, etc.]\n\n[Addressing Objections - 8:00-9:30]\nNow, you might be thinking...\n[Address 2-3 common objections or questions]\n\n[Call to Action - 9:30-10:00]\nIf you found this helpful, smash that like button and let me know in the comments if you're going to try this method! For more videos like this, check out the playlist linked in the description.\n\n[End Screen - 10:00-10:15]\nThanks for watching! See you in the next one!```";
  } else {
    return "Here's a general viral Twitter thread:\n\n```I spent 6 months analyzing 100+ viral tweets.\n\nHere are the 7 patterns that create viral content (with examples) 🧵\n\n1/ Start with a powerful hook\nBad: \"I think productivity is important\"\nGood: \"I built a 7-figure business working just 5hrs/day\"\n\nYour first line needs to stop the scroll.\n\n2/ Use the AIDA framework:\n• Attention: Bold claim or surprising fact\n• Interest: Specific details that intrigue\n• Desire: Show benefits/transformation\n• Action: Tell readers what to do next\n\nThis structure keeps readers engaged.\n\n3/ The ideal formula:\n• Promise a specific benefit\n• Show your credibility\n• Deliver practical value\n• Make it scannable\n\nExample: \"I've helped 50+ founders raise $10M. Here are the 5 slides every pitch deck needs:\"\n\n4/ Visual pattern interrupts boost engagement by 400%:\n• Emojis as bullet points\n• Line breaks between ideas\n• Numbers (lists perform best)\n• Special characters like → and •\n\nPattern breaks make content digestible.\n\n5/ Counterintuitive insights perform best:\n• Challenge common beliefs\n• Share uncommon knowledge\n• Reveal insider secrets\n• Break established \"rules\"\n\nPeople share content that makes them look smart or in-the-know.\n\n6/ End with a clear call-to-action:\n• Ask a question\n• Suggest saving the thread\n• Request comments\n• Link to more resources\n\nEngagement signals boost algorithm reach.\n\n7/ Optimize your timing:\n• Tweet when your audience is online\n• Space your thread 1-2 minutes between posts\n• Respond to early comments\n• Quote tweet yourself after 8 hours\n\nThis maximizes initial velocity.\n\nWant more content creation tips? Follow me for daily advice on building your audience.\n\nAnd if you found this useful, RT the first tweet to share with others!```";
  }
}

export default AIAssistant;
