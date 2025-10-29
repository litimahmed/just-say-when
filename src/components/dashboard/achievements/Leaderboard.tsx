import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, Crown, Medal, Award, Trophy } from "lucide-react";

export function Leaderboard() {
  const leaderboardData = [
    {
      rank: 1,
      name: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      points: 2850,
      badges: 42,
      trend: "up",
      isCurrentUser: false
    },
    {
      rank: 2,
      name: "Ahmad Hassan",
      avatar: "/avatars/ahmad.jpg",
      points: 2720,
      badges: 38,
      trend: "up",
      isCurrentUser: false
    },
    {
      rank: 3,
      name: "You",
      avatar: "/avatars/current-user.jpg",
      points: 2680,
      badges: 36,
      trend: "up",
      isCurrentUser: true
    },
    {
      rank: 4,
      name: "Maria Garcia",
      avatar: "/avatars/maria.jpg",
      points: 2590,
      badges: 34,
      trend: "down",
      isCurrentUser: false
    },
    {
      rank: 5,
      name: "David Kim",
      avatar: "/avatars/david.jpg",
      points: 2480,
      badges: 32,
      trend: "up",
      isCurrentUser: false
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-4 h-4 text-yellow-500" />;
      case 2: return <Medal className="w-4 h-4 text-gray-500" />;
      case 3: return <Award className="w-4 h-4 text-amber-600" />;
      default: return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 2: return "bg-gradient-to-r from-gray-300 to-gray-500";
      case 3: return "bg-gradient-to-r from-amber-400 to-amber-600";
      default: return "bg-muted";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span>Leaderboard</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboardData.map((user) => (
            <div
              key={user.rank}
              className={`relative p-4 rounded-lg border transition-all duration-300 ${
                user.isCurrentUser 
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                  : "border-border bg-card/50 hover:bg-accent/30"
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Rank */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankColor(user.rank)}`}>
                  {getRankIcon(user.rank)}
                </div>

                {/* Avatar */}
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className={`font-medium truncate ${user.isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                      {user.name}
                    </p>
                    {user.isCurrentUser && (
                      <Badge variant="outline" className="text-xs">You</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-3 h-3" />
                      <span>{user.points.toLocaleString()} pts</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-3 h-3" />
                      <span>{user.badges} badges</span>
                    </div>
                  </div>
                </div>

                {/* Trend */}
                <div className="flex items-center space-x-1">
                  <TrendingUp className={`w-4 h-4 ${
                    user.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  } ${user.trend === 'down' ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Current User Highlight */}
              {user.isCurrentUser && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
              )}
            </div>
          ))}
        </div>

        {/* View Full Leaderboard */}
        <div className="mt-4 pt-4 border-t border-border text-center">
          <button className="text-sm text-primary hover:underline">
            View Full Leaderboard
          </button>
        </div>

        {/* Current User Stats */}
        <div className="mt-4 p-3 rounded-lg bg-accent/30">
          <h4 className="font-medium text-foreground mb-2">Your Progress</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">This Week</p>
              <p className="font-semibold text-foreground">+180 points</p>
            </div>
            <div>
              <p className="text-muted-foreground">Rank Change</p>
              <p className="font-semibold text-green-600">↑ 2 positions</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}