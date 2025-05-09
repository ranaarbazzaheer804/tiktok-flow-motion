
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { toast } from 'sonner';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export function VoiceInput({ onTranscript, disabled = false }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== 'undefined') {
      // Check if SpeechRecognition is supported
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';
        
        recognitionInstance.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          
          onTranscript(transcript);
        };
        
        recognitionInstance.onerror = (event) => {
          console.error('Speech recognition error', event);
          setIsListening(false);
          toast.error("Voice input error", {
            description: "There was a problem with your microphone"
          });
        };
        
        recognitionInstance.onend = () => {
          setIsListening(false);
        };
        
        setRecognition(recognitionInstance);
      }
    }
    
    return () => {
      if (recognition) {
        recognition.onresult = null;
        recognition.onend = null;
        recognition.onerror = null;
        if (isListening) {
          recognition.stop();
        }
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognition) {
      toast.error("Voice input not supported", {
        description: "Your browser doesn't support voice recognition"
      });
      return;
    }
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      try {
        recognition.start();
      } catch (error) {
        console.error('Speech recognition error', error);
        setIsListening(false);
      }
    }
  };

  return (
    <Button 
      type="button" 
      variant="outline" 
      size="icon" 
      onClick={toggleListening}
      disabled={disabled}
      className={`${isListening ? 'bg-red-100 dark:bg-red-900 border-red-500' : ''}`}
    >
      {isListening ? (
        <MicOff className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
}
