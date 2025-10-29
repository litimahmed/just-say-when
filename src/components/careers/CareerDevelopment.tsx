import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  BookOpen, 
  Users, 
  Award, 
  Globe, 
  Target,
  ArrowRight,
  Calendar,
  DollarSign
} from "lucide-react";

const CareerDevelopment = () => {
  const developmentPrograms = [
    {
      icon: Users,
      title: "Mentorship Program",
      description: "Get paired with senior team members for personalized career guidance",
      features: ["One-on-one monthly sessions", "Goal setting & tracking", "Cross-functional exposure"],
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      icon: BookOpen,
      title: "Learning & Development",
      description: "Annual budget for courses, certifications, and skill development",
      features: ["$2,000 annual learning budget", "Internal training sessions", "Conference attendance"],
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      icon: Globe,
      title: "International Exposure",
      description: "Opportunities to work with global teams and attend international events",
      features: ["Exchange programs", "Global conference sponsorship", "Cross-border projects"],
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    },
    {
      icon: Award,
      title: "Leadership Development",
      description: "Fast-track program for emerging leaders in Algeria's tech sector",
      features: ["Leadership workshops", "Management training", "Strategic project ownership"],
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/20"
    }
  ];

  const careerPaths = [
    {
      role: "Software Engineer",
      levels: [
        { title: "Junior Engineer", salary: "120K - 180K DZD", timeframe: "0-2 years" },
        { title: "Mid-Level Engineer", salary: "180K - 280K DZD", timeframe: "2-4 years" },
        { title: "Senior Engineer", salary: "280K - 420K DZD", timeframe: "4-7 years" },
        { title: "Tech Lead", salary: "420K - 600K DZD", timeframe: "7+ years" }
      ]
    },
    {
      role: "Product Manager",
      levels: [
        { title: "Associate PM", salary: "150K - 220K DZD", timeframe: "0-2 years" },
        { title: "Product Manager", salary: "220K - 350K DZD", timeframe: "2-5 years" },
        { title: "Senior PM", salary: "350K - 500K DZD", timeframe: "5-8 years" },
        { title: "Director of Product", salary: "500K+ DZD", timeframe: "8+ years" }
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-accent/5">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Career Development & Growth
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to your professional growth. Our comprehensive development programs 
              help you build skills, advance your career, and become a leader in Algeria's tech ecosystem.
            </p>
          </div>

          {/* Development Programs */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {developmentPrograms.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${program.bgColor}`}>
                        <IconComponent className={`w-6 h-6 ${program.color}`} />
                      </div>
                      <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                        {program.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {program.description}
                    </p>
                    <div className="space-y-2">
                      {program.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Career Progression Paths */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Career Progression Examples
              </h3>
              <p className="text-muted-foreground">
                Clear paths for advancement with transparent salary bands
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {careerPaths.map((path, pathIndex) => (
                <Card key={pathIndex} className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      {path.role} Career Path
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {path.levels.map((level, levelIndex) => (
                      <div key={levelIndex} className="relative">
                        <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
                          <div className="space-y-1">
                            <h4 className="font-medium text-foreground">{level.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                {level.salary}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {level.timeframe}
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Level {levelIndex + 1}
                          </Badge>
                        </div>
                        {levelIndex < path.levels.length - 1 && (
                          <div className="flex justify-center py-2">
                            <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Skills Development Tracker */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Skills Development Framework
                  </h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    We track and support your skill development across technical, leadership, and cultural competencies.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground text-center">Technical Skills</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Programming</span>
                          <span className="text-primary">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">System Design</span>
                          <span className="text-primary">70%</span>
                        </div>
                        <Progress value={70} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Cloud Technologies</span>
                          <span className="text-primary">60%</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground text-center">Leadership</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Team Management</span>
                          <span className="text-primary">75%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Strategic Thinking</span>
                          <span className="text-primary">65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Communication</span>
                          <span className="text-primary">90%</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground text-center">Cultural Competency</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Arabic Proficiency</span>
                          <span className="text-primary">95%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">French Proficiency</span>
                          <span className="text-primary">80%</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Global Awareness</span>
                          <span className="text-primary">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button>
                    Learn More About Our Development Programs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerDevelopment;