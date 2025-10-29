import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users, TrendingUp } from "lucide-react";
import careersHeroOverlay from "@/assets/careers-hero-overlay.jpg";

const CareersHero = () => {
  return (
    <section className="pt-24 pb-16 md:pb-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider">Join Our Team</p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                    Build the Future of
                    <span className="text-primary block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      Digital Education
                    </span>
                  </h1>
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Join a dynamic team of innovators, educators, and technologists dedicated to transforming 
                  the educational landscape. Make a meaningful impact while advancing your career in a 
                  fast-growing EdTech company.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-2 mx-auto">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">50+</div>
                  <div className="text-sm text-muted-foreground">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-2 mx-auto">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">3</div>
                  <div className="text-sm text-muted-foreground">Office Locations</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-2 mx-auto">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">200%</div>
                  <div className="text-sm text-muted-foreground">Growth Rate</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="group"
                  onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Open Positions
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => document.getElementById('company-culture')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn About Our Culture
                </Button>
              </div>
            </div>

            {/* Image/Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8 h-96">
                <div 
                  className="absolute inset-0 rounded-2xl bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${careersHeroOverlay})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-transparent rounded-2xl"></div>
                <div className="relative h-full flex items-center justify-center">
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;