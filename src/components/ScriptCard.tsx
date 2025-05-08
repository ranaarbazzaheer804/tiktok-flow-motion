
import { Button } from "@/components/ui/button";
import { Copy, Heart, Edit } from "lucide-react";

interface ScriptCardProps {
  title: string;
  content: string;
  trend: string;
  engagement: string;
  saved?: boolean;
  onSave?: () => void;
  onCopy?: () => void;
  onEdit?: () => void;
}

export function ScriptCard({
  title,
  content,
  trend,
  engagement,
  saved = false,
  onSave,
  onCopy,
  onEdit,
}: ScriptCardProps) {
  return (
    <div className="glass-card p-5 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{title}</h3>
        <Button
          variant="ghost"
          size="icon"
          className={saved ? "text-viral-pink" : "text-muted-foreground"}
          onClick={onSave}
        >
          <Heart className={`h-4 w-4 ${saved ? "fill-viral-pink" : ""}`} />
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground line-clamp-3">{content}</p>
      
      <div className="flex gap-2 mt-1">
        <span className="px-2 py-0.5 text-xs rounded-full bg-viral-purple/10 text-viral-purple dark:bg-viral-purple/20">
          {trend}
        </span>
        <span className="px-2 py-0.5 text-xs rounded-full bg-viral-blue/10 text-viral-blue dark:bg-viral-blue/20">
          {engagement}
        </span>
      </div>
      
      <div className="flex gap-2 mt-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={onEdit}
        >
          <Edit className="h-3.5 w-3.5 mr-2" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm" 
          className="flex-1"
          onClick={onCopy}
        >
          <Copy className="h-3.5 w-3.5 mr-2" />
          Copy
        </Button>
      </div>
    </div>
  );
}
