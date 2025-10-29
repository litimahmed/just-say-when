import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, BookOpen, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="section-padding bg-gradient-to-br from-background to-muted/30 border-t">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Ready to Get Started?
          </div>
          
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-foreground">
            Begin Your Journey With Us
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            Take the next step in your educational journey or discover exciting career opportunities 
            that align with our mission to transform learning worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="group font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Start Learning Today
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/careers')}
              className="group font-semibold border-primary/20 text-foreground hover:bg-primary/5 hover:border-primary/40"
            >
              <Briefcase className="mr-2 h-5 w-5" />
              Explore Career Opportunities
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground mb-4">
              Discover more about our impact and educational initiatives
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <Button variant="link" className="text-muted-foreground hover:text-foreground p-0">
                Read Our Annual Report
              </Button>
              <span className="hidden sm:inline text-muted-foreground/40">•</span>
              <Button variant="link" className="text-muted-foreground hover:text-foreground p-0">
                Explore Our Research
              </Button>
              <span className="hidden sm:inline text-muted-foreground/40">•</span>
              <Button variant="link" className="text-muted-foreground hover:text-foreground p-0">
                Contact Leadership
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;