import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star, MapPin, Calendar } from "lucide-react";

// Import avatar images
import avatarFatima from "@/assets/avatar-fatima.jpg";
import avatarHassan from "@/assets/avatar-hassan.jpg";
import avatarAhmad from "@/assets/avatar-ahmad.jpg";
import avatarNicolas from "@/assets/avatar-nicolas.jpg";

const EmployeeTestimonials = () => {
  const testimonials = [
    {
      name: "Amina Benali",
      role: "Senior Frontend Developer",
      location: "Algiers",
      avatar: avatarFatima,
      joinDate: "2022",
      rating: 5,
      quote: "Joining Formacad was a career-defining moment. I've grown from a junior developer to leading major product features. The mentorship program and learning budget helped me master React and TypeScript. Most importantly, I'm proud to contribute to Algeria's digital transformation.",
      highlights: ["3 promotions in 2 years", "Led 5 major features", "Conference speaker"]
    },
    {
      name: "Yacine Mammeri",
      role: "DevOps Engineer",
      location: "Oran",
      avatar: avatarHassan,
      joinDate: "2021",
      rating: 5,
      quote: "The remote-first culture allows me to work from Oran while collaborating with the Algiers team seamlessly. I've built our entire cloud infrastructure from scratch and learned cutting-edge technologies. The work-life balance respects our cultural values.",
      highlights: ["Built scalable infrastructure", "AWS certified", "Reduced costs by 40%"]
    },
    {
      name: "Sarah Khelifi",
      role: "Product Manager",
      location: "Constantine",
      avatar: avatarFatima,
      joinDate: "2023",
      rating: 5,
      quote: "As a Product Manager, I shape products used by thousands of Algerian students. The company invests heavily in my professional development - I attended PMI conferences in Dubai and Paris. The impact we create motivates me every day.",
      highlights: ["Launched 3 major products", "PMI certified", "Increased user retention 45%"]
    },
    {
      name: "Karim Boumediene",
      role: "Content Developer",
      location: "Algiers",
      avatar: avatarAhmad,
      joinDate: "2022",
      rating: 5,
      quote: "Working in educational content allows me to combine my passion for Arabic language with technology. I've developed curriculum used across Algeria's schools. The multilingual environment and cultural sensitivity make this the perfect workplace for me.",
      highlights: ["Created 50+ courses", "Reached 100K+ students", "Arabic ed-tech expert"]
    },
    {
      name: "Lina Cherif",
      role: "UX Designer",
      location: "Remote",
      avatar: avatarFatima,
      joinDate: "2023",
      rating: 5,
      quote: "The design culture here is incredible. I work on products that truly matter - making education accessible to students in remote areas of Algeria. The team trusts my creative vision and provides resources to execute world-class designs.",
      highlights: ["Redesigned entire platform", "Awards winner", "Accessibility champion"]
    },
    {
      name: "Omar Taleb",
      role: "Business Development",
      location: "Algiers",
      avatar: avatarNicolas, 
      joinDate: "2021",
      rating: 5,
      quote: "I've helped establish partnerships with 50+ educational institutions across Algeria. The sales training and government relations experience I've gained here are invaluable. Plus, the competitive compensation and benefits package exceeded my expectations.",
      highlights: ["50+ partnerships", "200% quota achievement", "Government relations expert"]
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Hear From Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from Formacad employees about their career growth, 
              work experience, and the impact they're making in Algeria's education sector.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-8 h-8 text-primary" />
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                      <p className="text-sm text-primary font-medium">{testimonial.role}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {testimonial.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Since {testimonial.joinDate}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-sm text-muted-foreground leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-foreground uppercase tracking-wide">
                      Key Achievements
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {testimonial.highlights.map((highlight, highlightIndex) => (
                        <Badge key={highlightIndex} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">4.9</div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">95%</div>
                    <div className="text-sm text-muted-foreground">Employee Satisfaction</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">18 months</div>
                    <div className="text-sm text-muted-foreground">Average Promotion Time</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">3.2 years</div>
                    <div className="text-sm text-muted-foreground">Average Tenure</div>
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

export default EmployeeTestimonials;