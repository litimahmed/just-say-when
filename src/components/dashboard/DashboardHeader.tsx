import { Search, Bell, Plus, Filter, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import UserProfileDropdown from "@/components/ui/UserProfileDropdown";

interface DashboardHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function DashboardHeader({ isDark, toggleTheme }: DashboardHeaderProps) {
  // Force refresh - Avatar components have been replaced with UserProfileDropdown
  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-sm">
      {/* Left Section - Breadcrumbs */}
      <div className="flex items-center flex-1 max-w-xl">
        <Breadcrumb className="hidden md:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Overview</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Student Portal</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="md:hidden">
          <span className="text-sm font-medium text-foreground">Overview</span>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search courses, assignments..."
            className="pl-10 pr-20 h-10 bg-background/50 border-border focus:bg-background transition-colors"
          />
          <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <Command className="h-3 w-3" />
            K
          </kbd>
        </div>
      </div>

      {/* Action Buttons & User Menu */}
      <div className="flex items-center space-x-3">
        {/* Quick Actions */}
        <Button variant="outline" size="sm" className="h-9">
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
        
        <Button variant="outline" size="sm" className="h-9">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>

        {/* Theme Toggle */}
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
              <Bell className="w-4 h-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-0 bg-card border-border shadow-lg" align="end">
            <DropdownMenuLabel className="p-4 border-b border-border bg-card">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-card-foreground">Notifications</span>
                <Badge variant="secondary" className="text-xs">3 new</Badge>
              </div>
            </DropdownMenuLabel>
            <div className="max-h-64 overflow-y-auto bg-card">
              <div className="p-3 border-b border-border hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground">New assignment posted</p>
                    <p className="text-sm text-muted-foreground truncate">React Fundamentals - Project 3 is now available</p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-b border-border hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground">Course completion</p>
                    <p className="text-sm text-muted-foreground truncate">Congratulations! You've completed JavaScript Basics</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
              <div className="p-3 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground">Upcoming deadline</p>
                    <p className="text-sm text-muted-foreground truncate">Database Design assignment due in 2 days</p>
                    <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-border bg-card">
              <Button variant="ghost" className="w-full text-sm">
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Dropdown */}
        <UserProfileDropdown />
      </div>
    </header>
  );
}