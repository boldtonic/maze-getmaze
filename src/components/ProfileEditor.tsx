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
  profile: {
    displayName: string;
    title: string;
    bio: string;
  };
  onProfileChange: (profile: { displayName: string; title: string; bio: string }) => void;
}

export function ProfileEditor({ brandMode, coverImage, onImageUpload, profile, onProfileChange }: ProfileEditorProps) {
  const [verified, setVerified] = useState(brandMode);

  const handleInputChange = (field: keyof typeof profile, value: string) => {
    const updatedProfile = { ...profile, [field]: value };
    onProfileChange(updatedProfile);
  };

  const handleVerifiedChange = (checked: boolean) => {
    setVerified(checked);
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-headline-medium">
            <User className="h-5 w-5" />
            <span>Personal Cover</span>
          </CardTitle>
          <CardDescription className="text-body-medium">
            Upload a high-quality image that represents you or your brand
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 rounded-xl overflow-hidden ring-4 ring-primary/20" style={{ backgroundColor: '#87b2f3' }}>
              {coverImage ? (
                <img 
                  src={coverImage} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <ImagePlus className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Button 
                variant="primary"
                size="sm"
                className="flex items-center space-x-2 text-label-large"
                onClick={onImageUpload}
              >
                <Upload className="h-4 w-4" />
                <span>Upload Image</span>
              </Button>
              <p className="text-body-small text-muted-foreground">
                Recommended: 200px×100px (2:1 aspect ratio), JPG or PNG
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-headline-medium">
            <Briefcase className="h-5 w-5" />
            <span>Basic Information</span>
          </CardTitle>
          <CardDescription className="text-body-medium">
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
              onChange={(e) => {
                if (e.target.value.length <= 90) {
                  handleInputChange('bio', e.target.value);
                }
              }}
              placeholder="Tell your story in a compelling way..."
              rows={4}
              className="resize-none"
              maxLength={90}
            />
            <p className={`text-body-small ${profile.bio.length > 80 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {profile.bio.length}/90 characters
            </p>
          </div>

          {brandMode && (
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="verified">Verified Badge</Label>
                    <Badge variant="secondary" className="text-label-small">
                      <Crown className="h-3 w-3 mr-1" />
                      Brand Feature
                    </Badge>
                  </div>
                  <p className="text-body-medium text-muted-foreground">
                    Show a verification badge on your Maze
                  </p>
                </div>
                <Switch
                  id="verified"
                  checked={verified}
                  onCheckedChange={handleVerifiedChange}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button variant="primary" size="sm" className="w-full text-label-large">
        Save Profile Changes
      </Button>
    </div>
  );
}