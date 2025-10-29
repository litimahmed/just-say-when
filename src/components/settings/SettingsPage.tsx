import * as React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountTab } from "./tabs/AccountTab";
import { PaymentTab } from "./tabs/PaymentTab";
import { NotificationTab } from "./tabs/NotificationTab";
import { PrivacyTab } from "./tabs/PrivacyTab";
import { IntegrationTab } from "./tabs/IntegrationTab";
import { CourseTab } from "./tabs/CourseTab";
import { AccessibilityTab } from "./tabs/AccessibilityTab";
import { CommunityTab } from "./tabs/CommunityTab";
import { AutomationTab } from "./tabs/AutomationTab";
import { GamificationTab } from "./tabs/GamificationTab";

export function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("account");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account preferences and configurations
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="flex flex-wrap gap-2 w-full justify-start h-auto p-1 bg-muted/30 backdrop-blur-sm border border-border/50">
          <TabsTrigger 
            value="account"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Account
          </TabsTrigger>
          <TabsTrigger 
            value="payment"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Payment
          </TabsTrigger>
          <TabsTrigger 
            value="notifications"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger 
            value="privacy"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Privacy
          </TabsTrigger>
          <TabsTrigger 
            value="integrations"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Integrations
          </TabsTrigger>
          <TabsTrigger 
            value="course"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Course Management
          </TabsTrigger>
          <TabsTrigger 
            value="accessibility"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Accessibility
          </TabsTrigger>
          <TabsTrigger 
            value="community"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Community
          </TabsTrigger>
          <TabsTrigger 
            value="automation"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Automation
          </TabsTrigger>
          <TabsTrigger 
            value="gamification"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          >
            Gamification
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="account" className="space-y-4">
            <AccountTab />
          </TabsContent>
          <TabsContent value="payment" className="space-y-4">
            <PaymentTab />
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <NotificationTab />
          </TabsContent>
          <TabsContent value="privacy" className="space-y-4">
            <PrivacyTab />
          </TabsContent>
          <TabsContent value="integrations" className="space-y-4">
            <IntegrationTab />
          </TabsContent>
          <TabsContent value="course" className="space-y-4">
            <CourseTab />
          </TabsContent>
          <TabsContent value="accessibility" className="space-y-4">
            <AccessibilityTab />
          </TabsContent>
          <TabsContent value="community" className="space-y-4">
            <CommunityTab />
          </TabsContent>
          <TabsContent value="automation" className="space-y-4">
            <AutomationTab />
          </TabsContent>
          <TabsContent value="gamification" className="space-y-4">
            <GamificationTab />
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  );
}