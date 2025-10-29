import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Award, GraduationCap, TrendingUp } from "lucide-react";

interface AchievementsHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AchievementsHeader({ activeTab, onTabChange }: AchievementsHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Achievements</h1>
          <p className="text-muted-foreground">
            Track your learning milestones and celebrate your progress
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="badges" className="flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">Badges</span>
          </TabsTrigger>
          <TabsTrigger value="certificates" className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">Certificates</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Progress</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}