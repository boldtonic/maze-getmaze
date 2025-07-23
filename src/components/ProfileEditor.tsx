import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Upload, User, Briefcase, Crown } from "lucide-react";

interface ProfileEditorProps {
  brandMode: boolean;
}

export function ProfileEditor({ brandMode }: ProfileEditorProps) {
  const [profile, setProfile] = useState({
    displayName: "Jane Doe",
    bio: brandMode 
      ? "Helping brands tell their story through design. 10+ years experience in creative direction."
      : "Sharing my journey in design and creativity. Coffee enthusiast ☕",
    title: brandMode ? "Creative Director & Brand Strategist" : "Content Creator & Designer",
    verified: brandMode,
    profileImage: "",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Profile Picture</span>
          </CardTitle>
          <CardDescription>
            Upload a high-quality image that represents you or your brand
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20 ring-4 ring-primary/20">
              <AvatarImage src={profile.profileImage || "/placeholder.svg"} alt="Profile" />
              <AvatarFallback className="bg-gradient-primary text-white text-lg font-semibold">
                {profile.displayName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload Image</span>
              </Button>
              <p className="text-xs text-muted-foreground">
                Recommended: 400x400px, JPG or PNG
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Basic Information</span>
          </CardTitle>
          <CardDescription>
            Tell people who you are and what you do
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={profile.displayName}
              onChange={(e) => handleInputChange('displayName', e.target.value)}
              placeholder="Your name or brand name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title/Tagline</Label>
            <Input
              id="title"
              value={profile.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="What you do in a few words"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell your story in a compelling way..."
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {profile.bio.length}/300 characters
            </p>
          </div>

          {brandMode && (
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="verified">Verified Badge</Label>
                    <Badge variant="secondary" className="text-xs">
                      <Crown className="h-3 w-3 mr-1" />
                      Brand Feature
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Show a verification badge on your SLUG
                  </p>
                </div>
                <Switch
                  id="verified"
                  checked={profile.verified}
                  onCheckedChange={(checked) => handleInputChange('verified', checked)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
        Save Profile Changes
      </Button>
    </div>
  );
}