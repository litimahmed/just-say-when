import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Target, Eye, Zap, Globe, Users, Lightbulb } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Mission */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Our Mission</Badge>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Democratizing Quality Education
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We believe everyone deserves access to world-class education. Our mission is to break down 
                barriers and create learning experiences that are engaging, effective, and accessible to learners worldwide.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Innovation-Driven Learning</h3>
                  <p className="text-muted-foreground">Cutting-edge technology meets proven pedagogical methods</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Community-Centered</h3>
                  <p className="text-muted-foreground">Building connections that last beyond the classroom</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vision */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Our Vision</Badge>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                The Future of Learning
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We envision a world where geographical boundaries don't limit educational opportunities, 
                where personalized learning adapts to every individual, and where skills development 
                keeps pace with rapid technological advancement.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Global Impact</h3>
                  <p className="text-muted-foreground">Reaching learners in every corner of the world</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Continuous Innovation</h3>
                  <p className="text-muted-foreground">Always evolving with the latest educational research</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;