import * as React from "react";
import { ChevronDown } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface MegaMenuProps {
  width?: "full" | "half" | string;
  padding?: "sm" | "md" | "lg" | string;
  children: React.ReactNode;
}

export function MegaMenu({ padding = "md", children }: MegaMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const loading = false; // Mock loading state

  // Set mounted immediately on component mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DropdownMenu.Trigger asChild>
        {loading || !mounted ? (
          <Skeleton
            style={{
              width: "160px",
              height: "55px",
              borderRadius: "10px",
              transform: "scale(0.7)",
              backgroundColor: "#D6D9DB", // Add a visible color for light theme
            }}
          />
        ) : (
          <button
            className={cn(
              "flex items-center gap-1 px-4 py-2 mr-5 border rounded-md shadow-sm transition-colors",
              "bg-background border-border text-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Explore
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </DropdownMenu.Trigger>

      {/* Mega Menu Content */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="center"
          sideOffset={0}
          className={cn(
            "border shadow-lg max-w-6xl w-[95vw] sm:w-[90vw] lg:w-[80vw] transition-all duration-200 z-50 bg-background border-border text-foreground mx-auto left-1/2 transform translate-x-[15%]",
            padding === "sm"
              ? "p-4"
              : padding === "md"
                ? "p-6"
                : padding === "lg"
                  ? "p-8"
                  : padding,
          )}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {children}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

// Individual Column Component
MegaMenu.Column = function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-semibold text-sm mb-4 text-foreground">
        {title}
      </h3>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
};

// Menu Item Component
MegaMenu.Item = function Item({
  label,
  href,
  highlight,
}: {
  label: string;
  href: string;
  highlight?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        className={cn(
          "text-sm transition-colors text-muted-foreground hover:text-primary",
          highlight && "font-semibold text-primary",
        )}
      >
        {label}
      </a>
    </li>
  );
};

// CTA Component
MegaMenu.CTA = function CTA({
  image,
  title,
  description,
  buttonText,
  buttonLink,
}: {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 via-primary/3 to-primary/5 border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-primary/[0.02] opacity-50" />
      
      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Image with enhanced styling */}
        <div className="relative overflow-hidden rounded-lg bg-background/80 p-2">
          <img
            src={image}
            width={200}
            height={120}
            alt={title}
            className="rounded-md w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent rounded-md" />
        </div>
        
        {/* Text Content */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            Featured
          </div>
          
          <h4 className="text-lg font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h4>
          
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
        
        {/* CTA Button */}
        <a
          href={buttonLink}
          className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group-hover:scale-[1.02]"
        >
          {buttonText}
          <svg 
            className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </a>
      </div>
    </div>
  );
};