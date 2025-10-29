import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Target, 
  BookOpen, 
  Calendar,
  Trophy,
  AlertCircle,
  ChevronRight,
  Flame,
  Zap
} from "lucide-react";

export function DashboardContent() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header - Keep Existing */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/10 p-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="relative space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  J
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Welcome back, John</h1>
                <p className="text-sm text-muted-foreground">Let's optimize your learning experience today</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button className="bg-gradient-primary hover:opacity-90 shadow-md">
                <Sparkles className="w-4 h-4 mr-2" />
                Complete Setup
              </Button>
              <Button variant="outline" className="border-primary/20 hover:bg-primary/5">
                <ArrowRight className="w-4 h-4 mr-2" />
                View Schedule
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-primary/10">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm font-medium text-foreground">67% Profile Complete</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">24h Study Time</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">12 Day Streak</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Last active: 2 hours ago
            </div>
          </div>
        </div>
      </div>

      {/* Learning Momentum Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Focus */}
        <div className="lg:col-span-2 relative group overflow-hidden rounded-xl border border-border bg-gradient-to-br from-card to-card/80 hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent"></div>
          <div className="relative p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Continue Your Journey</h3>
                <p className="text-sm text-muted-foreground">Pick up where you left off</p>
              </div>
              <Badge variant="secondary" className="text-xs">In Progress</Badge>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">Advanced React Patterns</h4>
                  <div className="flex items-center space-x-3 mt-1">
                    <Progress value={78} className="flex-1 h-1.5" />
                    <span className="text-xs text-muted-foreground">78%</span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>45 min left</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Target className="w-3.5 h-3.5" />
                    <span>Chapter 12 of 15</span>
                  </span>
                </div>
                <Button size="sm" className="h-7 text-xs">
                  Resume Learning
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Goal */}
        <div className="relative group overflow-hidden rounded-xl border border-border bg-gradient-to-br from-card to-card/80 hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.02] to-transparent"></div>
          <div className="relative p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Daily Streak</h3>
                <p className="text-xs text-muted-foreground">Keep the momentum</p>
              </div>
            </div>
            
            <div className="text-center py-6">
              <div className="text-3xl font-bold text-foreground mb-2">12</div>
              <div className="text-sm text-muted-foreground mb-4">Days in a row</div>
              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < 5 ? 'bg-orange-500' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Study 30 min today to continue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Upcoming Deadline */}
        <div className="group relative overflow-hidden rounded-lg border border-border bg-card hover:shadow-md transition-all duration-200">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.01] to-transparent"></div>
          <div className="relative p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-foreground">Due Soon</span>
              </div>
              <Badge variant="destructive" className="text-xs">2 days</Badge>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">React Component Assignment</h4>
              <p className="text-xs text-muted-foreground">Build a reusable component library</p>
            </div>
          </div>
        </div>

        {/* Next Class */}
        <div className="group relative overflow-hidden rounded-lg border border-border bg-card hover:shadow-md transition-all duration-200">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.01] to-transparent"></div>
          <div className="relative p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-foreground">Next Class</span>
              </div>
              <Badge variant="secondary" className="text-xs">Today 3 PM</Badge>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Advanced State Management</h4>
              <p className="text-xs text-muted-foreground">Redux Toolkit & Zustand comparison</p>
            </div>
          </div>
        </div>

        {/* Achievement Ready */}
        <div className="group relative overflow-hidden rounded-lg border border-border bg-card hover:shadow-md transition-all duration-200">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.01] to-transparent"></div>
          <div className="relative p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-foreground">Achievement</span>
              </div>
              <Badge className="text-xs bg-green-500/10 text-green-600 hover:bg-green-500/20">Ready!</Badge>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">React Master Badge</h4>
              <p className="text-xs text-muted-foreground">Complete 2 more projects to unlock</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="rounded-xl border border-border bg-card">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Learning Analytics</h3>
                <p className="text-sm text-muted-foreground">Your progress this week</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">Weekly Report</Badge>
          </div>
        </div>
        
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-2xl font-bold text-foreground">8.2h</span>
            </div>
            <p className="text-sm text-muted-foreground">Study Time</p>
            <p className="text-xs text-green-600 mt-1">+24% vs last week</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <BookOpen className="w-4 h-4 text-green-500" />
              <span className="text-2xl font-bold text-foreground">4</span>
            </div>
            <p className="text-sm text-muted-foreground">Lessons</p>
            <p className="text-xs text-green-600 mt-1">2 ahead of plan</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <Target className="w-4 h-4 text-orange-500" />
              <span className="text-2xl font-bold text-foreground">89%</span>
            </div>
            <p className="text-sm text-muted-foreground">Accuracy</p>
            <p className="text-xs text-green-600 mt-1">+5% improvement</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <Trophy className="w-4 h-4 text-purple-500" />
              <span className="text-2xl font-bold text-foreground">3</span>
            </div>
            <p className="text-sm text-muted-foreground">Achievements</p>
            <p className="text-xs text-green-600 mt-1">New this week</p>
          </div>
        </div>
      </div>
    </div>
  );
}