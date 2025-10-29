import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Users, 
  Wifi, 
  Coffee, 
  Car, 
  Building,
  Clock,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";

const OfficeLocations = () => {
  const offices = [
    {
      city: "Algiers",
      status: "Headquarters",
      address: "Hydra District, Algiers 16000",
      employees: "35+",
      size: "500 sqm",
      established: "2021",
      description: "Our main headquarters featuring modern workspaces, collaboration areas, and stunning views of the Mediterranean.",
      amenities: [
        "Open floor plan with collaborative spaces",
        "High-speed fiber internet",
        "Fully equipped kitchen & dining area", 
        "Prayer room with proper facilities",
        "Underground parking garage",
        "Rooftop terrace for events",
        "24/7 security and building access",
        "Meeting rooms with video conferencing"
      ],
      contact: {
        phone: "+213 23 XXX XXX",
        email: "algiers@formacad.dz"
      },
      coordinates: "36.7631, 3.0506",
      transport: "Metro Line 1 - Tafourah Station (5 min walk)",
      image: "/src/assets/formacad-logo.png"
    },
    {
      city: "Oran", 
      status: "Regional Office",
      address: "Hai El Makkari, Oran 31000",
      employees: "12+",
      size: "200 sqm",
      established: "2023",
      description: "Our western regional hub serving businesses and educational institutions across western Algeria.",
      amenities: [
        "Modern co-working environment",
        "High-speed internet connectivity",
        "Shared kitchen and break area",
        "Prayer facilities",
        "Street parking available",
        "Conference room for client meetings",
        "Close to public transportation",
        "Local restaurant partnerships"
      ],
      contact: {
        phone: "+213 41 XXX XXX", 
        email: "oran@formacad.dz"
      },
      coordinates: "35.6911, -0.6417",
      transport: "Tramway Line - Es Senia Station (3 min walk)",
      image: "/src/assets/formacad-logo.png"
    },
    {
      city: "Constantine",
      status: "Development Center",
      address: "Nouvelle Ville Ali Mendjeli, Constantine 25000",
      employees: "8+",
      size: "150 sqm",
      established: "2024",
      description: "Our newest location focused on educational content development and partnerships with local universities.",
      amenities: [
        "Quiet focused work environment",
        "Dedicated content creation studios",
        "High-speed internet infrastructure",
        "Prayer room available",
        "Public parking nearby",
        "University district location",
        "Café and restaurant access",
        "Flexible workspace arrangements"
      ],
      contact: {
        phone: "+213 31 XXX XXX",
        email: "constantine@formacad.dz"
      },
      coordinates: "36.3650, 6.6147",
      transport: "Bus Lines 12, 25 - University Station (2 min walk)",
      image: "/src/assets/formacad-logo.png"
    }
  ];

  const remotePolicy = {
    title: "Remote Work Policy",
    description: "We embrace flexible work arrangements that balance productivity with work-life integration.",
    options: [
      {
        type: "Fully Remote",
        description: "Work from anywhere in Algeria with quarterly team meetups",
        availability: "Available for most roles"
      },
      {
        type: "Hybrid Model",
        description: "3 days in office, 2 days remote per week",
        availability: "Available at all locations"
      },
      {
        type: "Office-First", 
        description: "Primary office presence with remote flexibility",
        availability: "Required for some leadership roles"
      }
    ]
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Office Locations & Work Environment
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us at one of our modern offices across Algeria or work remotely. 
              We've designed spaces that foster collaboration, creativity, and cultural integration.
            </p>
          </div>

          {/* Office Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {offices.map((office, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                          {office.city}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {office.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{office.address}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Office Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <div className="flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-sm font-medium text-foreground">{office.employees}</div>
                      <div className="text-xs text-muted-foreground">Employees</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center">
                        <Building className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-sm font-medium text-foreground">{office.size}</div>
                      <div className="text-xs text-muted-foreground">Office Space</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-sm font-medium text-foreground">{office.established}</div>
                      <div className="text-xs text-muted-foreground">Established</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {office.description}
                  </p>

                  {/* Key Amenities */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Key Amenities:</h4>
                    <div className="space-y-2">
                      {office.amenities.slice(0, 4).map((amenity, amenityIndex) => (
                        <div key={amenityIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-xs text-muted-foreground">{amenity}</span>
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">
                        View all amenities
                      </Button>
                    </div>
                  </div>

                  {/* Contact & Transport */}
                  <div className="space-y-3 pt-2 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {office.transport}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {office.contact.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {office.contact.email}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button variant="outline" size="sm" className="w-full group">
                    View Office Details
                    <ExternalLink className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Remote Work Policy */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Wifi className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {remotePolicy.title}
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {remotePolicy.description}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {remotePolicy.options.map((option, index) => (
                  <div key={index} className="text-center space-y-3 p-4 bg-background/50 rounded-lg">
                    <h4 className="font-semibold text-foreground">{option.type}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {option.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {option.availability}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <p className="text-sm text-muted-foreground mb-4">
                  All remote workers receive home office setup allowance and regular team meetups
                </p>
                <Button>
                  Learn More About Remote Work
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OfficeLocations;