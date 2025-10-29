import React from "react";
import { motion } from "framer-motion";
import { Crown, CheckCircle, Trophy, Flashlight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const objectifs = [
  { icon: <Crown size={16} />, text: "Meilleure expérience" },
  { icon: <Flashlight size={16} />, text: "Faciliter La Vie" },
  { icon: <CheckCircle size={16} />, text: "Répondre au besoins" },
  { icon: <Trophy size={16} />, text: "Valeur ajoutée" },
  { icon: <Flashlight size={16} />, text: "Rapidité" },
  { icon: <CheckCircle size={16} />, text: "Support fiable" },
  { icon: <Crown size={16} />, text: "Formation Premium" },
  { icon: <Trophy size={16} />, text: "Certifications Officielles" },
];

const Pill = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <div className="flex items-center gap-2 text-sm shadow-sm px-4 py-2 rounded-full border whitespace-nowrap bg-card text-card-foreground border-border">
    <span className="text-primary">{icon}</span>
    <span>{text}</span>
  </div>
);

const LOOP_DURATION = 100; // seconds

const ObjectifsSkeleton = () => (
  <div className="overflow-hidden w-full py-16 bg-gradient-to-r from-background to-muted/20">
    <div className="max-w-6xl mx-auto px-6 text-center pb-15">
      <Skeleton className="h-6 w-32 mx-auto mb-2 bg-primary/30" />
      <div className="space-y-3">
        <Skeleton className="h-8 w-64 mx-auto bg-gradient-to-r from-muted/70 to-muted/50" />
        <Skeleton className="h-6 w-96 mx-auto bg-muted/50" />
      </div>
    </div>

    <div className="relative mx-auto max-w-6xl pt-6">
      {[0, 1].map((rowIndex) => (
        <div key={rowIndex} className="overflow-hidden relative h-[56px] mb-4">
          <div className="flex gap-4 w-max">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton 
                key={i} 
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-full h-10 w-32 animate-fade-in bg-muted/60" 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface ObjectifsProps {
  loading?: boolean;
}

export default function Objectifs({ loading = false }: ObjectifsProps) {
  if (loading) {
    return <ObjectifsSkeleton />;
  }

  const fullList = [...objectifs, ...objectifs]; // repeat for seamless loop

  const getAnimation = (reverse = false) => ({
    x: reverse ? ["0%", "-100%"] : ["-100%", "0%"],
  });

  return (
    <div className="overflow-hidden w-full py-16 bg-gradient-to-r from-background to-muted/20">
      <div className="max-w-6xl mx-auto px-6 text-center pb-15">
        <p className="text-sm font-normal mb-2 uppercase tracking-wider border px-3 py-1 inline-block rounded-md text-primary border-primary">
          Our Objectifs
        </p>
        <h2 className="text-3xl font-bold mt-4 mb-2 text-foreground">
          Our Core <span className="text-primary">Values</span>
        </h2>
        <p className="text-xl text-muted-foreground">
          We deliver accessible, high-quality learning that empowers everyone to
          grow, achieve, and succeed.
        </p>
      </div>

      <div className="relative mx-auto max-w-6xl pt-6">
        {[0, 1].map((rowIndex) => (
          <div
            key={rowIndex}
            className="overflow-hidden relative h-[56px] mb-4"
          >
            <motion.div
              className="flex gap-4 w-max absolute"
              animate={getAnimation(rowIndex % 2 !== 0)}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                duration: LOOP_DURATION,
              }}
              style={{
                left: rowIndex % 2 !== 0 ? "100%" : "-100%", // Start position for seamless looping
              }}
            >
              {/* Duplicate list to create infinite effect */}
              {[
                ...fullList,
                ...fullList,
                ...fullList,
                ...fullList,
                ...fullList,
                ...fullList,
              ].map((item, index) => (
                <Pill key={`${rowIndex}-${index}`} {...item} />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}