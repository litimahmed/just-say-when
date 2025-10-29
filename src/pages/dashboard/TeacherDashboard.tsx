import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TeacherSidebar } from "@/components/dashboard/TeacherSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
import { SettingsPage } from "@/components/settings/SettingsPage";
import { ProfilePage } from "@/components/dashboard/ProfilePage";
import { MyCourses } from "@/components/dashboard/instructor/MyCourses";
import { CourseBuilder } from "@/components/dashboard/instructor/CourseBuilder";
import { TeacherOverview } from "@/components/dashboard/teacher/TeacherOverview";
import { StudentManagement } from "@/components/dashboard/teacher/StudentManagement";
import { AnalyticsDashboard } from "@/components/dashboard/teacher/AnalyticsDashboard";
import { EarningsDashboard } from "@/components/dashboard/teacher/EarningsDashboard";

const TeacherDashboard = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <TeacherSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader isDark={isDark} toggleTheme={toggleTheme} />
          <main className="flex-1 modern-scrollbar overflow-auto">
            <Routes>
              <Route index element={<div className="p-6"><TeacherOverview /></div>} />
              <Route path="/" element={<div className="p-6"><TeacherOverview /></div>} />
              <Route path="/courses" element={<div className="p-6"><MyCourses /></div>} />
              <Route path="/course-builder" element={<div className="p-6"><CourseBuilder /></div>} />
              <Route path="/students" element={<div className="p-6"><StudentManagement /></div>} />
              <Route path="/reviews" element={<div className="p-6"><ComingSoon title="Reviews & Ratings" /></div>} />
              <Route path="/analytics" element={<div className="p-6"><AnalyticsDashboard /></div>} />
              <Route path="/earnings" element={<div className="p-6"><EarningsDashboard /></div>} />
              <Route path="/marketing" element={<div className="p-6"><ComingSoon title="Marketing Tools" /></div>} />
              <Route path="/content-library" element={<div className="p-6"><ComingSoon title="Content Library" /></div>} />
              <Route path="/messages" element={<div className="p-6"><ComingSoon title="Student Messages" /></div>} />
              <Route path="/live-sessions" element={<div className="p-6"><ComingSoon title="Live Sessions" /></div>} />
              <Route path="/profile" element={<div className="p-6"><ProfilePage /></div>} />
              <Route path="/settings" element={<div className="p-6"><SettingsPage /></div>} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TeacherDashboard;