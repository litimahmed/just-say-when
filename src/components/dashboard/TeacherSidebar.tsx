import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Users,
  PlusCircle,
  Star,
  BarChart3,
  DollarSign,
  Megaphone,
  FolderOpen,
  MessageSquare,
  Video,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  Search,
} from "lucide-react";
import formacadLogo from "/formacad-og-image.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const mainNavItems = [
  { title: "Dashboard", url: "/teacher", icon: Home },
  { title: "My Courses", url: "/teacher/courses", icon: BookOpen },
  { title: "Course Builder", url: "/teacher/course-builder", icon: PlusCircle },
  { title: "Students", url: "/teacher/students", icon: Users },
  { title: "Reviews", url: "/teacher/reviews", icon: Star },
];

const businessNavItems = [
  { title: "Analytics", url: "/teacher/analytics", icon: BarChart3 },
  { title: "Earnings", url: "/teacher/earnings", icon: DollarSign },
  { title: "Marketing", url: "/teacher/marketing", icon: Megaphone },
  {
    title: "Content Library",
    url: "/teacher/content-library",
    icon: FolderOpen,
  },
];

const communicationNavItems = [
  { title: "Messages", url: "/teacher/messages", icon: MessageSquare },
  { title: "Live Sessions", url: "/teacher/live-sessions", icon: Video },
];

const accountItems = [
  { title: "Profile", url: "/teacher/profile", icon: User },
  { title: "Settings", url: "/teacher/settings", icon: Settings },
];

export function TeacherSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = (path: string) =>
    isActive(path)
      ? "bg-primary/10 text-primary font-medium"
      : "text-muted-foreground hover:text-foreground hover:bg-accent/50";

  return (
    <Sidebar
      className={`${
        collapsed ? "w-16" : "w-64"
      } border-r border-border transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-card modern-scrollbar">
        {/* Header with Toggle */}
        <div
          className={`border-b border-border flex items-center ${
            collapsed ? "justify-center py-4" : "justify-between p-4"
          }`}
        >
          {!collapsed ? (
            <>
              <div className="flex items-center space-x-3">
                <img
                  src={formacadLogo}
                  alt="FormAcad"
                  className="w-14 h-14 relative left-3 object-contain"
                />
                <div>
                  <h3 className="font-extrabold  text-xl text-primary">
                    FormAcad
                  </h3>
                </div>
              </div>
              <SidebarTrigger className="h-8 w-8 hover:bg-accent rounded-lg flex items-center justify-center sticky top-0 z-10 bg-sidebar">
                <ChevronLeft className="w-4 h-4 transition-transform duration-200" />
              </SidebarTrigger>
            </>
          ) : (
            <div className="h-11 w-full flex items-center justify-center">
              <img
                src={formacadLogo}
                alt="FormAcad"
                className="w-20 h-20 object-contain"
              />
            </div>
          )}
        </div>

        {/* Collapsed Toggle Button */}
        {collapsed && (
          <div className="p-2 border-b border-border flex justify-center">
            <SidebarTrigger className="h-8 w-8 hover:bg-accent rounded-lg flex items-center justify-center">
              <ChevronLeft className="w-4 h-4 transition-transform duration-200 rotate-180" />
            </SidebarTrigger>
          </div>
        )}

        {/* Search Bar */}
        {!collapsed && (
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses, students..."
                className="pl-10 pr-4 h-11 w-full bg-primary/5 border-primary/20 focus:border-primary/40 focus:bg-primary/10 rounded-xl text-foreground placeholder:text-muted-foreground transition-all duration-200"
              />
            </div>
          </div>
        )}

        {/* Navigation Groups */}
        <div className="flex-1 py-4">
          {/* Main Navigation */}
          <SidebarGroup>
            {!collapsed && (
              <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Course Management
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent className={collapsed ? "px-1" : "px-2"}>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-11">
                      <NavLink
                        to={item.url}
                        className={`flex items-center ${
                          collapsed ? "justify-center px-0" : "px-3"
                        } py-2 rounded-lg transition-all duration-200 ${getNavClasses(
                          item.url
                        )}`}
                      >
                        <item.icon className="w-5 h-5" />
                        {!collapsed && (
                          <span className="font-medium ml-3">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Business Navigation */}
          <SidebarGroup className="mt-6">
            {!collapsed && (
              <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Business
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent className={collapsed ? "px-1" : "px-2"}>
              <SidebarMenu>
                {businessNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-11">
                      <NavLink
                        to={item.url}
                        className={`flex items-center ${
                          collapsed ? "justify-center px-0" : "px-3"
                        } py-2 rounded-lg transition-all duration-200 ${getNavClasses(
                          item.url
                        )}`}
                      >
                        <item.icon className="w-5 h-5" />
                        {!collapsed && (
                          <span className="font-medium ml-3">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Communication Navigation */}
          <SidebarGroup className="mt-6">
            {!collapsed && (
              <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Communication
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent className={collapsed ? "px-1" : "px-2"}>
              <SidebarMenu>
                {communicationNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-11">
                      <NavLink
                        to={item.url}
                        className={`flex items-center ${
                          collapsed ? "justify-center px-0" : "px-3"
                        } py-2 rounded-lg transition-all duration-200 ${getNavClasses(
                          item.url
                        )}`}
                      >
                        <item.icon className="w-5 h-5" />
                        {!collapsed && (
                          <div className="flex items-center justify-between w-full ml-3">
                            <span className="font-medium">{item.title}</span>
                            {item.title === "Messages" && (
                              <Badge
                                variant="secondary"
                                className="h-5 px-1.5 text-xs"
                              >
                                7
                              </Badge>
                            )}
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Account Section */}
          <SidebarGroup className="mt-auto">
            {!collapsed && (
              <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Account
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent className={collapsed ? "px-1" : "px-2"}>
              <SidebarMenu>
                {accountItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-11">
                      <NavLink
                        to={item.url}
                        className={`flex items-center ${
                          collapsed ? "justify-center px-0" : "px-3"
                        } py-2 rounded-lg transition-all duration-200 ${getNavClasses(
                          item.url
                        )}`}
                      >
                        <item.icon className="w-5 h-5" />
                        {!collapsed && (
                          <span className="font-medium ml-3">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="h-11">
                    <Button
                      variant="ghost"
                      className={`w-full text-muted-foreground hover:text-foreground hover:bg-accent/50 h-11 ${
                        collapsed ? "justify-center px-0" : "justify-start px-3"
                      }`}
                    >
                      <LogOut className="w-5 h-5" />
                      {!collapsed && (
                        <span className="font-medium ml-3">Logout</span>
                      )}
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
