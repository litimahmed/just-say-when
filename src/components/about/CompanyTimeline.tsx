import { Badge } from "@/components/ui/badge";
import { Rocket, Award, Globe, Users, Zap, Target } from "lucide-react";

const CompanyTimeline = () => {
  const milestones = [
    {
      year: "2019",
      title: "Foundation & Vision",
      description: "Founded with a mission to make quality education accessible worldwide through innovative technology.",
      icon: <Rocket className="w-5 h-5" />
    },
    {
      year: "2020",
      title: "Platform Launch",
      description: "Launched our first learning platform with 10 foundational courses and 1,000 beta users.",
      icon: <Zap className="w-5 h-5" />
    },
    {
      year: "2021",
      title: "Global Expansion",
      description: "Expanded to 25 countries with multilingual support and reached 10,000 active learners.",
      icon: <Globe className="w-5 h-5" />
    },
    {
      year: "2022",
      title: "Industry Recognition",
      description: "Received 'EdTech Innovation Award' and established partnerships with leading universities.",
      icon: <Award className="w-5 h-5" />
    },
    {
      year: "2023",
      title: "Community Milestone",
      description: "Reached 50,000 learners across 40 countries with 95% satisfaction rate and 300+ courses.",
      icon: <Users className="w-5 h-5" />
    },
    {
      year: "2024",
      title: "AI-Powered Learning",
      description: "Launched personalized AI tutoring and adaptive learning paths, serving 100,000+ students.",
      icon: <Target className="w-5 h-5" />
    }
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Our Journey</Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Building the Future Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From a small team with a big vision to a global platform transforming lives, 
            every milestone represents our commitment to educational excellence.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-6 relative">
                {/* Timeline line */}
                {index !== milestones.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-20 bg-border" />
                )}
                
                {/* Icon */}
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <div className="text-primary-foreground">
                    {milestone.icon}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-4 mb-3">
                    <Badge variant="secondary" className="font-semibold">
                      {milestone.year}
                    </Badge>
                    <h3 className="text-xl font-heading font-semibold">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyTimeline;