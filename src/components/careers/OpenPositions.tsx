import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, Users, ExternalLink } from "lucide-react";

const OpenPositions = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("tech");

  const positions = {
    tech: [
      {
        title: "Senior Frontend Developer",
        location: "Algiers",
        type: "Full-time",
        experience: "3-5 years",
        skills: ["React", "TypeScript", "Tailwind CSS"],
        description: "Lead the development of our next-generation learning platform with modern web technologies.",
        urgent: true
      },
      {
        title: "Backend Engineer",
        location: "Remote/Algiers",
        type: "Full-time", 
        experience: "2-4 years",
        skills: ["Node.js", "PostgreSQL", "Docker"],
        description: "Build scalable APIs and microservices to support millions of learners across Algeria."
      },
      {
        title: "DevOps Engineer",
        location: "Algiers",
        type: "Full-time",
        experience: "3-6 years", 
        skills: ["AWS", "Kubernetes", "Terraform"],
        description: "Optimize our infrastructure for scale and reliability across North African markets."
      },
      {
        title: "Mobile App Developer",
        location: "Oran",
        type: "Full-time",
        experience: "2-5 years",
        skills: ["React Native", "iOS", "Android"],
        description: "Develop mobile learning experiences optimized for Algerian internet infrastructure."
      },
      {
        title: "UI/UX Designer",
        location: "Remote",
        type: "Full-time",
        experience: "2-4 years",
        skills: ["Figma", "Design Systems", "User Research"],
        description: "Design intuitive interfaces that work across diverse Algerian user demographics."
      }
    ],
    education: [
      {
        title: "Arabic Content Developer",
        location: "Algiers",
        type: "Full-time",
        experience: "3-5 years",
        skills: ["Arabic Linguistics", "Curriculum Design", "EdTech"],
        description: "Create engaging Arabic educational content aligned with Algerian curriculum standards."
      },
      {
        title: "Curriculum Designer",
        location: "Constantine",
        type: "Full-time",
        experience: "4-7 years",
        skills: ["Pedagogy", "Assessment Design", "LMS"],
        description: "Design comprehensive learning paths for professional development and university preparation."
      },
      {
        title: "Educational Technology Specialist",
        location: "Algiers",
        type: "Full-time",
        experience: "2-4 years",
        skills: ["Learning Analytics", "Assessment Tools", "AI in Education"],
        description: "Integrate cutting-edge educational technologies with traditional Algerian teaching methods."
      },
      {
        title: "Student Success Manager",
        location: "Remote",
        type: "Full-time",
        experience: "1-3 years",
        skills: ["Student Support", "Data Analysis", "Communication"],
        description: "Ensure student success through personalized support and intervention strategies."
      }
    ],
    business: [
      {
        title: "Enterprise Sales Manager",
        location: "Algiers",
        type: "Full-time",
        experience: "4-7 years",
        skills: ["B2B Sales", "Government Relations", "Arabic/French"],
        description: "Drive enterprise and government sales across Algeria's public and private sectors."
      },
      {
        title: "Marketing Specialist",
        location: "Oran",
        type: "Full-time",
        experience: "2-4 years",
        skills: ["Digital Marketing", "Content Strategy", "Social Media"],
        description: "Develop marketing strategies tailored to Algerian market preferences and behaviors."
      },
      {
        title: "Customer Success Manager",
        location: "Remote",
        type: "Full-time",
        experience: "2-5 years",
        skills: ["Customer Relations", "Account Management", "SaaS"],
        description: "Ensure customer satisfaction and expansion across educational institutions."
      },
      {
        title: "Business Development Representative",
        location: "Constantine",
        type: "Full-time",
        experience: "1-3 years",
        skills: ["Lead Generation", "CRM", "Communication"],
        description: "Identify and qualify new business opportunities in the education sector."
      }
    ]
  };

  const departmentCounts = {
    tech: positions.tech.length,
    education: positions.education.length,
    business: positions.business.length
  };

  return (
    <section id="open-positions" className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join our growing team and help build the future of education in Algeria. 
              We're hiring talented individuals across multiple departments.
            </p>
          </div>

          {/* Department Tabs */}
          <Tabs value={selectedDepartment} onValueChange={setSelectedDepartment} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="tech" className="relative">
                  Technology
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {departmentCounts.tech}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="education" className="relative">
                  Education
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {departmentCounts.education}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="business" className="relative">
                  Business
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {departmentCounts.business}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Positions Grid */}
            {Object.entries(positions).map(([dept, jobs]) => (
              <TabsContent key={dept} value={dept} className="mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {jobs.map((job, index) => (
                    <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                                {job.title}
                              </CardTitle>
                              {job.urgent && (
                                <Badge variant="destructive" className="text-xs">
                                  Urgent
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {job.type}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {job.experience}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {job.description}
                        </p>
                        
                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        {/* Apply Button */}
                        <div className="pt-2">
                          <Button className="w-full group" variant="outline">
                            Apply Now
                            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <div className="bg-accent/10 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Don't see the perfect role?
              </h3>
              <p className="text-muted-foreground mb-4">
                We're always looking for exceptional talent to join our mission.
              </p>
              <Button variant="outline">
                Send Us Your Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenPositions;