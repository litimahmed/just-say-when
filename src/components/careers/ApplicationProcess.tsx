import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Users, 
  Code, 
  Handshake, 
  CheckCircle, 
  Clock,
  ArrowRight,
  Mail,
  Phone,
  Calendar
} from "lucide-react";

const ApplicationProcess = () => {
  const processSteps = [
    {
      step: 1,
      icon: FileText,
      title: "Application Submission",
      duration: "Same day",
      description: "Submit your application with resume, portfolio, and cover letter through our careers portal.",
      details: [
        "Complete online application form",
        "Upload resume (PDF preferred)",
        "Include portfolio or GitHub links",
        "Write personalized cover letter"
      ],
      tips: "Highlight your experience with Arabic/French languages and any educational technology background."
    },
    {
      step: 2,
      icon: Users,
      title: "Initial Screening",
      duration: "3-5 days",
      description: "HR team reviews applications and conducts initial phone/video screening with qualified candidates.",
      details: [
        "Application review by hiring team",
        "30-minute phone/video call with HR",
        "Basic qualification verification",
        "Cultural fit assessment"
      ],
      tips: "Be prepared to discuss your motivation for joining Formacad and your understanding of Algeria's education sector."
    },
    {
      step: 3,
      icon: Code,
      title: "Technical Assessment",
      duration: "1 week",
      description: "Technical evaluation tailored to your role - coding challenges, design tasks, or case studies.",
      details: [
        "Take-home technical assignment",
        "Technical interview with team leads",
        "Problem-solving scenarios",
        "Discussion of past projects"
      ],
      tips: "Focus on clean, well-documented code. Consider local context in product/design decisions."
    },
    {
      step: 4,
      icon: Handshake,
      title: "Final Interview",
      duration: "3-5 days",
      description: "Meet with potential teammates and leadership to assess team fit and discuss career goals.",
      details: [
        "Panel interview with team members",
        "Meet with direct manager",
        "Leadership interview (senior roles)",
        "Q&A about company culture"
      ],
      tips: "Ask thoughtful questions about career growth, team dynamics, and our mission in Algeria."
    },
    {
      step: 5,
      icon: CheckCircle,
      title: "Offer & Onboarding",
      duration: "2-3 days",
      description: "Receive offer with competitive package and begin comprehensive onboarding program.",
      details: [
        "Verbal offer discussion",
        "Written offer with full details",
        "Contract negotiation if needed",
        "30-60-90 day onboarding plan"
      ],
      tips: "Don't hesitate to negotiate - we want you to be excited about joining our team!"
    }
  ];

  const assessmentTypes = {
    technical: [
      { role: "Software Engineer", assessment: "Coding challenge + system design" },
      { role: "DevOps Engineer", assessment: "Infrastructure scenarios + automation" },
      { role: "UI/UX Designer", assessment: "Design challenge + portfolio review" },
      { role: "Data Scientist", assessment: "Data analysis + ML case study" }
    ],
    business: [
      { role: "Product Manager", assessment: "Product case study + strategy discussion" },
      { role: "Sales Representative", assessment: "Sales scenario + market analysis" },
      { role: "Marketing Specialist", assessment: "Campaign design + market research" },
      { role: "Content Developer", assessment: "Content creation + curriculum design" }
    ]
  };

  return (
    <section className="py-16 md:py-24 bg-accent/5">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Application Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our hiring process is designed to be thorough yet efficient, ensuring a great fit 
              for both you and our team. Here's what to expect at each stage.
            </p>
          </div>

          {/* Process Timeline */}
          <div className="space-y-8 mb-16">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-3 gap-6 items-start">
                      {/* Step Info */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <Badge variant="outline" className="text-xs mb-2">
                              Step {step.step}
                            </Badge>
                            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                              {step.title}
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                              <Clock className="w-4 h-4" />
                              {step.duration}
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-foreground">What to Expect:</h4>
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-muted-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tips */}
                      <div className="bg-accent/10 rounded-lg p-4">
                        <h4 className="font-medium text-foreground mb-2">💡 Pro Tip:</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.tips}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Assessment Types */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Code className="w-5 h-5 text-primary" />
                  Technical Roles Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assessmentTypes.technical.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
                    <span className="font-medium text-foreground">{item.role}</span>
                    <span className="text-sm text-muted-foreground">{item.assessment}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Users className="w-5 h-5 text-primary" />
                  Business Roles Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assessmentTypes.business.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-accent/5 rounded-lg">
                    <span className="font-medium text-foreground">{item.role}</span>
                    <span className="text-sm text-muted-foreground">{item.assessment}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Contact & FAQ */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact */}
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Questions About the Process?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our HR team is here to help guide you through every step of the application process.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    careers@formacad.dz
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    +213 XXX XXX XXX
                  </div>
                </div>
                <Button className="mt-6">
                  Contact HR Team
                </Button>
              </CardContent>
            </Card>

            {/* Quick Apply */}
            <Card className="border-border/50">
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Ready to Apply?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start your journey with Formacad today. Our team typically responds within 24 hours.
                </p>
                <div className="space-y-3">
                  <Button className="w-full group">
                    View Open Positions
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="w-full">
                    Submit General Application
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

export default ApplicationProcess;