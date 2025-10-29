import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, TrendingUp, Users, Globe, BookOpen } from "lucide-react";

const WhyWorkWithUs = () => {
  const reasons = [
    {
      icon: Target,
      title: "Mission-Driven Impact",
      description: "Contribute directly to Algeria's Vision 2030 digital transformation goals while building a meaningful career.",
      highlight: "National Development"
    },
    {
      icon: Heart,
      title: "Social Purpose",
      description: "Democratize education across all 48 wilayas, making quality learning accessible to every Algerian.",
      highlight: "Educational Equity"
    },
    {
      icon: TrendingUp,
      title: "Rapid Growth Environment",
      description: "Join a fast-scaling company with unprecedented career advancement opportunities in Algeria's tech sector.",
      highlight: "Career Acceleration"
    },
    {
      icon: Users,
      title: "Diverse & Inclusive Culture",
      description: "Work in a multilingual environment (Arabic, French, English) that celebrates Algeria's rich cultural diversity.",
      highlight: "Cultural Integration"
    },
    {
      icon: Globe,
      title: "Government Partnerships",
      description: "Collaborate with the Ministry of Education and other institutions on projects of national importance.",
      highlight: "Strategic Impact"
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Access to international training, certifications, and conferences to stay at the forefront of educational technology.",
      highlight: "Skill Development"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-accent/5">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Formacad?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join a company that's not just building software, but building the future of education in Algeria. 
              Here's what makes us different.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Icon & Highlight */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {reason.highlight}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {reason.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-background border border-border rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Currently hiring across all departments in Algiers, Oran, and Constantine
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;