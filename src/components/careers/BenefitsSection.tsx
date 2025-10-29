import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  Zap, 
  GraduationCap, 
  MapPin, 
  Coffee, 
  Plane,
  Shield,
  Clock,
  DollarSign,
  Users,
  Home,
  Calendar
} from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      category: "Health & Wellbeing",
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      items: [
        {
          title: "Comprehensive Health Insurance",
          description: "CNAS integration plus premium private medical coverage for you and family"
        },
        {
          title: "Mental Health Support", 
          description: "Access to counseling services and wellness programs"
        },
        {
          title: "Flexible Schedule",
          description: "Prayer time flexibility and Ramadan schedule adjustments"
        }
      ]
    },
    {
      category: "Professional Growth",
      icon: GraduationCap,
      color: "text-blue-500", 
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      items: [
        {
          title: "Learning Budget",
          description: "Annual budget for courses, certifications, and conference attendance"
        },
        {
          title: "International Training",
          description: "Opportunities to attend global conferences and training programs"
        },
        {
          title: "Mentorship Program",
          description: "Structured career development with senior team members"
        }
      ]
    },
    {
      category: "Work-Life Balance",
      icon: Clock,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20", 
      items: [
        {
          title: "Hybrid Work Model",
          description: "Flexible remote/office balance considering local infrastructure"
        },
        {
          title: "Generous PTO",
          description: "25+ vacation days plus all Algerian holidays and religious observances"
        },
        {
          title: "Family Support",
          description: "Parental leave, childcare assistance, and family event flexibility"
        }
      ]
    },
    {
      category: "Financial Benefits",
      icon: DollarSign,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
      items: [
        {
          title: "Competitive Salary",
          description: "Above-market rates in DZD with annual performance reviews"
        },
        {
          title: "Performance Bonuses",
          description: "Quarterly and annual bonuses based on individual and company performance"
        },
        {
          title: "Stock Options",
          description: "Equity participation in Formacad's growth and success"
        }
      ]
    },
    {
      category: "Office Perks",
      icon: Coffee,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      items: [
        {
          title: "Modern Workspaces",
          description: "State-of-the-art offices in Algiers, Oran, and Constantine"
        },
        {
          title: "Daily Meals",
          description: "Subsidized lunch and unlimited snacks, coffee, and tea"
        },
        {
          title: "Transportation",
          description: "Company shuttles or transportation allowances"
        }
      ]
    },
    {
      category: "Culture & Community",
      icon: Users,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
      items: [
        {
          title: "Team Events",
          description: "Regular social events, team building activities, and company retreats"
        },
        {
          title: "Diversity & Inclusion",
          description: "Multicultural environment celebrating Algerian heritage and global perspectives"
        },
        {
          title: "Community Impact",
          description: "Volunteer time off for educational and community service projects"
        }
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
              Benefits & Compensation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe in taking care of our team with comprehensive benefits designed for 
              the Algerian context while maintaining international standards.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {benefits.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                  <CardContent className="p-6">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${category.bgColor}`}>
                        <IconComponent className={`w-6 h-6 ${category.color}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {category.category}
                      </h3>
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="space-y-1">
                          <h4 className="font-medium text-foreground">
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Highlight Box */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Total Compensation Philosophy
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Our compensation packages are designed to be competitive with international standards 
                  while respecting Algerian economic realities. We regularly benchmark against the market 
                  to ensure our team is fairly compensated for their valuable contributions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;