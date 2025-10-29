import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Heart, Zap, Users, Coffee, Star } from "lucide-react";

const CompanyCulture = () => {
  const cultureValues = [
    {
      icon: Globe,
      title: "Global Mindset, Local Heart",
      description: "We think globally while staying deeply connected to Algerian values and traditions.",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      icon: Heart,
      title: "Education First",
      description: "Every decision we make is guided by our commitment to improving educational outcomes.",
      color: "text-red-500", 
      bgColor: "bg-red-50 dark:bg-red-950/20"
    },
    {
      icon: Zap,
      title: "Innovation & Excellence",
      description: "We constantly push boundaries while maintaining the highest standards of quality.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20"
    },
    {
      icon: Users,
      title: "Collaboration Over Competition",
      description: "We win together, learn together, and grow together as one unified team.",
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    }
  ];

  const workEnvironment = [
    {
      aspect: "Communication",
      description: "Open, transparent communication across all levels of the organization"
    },
    {
      aspect: "Decision Making", 
      description: "Data-driven decisions with input from diverse perspectives"
    },
    {
      aspect: "Learning Culture",
      description: "Continuous learning and knowledge sharing are part of our DNA"
    },
    {
      aspect: "Work-Life Integration",
      description: "Flexible schedules that respect personal commitments and cultural practices"
    },
    {
      aspect: "Recognition",
      description: "Regular acknowledgment of achievements both big and small"
    },
    {
      aspect: "Inclusivity",
      description: "Every voice matters, regardless of role, background, or experience level"
    }
  ];

  return (
    <section id="company-culture" className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Culture & Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience a workplace culture that celebrates diversity, encourages innovation, 
              and maintains strong connections to Algerian heritage and values.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {cultureValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 text-center">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${value.bgColor} mb-4`}>
                      <IconComponent className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Work Environment */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Environment Details */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  What It's Like to Work Here
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our work environment blends modern tech company culture with traditional Algerian 
                  hospitality and values. Here's what makes our workplace special:
                </p>
              </div>

              <div className="space-y-4">
                {workEnvironment.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">
                        {item.aspect}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Culture Highlights */}
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <Coffee className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      A Day in the Life
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">9:00 AM</Badge>
                      <span className="text-sm text-muted-foreground">Morning standup with Arabic coffee</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">11:00 AM</Badge>
                      <span className="text-sm text-muted-foreground">Deep focus work time</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">1:00 PM</Badge>
                      <span className="text-sm text-muted-foreground">Team lunch and cultural exchange</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">3:00 PM</Badge>
                      <span className="text-sm text-muted-foreground">Collaborative project sessions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">5:00 PM</Badge>
                      <span className="text-sm text-muted-foreground">Learning hour & knowledge sharing</span>
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-primary" />
                      Plus flexible prayer breaks and family time
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyCulture;