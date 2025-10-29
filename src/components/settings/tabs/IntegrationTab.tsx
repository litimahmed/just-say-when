import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Unlink, Calendar, Video, MessageSquare, Cloud, BookOpen, Users, Zap, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function IntegrationTab() {
  const [googleLinked, setGoogleLinked] = React.useState(true);
  const [zoomLinked, setZoomLinked] = React.useState(false);
  const [slackLinked, setSlackLinked] = React.useState(false);
  const [teamsLinked, setTeamsLinked] = React.useState(false);
  const [githubLinked, setGithubLinked] = React.useState(true);
  const [notionLinked, setNotionLinked] = React.useState(false);
  const [discordLinked, setDiscordLinked] = React.useState(false);
  const [dropboxLinked, setDropboxLinked] = React.useState(false);
  const [autoSync, setAutoSync] = React.useState(true);
  const [smartNotifications, setSmartNotifications] = React.useState(true);

  const mainIntegrations = [
    { 
      name: "Google Workspace", 
      icon: "🔍", 
      connected: googleLinked, 
      setConnected: setGoogleLinked,
      description: "Sync calendar, drive, and classroom",
      features: ["Calendar sync", "Drive integration", "Gmail notifications"]
    },
    { 
      name: "Zoom", 
      icon: "📹", 
      connected: zoomLinked, 
      setConnected: setZoomLinked,
      description: "Join meetings directly from courses",
      features: ["One-click meeting join", "Recording integration", "Attendance tracking"]
    },
    { 
      name: "Microsoft Teams", 
      icon: "👥", 
      connected: teamsLinked, 
      setConnected: setTeamsLinked,
      description: "Collaborate with classmates and instructors",
      features: ["Team channels", "File sharing", "Video calls"]
    },
    { 
      name: "GitHub", 
      icon: "💻", 
      connected: githubLinked, 
      setConnected: setGithubLinked,
      description: "Submit code assignments and projects",
      features: ["Repository integration", "Code review", "Project tracking"]
    },
  ];

  const communicationIntegrations = [
    { 
      name: "Slack", 
      icon: "💬", 
      connected: slackLinked, 
      setConnected: setSlackLinked,
      description: "Course discussions and announcements",
      features: ["Course channels", "Direct messaging", "File sharing"]
    },
    { 
      name: "Discord", 
      icon: "🎮", 
      connected: discordLinked, 
      setConnected: setDiscordLinked,
      description: "Community discussions and study groups",
      features: ["Voice channels", "Screen sharing", "Bot integration"]
    },
  ];

  const productivityIntegrations = [
    { 
      name: "Notion", 
      icon: "📝", 
      connected: notionLinked, 
      setConnected: setNotionLinked,
      description: "Take notes and organize your learning",
      features: ["Note templates", "Progress tracking", "Knowledge base"]
    },
    { 
      name: "Dropbox", 
      icon: "📁", 
      connected: dropboxLinked, 
      setConnected: setDropboxLinked,
      description: "Sync course materials and assignments",
      features: ["File sync", "Assignment submission", "Backup"]
    },
  ];

  const IntegrationCard = ({ integration, category }: { integration: any, category: string }) => (
    <div className="p-6 border rounded-lg space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{integration.icon}</span>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{integration.name}</h4>
              {integration.connected && <Badge variant="secondary" className="text-xs">Connected</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">{integration.description}</p>
            <div className="flex flex-wrap gap-1">
              {integration.features.map((feature: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <Button
          variant={integration.connected ? "destructive" : "default"}
          size="sm"
          onClick={() => integration.setConnected(!integration.connected)}
        >
          {integration.connected ? (
            <>
              <Unlink className="w-4 h-4 mr-2" />
              Disconnect
            </>
          ) : (
            <>
              <Link className="w-4 h-4 mr-2" />
              Connect
            </>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Main Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5" />
            Learning & Productivity
          </CardTitle>
          <CardDescription>Connect your essential learning and productivity tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {mainIntegrations.map((integration) => (
              <IntegrationCard key={integration.name} integration={integration} category="main" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Communication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Communication & Collaboration
          </CardTitle>
          <CardDescription>Stay connected with your learning community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {communicationIntegrations.map((integration) => (
              <IntegrationCard key={integration.name} integration={integration} category="communication" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Productivity Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            Note-taking & Storage
          </CardTitle>
          <CardDescription>Organize your learning materials and notes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {productivityIntegrations.map((integration) => (
              <IntegrationCard key={integration.name} integration={integration} category="productivity" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Integration Settings
          </CardTitle>
          <CardDescription>Configure how integrations work with your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Auto-sync Data</Label>
                <p className="text-sm text-muted-foreground">Automatically sync data between connected services</p>
              </div>
            </div>
            <Switch checked={autoSync} onCheckedChange={setAutoSync} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Smart Notifications</Label>
                <p className="text-sm text-muted-foreground">Get intelligent notifications across all platforms</p>
              </div>
            </div>
            <Switch checked={smartNotifications} onCheckedChange={setSmartNotifications} />
          </div>

          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              <Link className="w-4 h-4 mr-2" />
              Browse More Integrations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}