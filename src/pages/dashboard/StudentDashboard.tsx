import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StudentSidebar } from "@/components/dashboard/StudentSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
import { SettingsPage } from "@/components/settings/SettingsPage";
import { MyCourses } from "@/components/dashboard/courses/MyCourses";
import { ModernLearningPath } from "@/components/dashboard/learning-path/ModernLearningPath";
import { StudyTimePage } from "@/components/dashboard/schedule/StudyTimePage";
import { SchedulePage } from "@/components/dashboard/schedule/SchedulePage";
import { AchievementsPage } from "@/components/dashboard/achievements/AchievementsPage";
import { AssignmentsPage } from "@/components/dashboard/assignments/AssignmentsPage";
import { WorkshopsPage } from "@/components/dashboard/workshops/WorkshopsPage";
import { ProfilePage } from "@/components/dashboard/ProfilePage";

const StudentDashboard = () => {
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
        <StudentSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader isDark={isDark} toggleTheme={toggleTheme} />
          <main className="flex-1 modern-scrollbar overflow-auto">
            <Routes>
              <Route index element={<div className="p-6"><DashboardContent /></div>} />
              <Route path="/" element={<div className="p-6"><DashboardContent /></div>} />
              <Route path="/courses" element={<div className="p-6"><MyCourses /></div>} />
              <Route path="/learning-path" element={<ModernLearningPath />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/achievements" element={<div className="p-6"><AchievementsPage /></div>} />
              <Route path="/assignments" element={<div className="p-6"><AssignmentsPage /></div>} />
              <Route path="/study-time" element={<StudyTimePage />} />
              <Route path="/workshops" element={<div className="p-6"><WorkshopsPage /></div>} />
              <Route path="/profile" element={<div className="p-6"><ProfilePage /></div>} />
              <Route path="/settings" element={<div className="p-6"><SettingsPage /></div>} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default StudentDashboard;