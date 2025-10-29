import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Shield, Heart, Star, Flag, UserCheck } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CommunityTab() {
  const [profileVisibility, setProfileVisibility] = React.useState("public");
  const [acceptMessages, setAcceptMessages] = React.useState(true);
  const [studyGroupNotifications, setStudyGroupNotifications] = React.useState(true);
  const [forumNotifications, setForumNotifications] = React.useState(false);
  const [mentorshipAvailable, setMentorshipAvailable] = React.useState(false);
  const [shareProgress, setShareProgress] = React.useState(true);
  const [allowFriendRequests, setAllowFriendRequests] = React.useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = React.useState(true);
  const [communityRole, setCommunityRole] = React.useState("learner");
  const [contentModeration, setContentModeration] = React.useState("moderate");

  const communityStats = {
    studyGroups: 3,
    forumPosts: 12,
    helpfulAnswers: 8,
    reputation: 245
  };

  return (
    <div className="space-y-6">
      {/* Community Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Community Profile
          </CardTitle>
          <CardDescription>Manage how you appear in the community</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{communityStats.studyGroups}</div>
              <div className="text-sm text-muted-foreground">Study Groups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{communityStats.forumPosts}</div>
              <div className="text-sm text-muted-foreground">Forum Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{communityStats.helpfulAnswers}</div>
              <div className="text-sm text-muted-foreground">Helpful Answers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{communityStats.reputation}</div>
              <div className="text-sm text-muted-foreground">Reputation</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Community Role</Label>
            <Select value={communityRole} onValueChange={setCommunityRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="learner">Learner</SelectItem>
                <SelectItem value="mentor">Mentor</SelectItem>
                <SelectItem value="tutor">Tutor</SelectItem>
                <SelectItem value="study-partner">Study Partner</SelectItem>
                <SelectItem value="expert">Subject Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Show Online Status</Label>
                <p className="text-sm text-muted-foreground">Let others see when you're online</p>
              </div>
            </div>
            <Switch checked={showOnlineStatus} onCheckedChange={setShowOnlineStatus} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Share Learning Progress</Label>
                <p className="text-sm text-muted-foreground">Show your achievements to the community</p>
              </div>
            </div>
            <Switch checked={shareProgress} onCheckedChange={setShareProgress} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Available for Mentorship</Label>
                <p className="text-sm text-muted-foreground">Help other learners with your expertise</p>
              </div>
            </div>
            <Switch checked={mentorshipAvailable} onCheckedChange={setMentorshipAvailable} />
          </div>
        </CardContent>
      </Card>

      {/* Communication Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Communication Preferences
          </CardTitle>
          <CardDescription>Control how you interact with the community</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Accept Friend Requests</Label>
                <p className="text-sm text-muted-foreground">Allow others to send you friend requests</p>
              </div>
            </div>
            <Switch checked={allowFriendRequests} onCheckedChange={setAllowFriendRequests} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Accept Direct Messages</Label>
                <p className="text-sm text-muted-foreground">Allow community members to message you</p>
              </div>
            </div>
            <Switch checked={acceptMessages} onCheckedChange={setAcceptMessages} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Study Group Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified about study group activities</p>
              </div>
            </div>
            <Switch checked={studyGroupNotifications} onCheckedChange={setStudyGroupNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Forum Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified about forum discussions</p>
              </div>
            </div>
            <Switch checked={forumNotifications} onCheckedChange={setForumNotifications} />
          </div>
        </CardContent>
      </Card>

      {/* Safety & Moderation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Safety & Moderation
          </CardTitle>
          <CardDescription>Configure content filtering and safety settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Content Moderation Level</Label>
            <Select value={contentModeration} onValueChange={setContentModeration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strict">Strict - Filter all potentially inappropriate content</SelectItem>
                <SelectItem value="moderate">Moderate - Standard community guidelines</SelectItem>
                <SelectItem value="minimal">Minimal - Only filter explicit content</SelectItem>
                <SelectItem value="off">Off - No content filtering</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Community Guidelines</Label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Respectful Communication
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Heart className="w-3 h-3 mr-1" />
                  Helpful & Supportive
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  Inclusive Environment
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  Quality Content
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
            <Button variant="outline" size="sm" className="justify-start">
              <Flag className="w-4 h-4 mr-2" />
              Report Content
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Block User
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Moderators
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Users className="w-4 h-4 mr-2" />
              Community Guidelines
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}