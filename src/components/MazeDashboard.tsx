import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Link, 
  Palette, 
  BarChart3, 
  Eye
} from "lucide-react";
import { MazePreview } from "./MazePreview";
import { ProfileEditor } from "./ProfileEditor";
import { LinksEditor } from "./LinksEditor";
import { StyleCustomizer } from "./StyleCustomizer";
import { Analytics } from "./Analytics";

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  thumbnail?: string;
  type: "featured" | "social";
}

export function MazeDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const brandMode = false;
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    displayName: "Jane Doe",
    bio: "Sharing my journey in design and creativity. Coffee enthusiast ☕",
    title: "Maze founder",
  });
  const [links, setLinks] = useState<Link[]>([]);
  const [style, setStyle] = useState({
    backgroundColor: "#ffffff",
    accentColor: "#6366f1", 
    fontFamily: "Inter",
    borderRadius: 12,
    theme: "light",
    orientation: "horizontal" as "horizontal" | "vertical"
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const maxLinks = brandMode ? 3 : 2;
  const canAddLink = links.length < maxLinks;

  const addLink = () => {
    if (!canAddLink) return;
    
    const newLink: Link = {
      id: Date.now().toString(),
      title: "New Link",
      url: "",
      icon: "link",
      type: "featured"
    };
    setLinks([...links, newLink]);
  };
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleProfileChange = (updatedProfile: typeof profile) => {
    setProfile(updatedProfile);
  };
  

  return (
    <div className="min-h-screen bg-surface">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      
      {/* Material 3 Top App Bar */}
      <header className="border-b border-border bg-surface-container/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center shadow-elevation-1">
                <span className="text-primary-foreground font-medium text-lg">M</span>
              </div>
              <div>
                <h1 className="text-display-small font-medium text-on-surface italic" style={{ color: '#004aad' }}>maze</h1>
                <p className="text-body-medium text-on-surface-variant">Your semantic identity window</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="default" className="text-label-large">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Preview */}
          <div className="space-y-6">
            <Card className="shadow-elevation-2 bg-surface-container border-0 rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 text-headline-large text-on-surface">
                  <div className="p-2 bg-secondary/10 rounded-full">
                    <Eye className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <span>Live Preview</span>
                </CardTitle>
                <CardDescription className="text-body-medium text-on-surface-variant">
                  Live preview of both card and mention effects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <MazePreview 
                  brandMode={brandMode} 
                  coverImage={coverImage}
                  onImageUpload={triggerFileUpload}
                  onAddLink={addLink}
                  canAddLink={canAddLink}
                  profile={profile}
                  links={links}
                  style={style}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Editor */}
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
            <Card className="shadow-elevation-2 bg-surface-container border-0 rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 text-headline-large text-on-surface">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <span>Edit Your Maze</span>
                </CardTitle>
                <CardDescription className="text-body-medium text-on-surface-variant">
                  Customize your semantic identity window that appears when you're mentioned online
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4 bg-surface-container-high rounded-2xl p-1">
                    <TabsTrigger 
                      value="profile" 
                      className="flex items-center space-x-2 data-[state=active]:bg-surface data-[state=active]:shadow-elevation-0 rounded-xl transition-all duration-200"
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">Profile</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="links" 
                      className="flex items-center space-x-2 data-[state=active]:bg-surface data-[state=active]:shadow-elevation-0 rounded-xl transition-all duration-200"
                    >
                      <Link className="h-4 w-4" />
                      <span className="hidden sm:inline">Links</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="style" 
                      className="flex items-center space-x-2 data-[state=active]:bg-surface data-[state=active]:shadow-elevation-0 rounded-xl transition-all duration-200"
                    >
                      <Palette className="h-4 w-4" />
                      <span className="hidden sm:inline">Design</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="analytics" 
                      className="flex items-center space-x-2 data-[state=active]:bg-surface data-[state=active]:shadow-elevation-0 rounded-xl transition-all duration-200"
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span className="hidden sm:inline">Analytics</span>
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-6">
                    <TabsContent value="profile">
                      <ProfileEditor 
                        brandMode={brandMode} 
                        coverImage={coverImage}
                        onImageUpload={triggerFileUpload}
                        profile={profile}
                        onProfileChange={handleProfileChange}
                      />
                    </TabsContent>
                    <TabsContent value="links">
                      <LinksEditor 
                        brandMode={brandMode} 
                        links={links}
                        onLinksChange={setLinks}
                      />
                    </TabsContent>
                    <TabsContent value="style">
                      <StyleCustomizer style={style} onStyleChange={setStyle} />
                    </TabsContent>
                    <TabsContent value="analytics">
                      <Analytics />
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}