import { Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
        <Construction className="w-8 h-8 text-primary" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        <p className="text-muted-foreground max-w-md">
          {description || "This feature is coming soon! We're working hard to bring you an amazing experience."}
        </p>
      </div>
      <div className="text-sm text-muted-foreground">
        Stay tuned for updates
      </div>
    </div>
  );
}