import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  GraduationCap, 
  Users, 
  Globe, 
  BookOpen, 
  Award,
  TrendingUp,
  MapPin,
  Target,
  Lightbulb,
  Clock
} from "lucide-react";

const SocialImpact = () => {
  const impactMetrics = [
    {
      icon: Users,
      metric: "250,000+",
      description: "Students Reached",
      color: "text-blue-500",
      progress: 85
    },
    {
      icon: GraduationCap,
      metric: "48",
      description: "Wilayas Covered",
      color: "text-green-500", 
      progress: 100
    },
    {
      icon: BookOpen,
      metric: "1,200+",
      description: "Courses Created",
      color: "text-purple-500",
      progress: 75
    },
    {
      icon: Award,
      metric: "95%",
      description: "Course Completion Rate",
      color: "text-orange-500",
      progress: 95
    }
  ];

  const initiatives = [
    {
      title: "Free Education for Underserved Communities",
      description: "Providing free access to quality education in rural and economically disadvantaged areas across Algeria.",
      impact: "50,000+ students from low-income families",
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950/20"
    },
    {
      title: "University Partnership Program",
      description: "Collaborating with Algerian universities to enhance curriculum and provide practical skills training.",
      impact: "25+ universities, 15,000+ students",
      icon: GraduationCap,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      title: "Digital Literacy Initiative",
      description: "Teaching essential digital skills to help bridge the digital divide in Algeria.",
      impact: "100,000+ citizens trained in digital skills",
      icon: Globe,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      title: "Teacher Training & Support",
      description: "Empowering Algerian educators with modern teaching methodologies and educational technology.",
      impact: "5,000+ teachers trained nationwide",
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    }
  ];

  const governmentProjects = [
    {
      ministry: "Ministry of Education",
      project: "National Digital Learning Platform",
      status: "Active",
      impact: "2M+ students across primary and secondary education"
    },
    {
      ministry: "Ministry of Higher Education",
      project: "University Curriculum Modernization",
      status: "In Progress",
      impact: "30+ universities, 500+ programs updated"
    },
    {
      ministry: "Ministry of Vocational Training",
      project: "Professional Skills Development",
      status: "Planning",
      impact: "Target: 100,000+ professionals by 2025"
    }
  ];

  const volunteerPrograms = [
    {
      program: "Code for Education",
      description: "Employees volunteer to teach programming to high school students",
      commitment: "2 hours/month",
      participants: "25+ employees"
    },
    {
      program: "Digital Mentorship",
      description: "One-on-one mentoring for aspiring tech professionals",
      commitment: "4 hours/month", 
      participants: "15+ employees"
    },
    {
      program: "Community Workshops",
      description: "Weekend workshops on digital literacy and entrepreneurship",
      commitment: "1 day/quarter",
      participants: "40+ employees"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-accent/5">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Social Impact & Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              At Formacad, your work contributes to Algeria's educational transformation and social development. 
              Join us in making a meaningful impact on millions of lives across the nation.
            </p>
          </div>

          {/* Impact Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {impactMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <Card key={index} className="text-center border-border/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto">
                        <IconComponent className={`w-8 h-8 ${metric.color}`} />
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-foreground">{metric.metric}</div>
                        <div className="text-sm text-muted-foreground">{metric.description}</div>
                      </div>
                      <div className="space-y-1">
                        <Progress value={metric.progress} className="h-2" />
                        <div className="text-xs text-muted-foreground">Goal Achievement</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Impact Initiatives */}
          <div className="space-y-8 mb-16">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Our Impact Initiatives
              </h3>
              <p className="text-muted-foreground">
                Programs that make a real difference in Algerian communities
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {initiatives.map((initiative, index) => {
                const IconComponent = initiative.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${initiative.bgColor}`}>
                            <IconComponent className={`w-6 h-6 ${initiative.color}`} />
                          </div>
                          <div className="flex-1 space-y-2">
                            <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                              {initiative.title}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {initiative.description}
                            </p>
                          </div>
                        </div>
                        <div className="bg-accent/10 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-foreground">Impact:</span>
                            <span className="text-sm text-muted-foreground">{initiative.impact}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Government Partnerships */}
          <div className="mb-16">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Globe className="w-6 h-6 text-primary" />
                  Government Partnership Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {governmentProjects.map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-accent/5 rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium text-foreground">{project.project}</h4>
                        <Badge variant={project.status === 'Active' ? 'default' : project.status === 'In Progress' ? 'secondary' : 'outline'} className="text-xs">
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.ministry}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-primary">{project.impact}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Employee Volunteer Programs */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">
                  Employee Volunteer Programs
                </h3>
                <p className="text-muted-foreground">
                  Make a difference in your community while developing new skills and connections.
                </p>
              </div>

              <div className="space-y-4">
                {volunteerPrograms.map((program, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-foreground">{program.program}</h4>
                          <Badge variant="outline" className="text-xs">
                            {program.participants}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {program.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {program.commitment}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-8 h-full flex flex-col justify-center">
                <div className="text-center space-y-6">
                  <Lightbulb className="w-16 h-16 text-primary mx-auto" />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      Ready to Make an Impact?
                    </h3>
                    <p className="text-muted-foreground">
                      Join a team that's transforming education and creating opportunities 
                      for millions of Algerians. Your skills can change lives.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Button size="lg" className="w-full">
                      Explore Career Opportunities
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                      Learn About Our Mission
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    💡 Employees get 8 hours of paid volunteer time per month
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

export default SocialImpact;