import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Upload, User, Briefcase, Crown, ImagePlus } from "lucide-react";

interface ProfileEditorProps {
  brandMode: boolean;
  coverImage: string | null;
  onImageUpload: () => void;
}

export function ProfileEditor({ brandMode, coverImage, onImageUpload }: ProfileEditorProps) {
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
            <span>Personal Cover</span>
          </CardTitle>
          <CardDescription>
            Upload a high-quality image that represents you or your brand
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 rounded-xl overflow-hidden ring-4 ring-primary/20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              {coverImage ? (
                <img 
                  src={coverImage} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 flex items-center justify-center">
                  <ImagePlus className="w-6 h-6 text-white/60" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Button 
                className="flex items-center space-x-2"
                onClick={onImageUpload}
              >
                <Upload className="h-4 w-4" />
                <span>Upload Image</span>
              </Button>
              <p className="text-xs text-muted-foreground">
                Recommended: 194x102px (same as A1+B1), JPG or PNG
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
                    Show a verification badge on your Maze
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