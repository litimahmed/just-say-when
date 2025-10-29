import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Heart, Shield, Lightbulb, Users, Target, Zap } from "lucide-react";

const CoreValues = () => {
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Student-First Approach",
      description: "Every decision we make prioritizes the learning experience and success of our students."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Excellence & Quality",
      description: "We maintain the highest standards in content, technology, and educational outcomes."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation & Creativity",
      description: "We constantly explore new ways to make learning more engaging and effective."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Inclusive Community",
      description: "We foster an environment where every learner feels welcomed, supported, and valued."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Results-Driven",
      description: "We measure success by the real-world impact and career advancement of our learners."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Continuous Improvement",
      description: "We embrace feedback and constantly evolve to serve our community better."
    }
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Our Values</Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            What Drives Us Forward
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our core values shape every aspect of our platform, from the courses we create 
            to the community we build and the impact we strive to make.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;