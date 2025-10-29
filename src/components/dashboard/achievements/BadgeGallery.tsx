import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeGalleryProps {
  showAll?: boolean;
}

export function BadgeGallery({ showAll = false }: BadgeGalleryProps) {
  const badges = [
    {
      id: 1,
      name: "First Course",
      description: "Complete your first course",
      image: "/lovable-uploads/e2c99c4f-bee4-439a-89e3-3638d630f898.png",
      earned: true,
      earnedDate: "2024-01-15",
      rarity: "common"
    },
    {
      id: 2,
      name: "Speed Demon",
      description: "Complete a course in under 7 days",
      image: "/lovable-uploads/3354630d-3810-4433-8499-88e92ea2f937.png",
      earned: true,
      earnedDate: "2024-02-03",
      rarity: "rare"
    },
    {
      id: 3,
      name: "Community Helper",
      description: "Help 25 fellow students in discussions",
      image: "/lovable-uploads/4995e3a2-aecc-4084-85eb-c8396be50dbc.png",
      earned: true,
      earnedDate: "2024-02-20",
      rarity: "uncommon"
    },
    {
      id: 4,
      name: "Perfect Score",
      description: "Get 100% on 5 consecutive quizzes",
      image: "/lovable-uploads/fa7569ef-8a35-4410-b641-3b86010dea13.png",
      earned: false,
      progress: 3,
      total: 5,
      rarity: "epic"
    },
    {
      id: 5,
      name: "Night Owl",
      description: "Study for 3 hours after 10 PM",
      image: "/lovable-uploads/260dc261-d9c0-4332-a3e4-351393d85a75.png",
      earned: true,
      earnedDate: "2024-03-01",
      rarity: "uncommon"
    },
    {
      id: 6,
      name: "Streak Master",
      description: "Maintain a 30-day learning streak",
      image: "/lovable-uploads/6d1b0d65-4163-405d-8cc6-ff0d00f74c2f.png",
      earned: false,
      progress: 12,
      total: 30,
      rarity: "legendary"
    },
    {
      id: 7,
      name: "Course Completionist",
      description: "Complete 10 courses",
      image: "/lovable-uploads/a952f826-2ff7-432b-af9d-1b3fc1385c45.png",
      earned: true,
      earnedDate: "2024-03-10",
      rarity: "epic"
    }
  ];

  const displayedBadges = showAll ? badges : badges.slice(0, 6);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "uncommon": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rare": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "epic": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "legendary": return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-primary" />
            <span>Badge Collection</span>
          </CardTitle>
          {!showAll && (
            <Button variant="outline" size="sm">
              View All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedBadges.map((badge) => (
            <div
              key={badge.id}
              className={cn(
                "group relative p-4 rounded-xl border-2 transition-all duration-300",
                badge.earned 
                  ? "border-primary/20 bg-card hover:border-primary/40 hover:shadow-lg cursor-pointer" 
                  : "border-dashed border-muted-foreground/30 bg-muted/30"
              )}
            >
              {/* Badge Image */}
              <div className="w-16 h-16 mx-auto mb-3 transition-transform group-hover:scale-110">
                <img 
                  src={badge.image} 
                  alt={badge.name}
                  className={cn(
                    "w-full h-full object-contain transition-opacity",
                    badge.earned ? "opacity-100" : "opacity-50 grayscale"
                  )}
                />
              </div>

              {/* Badge Info */}
              <div className="text-center space-y-2">
                <h4 className={cn(
                  "font-semibold text-sm",
                  badge.earned ? "text-foreground" : "text-muted-foreground"
                )}>
                  {badge.name}
                </h4>
                
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {badge.description}
                </p>

                {/* Rarity Badge */}
                <Badge 
                  variant="secondary" 
                  className={cn("text-xs capitalize", getRarityColor(badge.rarity))}
                >
                  {badge.rarity}
                </Badge>

                {/* Progress or Earned Date */}
                {badge.earned ? (
                  <p className="text-xs text-muted-foreground">
                    Earned {new Date(badge.earnedDate!).toLocaleDateString()}
                  </p>
                ) : badge.progress !== undefined && (
                  <div className="space-y-1">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(badge.progress / badge.total!) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {badge.progress}/{badge.total}
                    </p>
                  </div>
                )}
              </div>

              {/* Earned Indicator */}
              {badge.earned && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}