import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Users, BookOpen, Award, TrendingUp, Globe, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={elementRef} className="text-4xl md:text-5xl font-heading font-bold">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const ImpactStats = () => {
  const stats = [
    {
      value: 100000,
      suffix: "+",
      label: "Active Learners",
      description: "Students worldwide transforming their careers",
      icon: <Users className="w-6 h-6" />
    },
    {
      value: 500,
      suffix: "+",
      label: "Expert Courses",
      description: "Comprehensive programs across 20+ domains",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      value: 95,
      suffix: "%",
      label: "Completion Rate",
      description: "Industry-leading engagement and success",
      icon: <Award className="w-6 h-6" />
    },
    {
      value: 89,
      suffix: "%",
      label: "Career Growth",
      description: "Professionals advancing post-completion",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      value: 50,
      suffix: "+",
      label: "Countries",
      description: "Global educational impact and reach",
      icon: <Globe className="w-6 h-6" />
    },
    {
      value: 24,
      suffix: "/7",
      label: "Support",
      description: "Round-the-clock learner assistance",
      icon: <Clock className="w-6 h-6" />
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <Badge className="text-sm font-medium bg-primary/10 text-primary border-primary/20">
            Our Global Impact
          </Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            Transforming Lives Through Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            These numbers represent real people whose careers and lives have been transformed 
            through quality education and dedicated support.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-8 text-center space-y-4">
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-all duration-300">
                  {stat.icon}
                </div>
                
                {/* Number */}
                <div className="text-primary">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                
                {/* Label */}
                <div className="space-y-2">
                  <h3 className="text-xl font-heading font-semibold text-foreground">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to become part of these success stories?
          </p>
          <div className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors cursor-pointer">
            <span>Join thousands of learners worldwide</span>
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;