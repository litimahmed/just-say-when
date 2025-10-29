import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe, Users, Award } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 text-sm font-medium bg-primary/10 text-primary border-primary/20">
            About Formacad
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 tracking-tight">
            Transforming
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {" "}Education{" "}
            </span>
            for the Digital Age
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            We're building the future of online learning with cutting-edge technology, 
            world-class content, and a mission to make quality education accessible to everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="group">
              Our Story
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              Join Our Mission
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Global Reach</div>
                <div className="text-sm">50+ Countries</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Active Learners</div>
                <div className="text-sm">100,000+</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Success Rate</div>
                <div className="text-sm">95% Completion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;