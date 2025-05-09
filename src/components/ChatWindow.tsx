
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader, Sparkles, Mic } from 'lucide-react';
import { ChatMessage } from '@/types/chat';
import { VoiceInput } from './VoiceInput';
import { TypingAnimation } from './TypingAnimation';
import { toast } from 'sonner';

interface ChatWindowProps {
  initialMessages?: ChatMessage[];
  onSendMessage: (message: string) => Promise<void>;
  isProcessing: boolean;
  messages: ChatMessage[];
  title?: string;
  subtitle?: string;
}

export function ChatWindow({
  onSendMessage,
  isProcessing,
  messages,
  title = "Chat with ChatGPT AI Assistant",
  subtitle = "Powered by ChatGPT - I'll help you create viral content scripts for your platform."
}: ChatWindowProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingMessage, setCurrentTypingMessage] = useState<ChatMessage | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check if there's a new assistant message
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant') {
      setIsTyping(true);
      setCurrentTypingMessage(lastMessage);
      
      // Simulate typing completion after content is displayed
      const contentLength = lastMessage.content.length;
      const typingSpeed = 30; // ms per character
      const estimatedTime = Math.min(contentLength * typingSpeed, 3000); // Cap at 3 seconds max
      
      const timer = setTimeout(() => {
        setIsTyping(false);
        setCurrentTypingMessage(null);
      }, estimatedTime);
      
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isProcessing) return;
    
    const userInput = input.trim();
    setInput('');
    
    try {
      await onSendMessage(userInput);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message', {
        description: 'Please try again later.'
      });
    }
  };

  const handleVoiceInput = (transcript: string) => {
    setInput(transcript);
  };

  // Filter out messages that are currently being typed
  const displayMessages = isTyping && currentTypingMessage 
    ? messages.filter(m => m.id !== currentTypingMessage.id) 
    : messages;

  return (
    <div className="flex flex-col h-full glass-card overflow-hidden">
      <div className="p-4 border-b border-white/10 dark:border-white/5">
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {displayMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-viral-purple/20 text-foreground'
                  : 'bg-muted/50 text-foreground'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isTyping && currentTypingMessage && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-muted/50 text-foreground">
              <TypingAnimation text={currentTypingMessage.content} speed={30} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-white/10 dark:border-white/5">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isProcessing}
            className="flex-1"
          />
          <VoiceInput onTranscript={handleVoiceInput} disabled={isProcessing} />
          <Button 
            type="submit"
            disabled={isProcessing || !input.trim()} 
            className="bg-gradient-to-r from-viral-purple to-viral-pink"
          >
            {isProcessing ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
