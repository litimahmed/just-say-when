import { useState } from "react";
import { AchievementsHeader } from "./AchievementsHeader";
import { AchievementStats } from "./AchievementStats";
import { BadgeGallery } from "./BadgeGallery";
import { CertificatesList } from "./CertificatesList";
import { AchievementTimeline } from "./AchievementTimeline";
import { ProgressTracker } from "./ProgressTracker";
import { Leaderboard } from "./Leaderboard";

export function AchievementsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <AchievementsHeader activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AchievementStats />
            <BadgeGallery />
            <AchievementTimeline />
          </div>
          <div className="space-y-6">
            <ProgressTracker />
            <Leaderboard />
          </div>
        </div>
      )}
      
      {activeTab === "badges" && <BadgeGallery showAll />}
      {activeTab === "certificates" && <CertificatesList />}
      {activeTab === "progress" && <ProgressTracker detailed />}
    </div>
  );
}