import * as React from "react";
import { useState } from "react";
import * as Toggle from "@radix-ui/react-toggle";
import { cn } from "@/lib/utils";
import {
  SiGoogle,
  SiApple,
  SiAmazon,
  SiMeta,
  SiNetflix,
  SiSpotify,
  SiAdobe,
  SiTesla,
} from "react-icons/si";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const BrandsSkeleton = () => (
  <section className="w-full pt-1 pb-10 flex flex-col items-center text-center px-4 bg-background text-foreground">
    <div className="max-w-4xl">
      <section className="text-center px-4 py-12 text-foreground">
        {/* Tagline Skeleton */}
        <Skeleton className="h-4 w-64 mx-auto mb-4 bg-muted/60" />
        
        {/* "We support" Skeleton */}
        <Skeleton className="h-10 w-32 mx-auto mb-4 bg-gradient-to-r from-muted/70 to-muted/50" />
        
        {/* "grXXXwing" Section Skeleton */}
        <div className="flex justify-center items-center gap-2 mb-2 flex-wrap">
          <Skeleton className="h-16 w-16 bg-muted/60" />
          <Skeleton className="h-12 w-24 rounded-full bg-primary/30" />
          <Skeleton className="h-16 w-20 bg-muted/60" />
        </div>
        
        {/* "of your business" Skeleton */}
        <Skeleton className="h-10 w-48 mx-auto mb-4 bg-gradient-to-r from-muted/70 to-muted/50" />
        
        {/* Description Skeleton */}
        <div className="space-y-2 mt-4">
          <Skeleton className="h-4 w-72 mx-auto bg-muted/50" />
          <Skeleton className="h-4 w-80 mx-auto bg-muted/40" />
        </div>
      </section>

      {/* Buttons Skeleton */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">
        <Skeleton className="h-12 w-48 rounded-full bg-primary/40" />
        <Skeleton className="h-6 w-32 bg-muted/50" />
      </div>

      {/* Brand Icons Skeleton */}
      <div className="flex flex-wrap justify-center items-center gap-14 text-center">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex flex-col items-center animate-fade-in">
            <Skeleton className="w-10 h-10 rounded bg-muted/60" />
            <Skeleton className="h-4 w-16 mt-2 bg-muted/40" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

interface BrandsProps {
  loading?: boolean;
}

export default function Brands({ loading = false }: BrandsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  if (loading) {
    return <BrandsSkeleton />;
  }

  return (
    <section className="w-full pt-1 pb-10 flex flex-col items-center text-center px-4 bg-background text-foreground">
      <div className="max-w-4xl">
        <section className="text-center px-4 py-12 text-foreground">
          {/* Line 1: subtle tagline */}
          <p className="text-[0.7rem] font-medium tracking-widest uppercase mb-4 text-muted-foreground">
            Consulting, Programming & Design
          </p>

          {/* Line 2: mid-sized "We support" */}
          <h2 className="text-3xl sm:text-4xl font-[500] text-foreground">
            We support
          </h2>

          <div className="flex justify-center items-center gap-2 mb-2 flex-wrap text-5xl sm:text-6xl md:text-7xl font-[500] leading-tight text-foreground">
            <span>gr</span>
            <Toggle.Root
              className={cn(
                "relative top-2 h-12 w-24 rounded-full border-[8px] border-primary bg-transparent shadow-lg cursor-default "
              )}
              disabled
              pressed={false}
            >
              <div className="h-9 w-9 relative bottom-[1px] left-11 bg-white rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.70)]" />
            </Toggle.Root>
            <span>wing</span>
          </div>

          {/* Line 4: back to chill */}
          <h3 className="text-3xl sm:text-4xl font-[500] text-foreground">
            of your business
          </h3>

          <p className="mt-4 text-sm text-muted-foreground">
            We turn great ideas into working products. <br />
            We focus on good communication and understanding your business.
          </p>
        </section>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">
          <button 
            onClick={() => navigate('/partner-application')}
            className="bg-primary hover:bg-primary/90 transition-colors text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-md cursor-pointer"
          >
            Become a partner
          </button>
          <button 
            onClick={() => navigate('/about')}
            className="font-medium underline underline-offset-4 transition cursor-pointer text-foreground hover:text-foreground/80"
          >
            More about us
          </button>
        </div>

        {/* Placeholder brand icons */}
        <div className="flex flex-wrap justify-center items-center gap-14 text-center">
          <div className="flex flex-col items-center">
            <SiGoogle color="#4285F4" size={40} />
            <span className="text-sm mt-2 text-muted-foreground">
              Google
            </span>
          </div>
          <div className="flex flex-col items-center">
            <SiApple color={isDark ? "#FFFFFF" : "#000000"} size={40} />
            <span className="text-sm mt-2 text-muted-foreground">
              Apple
            </span>
          </div>
          <div className="flex flex-col items-center">
            <SiAmazon color="#FF9900" size={40} />
            <span className="text-sm mt-2 text-muted-foreground">
              Amazon
            </span>
          </div>
          <div className="flex flex-col items-center">
            <SiMeta color="#0866FF" size={40} />
            <span className="text-sm mt-2 text-muted-foreground">
              Meta
            </span>
          </div>
          <div className="flex flex-col items-center">
            <SiNetflix color="#E50914" size={40} />
            <span className="text-sm mt-2 text-muted-foreground">
              Netflix
            </span>
          </div>
          <div className="flex flex-col items-center">
            <SiSpotify color="#1DB954" size={40} />
            <span className="text-sm mt-2 text-muted-foreground">
              Spotify
            </span>
          </div>
          <div className="flex flex-col items-center">
            <SiAdobe color="#FF0000" size={40} />
            <span className="text-sm mt-2 text-muted-foreground">
              Adobe
            </span>
          </div>
          <div className="flex flex-col items-center">
            <SiTesla color={isDark ? "#FFFFFF" : "#CC0000"} size={40} />
            <span className="text-sm mt-2 text-muted-foreground">
              Tesla
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}