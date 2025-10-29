import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkedinIcon, TwitterIcon, MailIcon } from "lucide-react";

const LeadershipTeam = () => {
  const leaders = [
    {
      name: "Sarah Chen",
      role: "Chief Executive Officer",
      background: "Former VP of Education at Google",
      expertise: "EdTech Strategy, Global Scaling",
      avatar: "/src/assets/avatar-fatima.jpg",
      initials: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Chief Technology Officer",
      background: "Ex-Principal Engineer at Meta",
      expertise: "AI/ML, Platform Architecture",
      avatar: "/src/assets/avatar-nicolas.jpg",
      initials: "MR"
    },
    {
      name: "Dr. Emily Watson",
      role: "Chief Learning Officer",
      background: "Former Dean at Stanford Online",
      expertise: "Curriculum Design, Learning Science",
      avatar: "/src/assets/avatar-ahmad.jpg",
      initials: "EW"
    },
    {
      name: "David Kim",
      role: "Chief Operating Officer",
      background: "Ex-Director of Operations at Coursera",
      expertise: "Global Operations, Strategic Partnerships",
      avatar: "/src/assets/avatar-hassan.jpg",
      initials: "DK"
    }
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Leadership Team</Badge>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Visionaries Leading the Way
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our leadership team combines decades of experience in education, technology, 
            and business to drive innovation and deliver exceptional learning experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {leaders.map((leader, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={leader.avatar} alt={leader.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {leader.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-semibold mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">{leader.role}</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {leader.background}
                  </p>
                  <Badge variant="outline" className="text-xs mb-4">
                    {leader.expertise}
                  </Badge>
                  
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                      <LinkedinIcon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                      <TwitterIcon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                      <MailIcon className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;