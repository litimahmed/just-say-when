import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Award, Users, Database, Cookie, Lock, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function PrivacyTab() {
  const [profileVisibility, setProfileVisibility] = React.useState("public");
  const [activityVisible, setActivityVisible] = React.useState(true);
  const [achievementsVisible, setAchievementsVisible] = React.useState(true);
  const [progressVisible, setProgressVisible] = React.useState(true);
  const [contactInfoVisible, setContactInfoVisible] = React.useState(false);
  const [searchable, setSearchable] = React.useState(true);
  const [dataCollection, setDataCollection] = React.useState(true);
  const [analyticsTracking, setAnalyticsTracking] = React.useState(true);
  const [marketingCookies, setMarketingCookies] = React.useState(false);
  const [personalizedAds, setPersonalizedAds] = React.useState(false);
  const [directMessages, setDirectMessages] = React.useState("friends");
  const [whoCanSeeProfile, setWhoCanSeeProfile] = React.useState("everyone");

  return (
    <div className="space-y-6">
      {/* Profile Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Profile Privacy
          </CardTitle>
          <CardDescription>Control who can see your profile and information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Who can see your profile</Label>
            <Select value={whoCanSeeProfile} onValueChange={setWhoCanSeeProfile}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyone">Everyone</SelectItem>
                <SelectItem value="registered">Registered users only</SelectItem>
                <SelectItem value="friends">Friends only</SelectItem>
                <SelectItem value="private">Only me</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Show Achievements</Label>
                <p className="text-sm text-muted-foreground">Display your badges and certificates</p>
              </div>
            </div>
            <Switch checked={achievementsVisible} onCheckedChange={setAchievementsVisible} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Show Learning Progress</Label>
                <p className="text-sm text-muted-foreground">Display course completion and stats</p>
              </div>
            </div>
            <Switch checked={progressVisible} onCheckedChange={setProgressVisible} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Show Activity Feed</Label>
                <p className="text-sm text-muted-foreground">Display your recent learning activity</p>
              </div>
            </div>
            <Switch checked={activityVisible} onCheckedChange={setActivityVisible} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Show Contact Information</Label>
                <p className="text-sm text-muted-foreground">Display email and social links</p>
              </div>
            </div>
            <Switch checked={contactInfoVisible} onCheckedChange={setContactInfoVisible} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Appear in Search</Label>
                <p className="text-sm text-muted-foreground">Allow others to find you in search</p>
              </div>
            </div>
            <Switch checked={searchable} onCheckedChange={setSearchable} />
          </div>
        </CardContent>
      </Card>

      {/* Communication Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Communication Privacy
          </CardTitle>
          <CardDescription>Control how others can contact you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Who can send you direct messages</Label>
            <Select value={directMessages} onValueChange={setDirectMessages}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyone">Everyone</SelectItem>
                <SelectItem value="friends">Friends only</SelectItem>
                <SelectItem value="instructors">Instructors only</SelectItem>
                <SelectItem value="nobody">Nobody</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data & Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Data & Analytics
          </CardTitle>
          <CardDescription>Control how your data is collected and used</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Learning Analytics</Label>
                <p className="text-sm text-muted-foreground">Help improve the platform with anonymized data</p>
              </div>
            </div>
            <Switch checked={dataCollection} onCheckedChange={setDataCollection} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Usage Analytics</Label>
                <p className="text-sm text-muted-foreground">Track platform usage for performance insights</p>
              </div>
            </div>
            <Switch checked={analyticsTracking} onCheckedChange={setAnalyticsTracking} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cookie className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Marketing Cookies</Label>
                <p className="text-sm text-muted-foreground">Allow cookies for personalized content</p>
              </div>
            </div>
            <Switch checked={marketingCookies} onCheckedChange={setMarketingCookies} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Personalized Recommendations</Label>
                <p className="text-sm text-muted-foreground">Get course suggestions based on your activity</p>
              </div>
            </div>
            <Switch checked={personalizedAds} onCheckedChange={setPersonalizedAds} />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Data Management
          </CardTitle>
          <CardDescription>Manage your personal data and account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start">
              <Database className="w-4 h-4 mr-2" />
              Download My Data
            </Button>
            <Button variant="outline" className="justify-start">
              <Eye className="w-4 h-4 mr-2" />
              View Data Policy
            </Button>
            <Button variant="outline" className="justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Privacy Settings Help
            </Button>
            <Button variant="destructive" className="justify-start">
              <Lock className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}