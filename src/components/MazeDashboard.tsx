import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Link, 
  Palette, 
  BarChart3, 
  Eye,
  Moon,
  Sun,
  Puzzle,
  ChevronDown
} from "lucide-react";
import { MazePreview } from "./MazePreview";
import { ProfileEditor } from "./ProfileEditor";
import { LinksEditor } from "./LinksEditor";
import { StyleCustomizer } from "./StyleCustomizer";
import { Analytics } from "./Analytics";
import { UpgradeDialog } from "./UpgradeDialog";
import mazeIsotype from "@/assets/maze-isotype.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  thumbnail?: string;
  type: "featured" | "social";
}

interface MazeDashboardProps {
  initialPremium?: boolean;
}

export function MazeDashboard({ initialPremium = false }: MazeDashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState<string>("");
  const isPremium = initialPremium;
  const brandMode = false;
  
  // Dark mode toggle effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
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

  const handleAddLinkFromPreview = () => {
    addLink();
    setActiveTab("links");
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

  const handleUpgradeClick = (feature: string) => {
    setUpgradeFeature(feature);
    setUpgradeDialogOpen(true);
  };

  const handlePreviewClick = () => {
    navigate("/preview", { 
      state: { 
        profile, 
        links, 
        style, 
        coverImage 
      } 
    });
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
      <header className="bg-surface-container border-b border-border">
        <div className="px-6 py-4 max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
              <img src={mazeIsotype} alt="Maze isotype" className="h-10 w-10" />
              <img src="/src/assets/maze-logo.svg" alt="maze" className="h-8" />
            </div>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="primary" 
                size="sm" 
                className="text-label-large"
                onClick={handlePreviewClick}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-label-large"
              >
                <Puzzle className="h-4 w-4 mr-2" />
                Extension
              </Button>

              <div className="h-6 w-px bg-border"></div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleDarkMode}
                className="h-9 w-9 p-0 hover:bg-surface-container-high rounded-full"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-label-large">
                    <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-medium mr-2">
                      U
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Account</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-8 flex">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Left Panel - Preview */}
          <div className="space-y-6">
            <Card className="shadow-elevation-2 bg-surface-container border-0 rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 text-headline-large text-on-surface">
                  <div className="p-2 bg-[#eef2e3] rounded-full">
                    <Eye className="h-5 w-5 text-[#004096]" />
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
                  onAddLink={handleAddLinkFromPreview}
                  canAddLink={canAddLink}
                  profile={profile}
                  links={links}
                  style={style}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Editor */}
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-12rem)] pb-4">
            <Card className="shadow-elevation-2 bg-surface-container border-0 rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 text-headline-large text-on-surface">
                  <div className="p-2 bg-[#eef2e3] rounded-full">
                    <User className="h-5 w-5 text-[#004096]" />
                  </div>
                  <span>Maze Editor</span>
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
                        onUpgradeClick={handleUpgradeClick}
                        isPremium={isPremium}
                      />
                    </TabsContent>
                    <TabsContent value="style">
                      <StyleCustomizer 
                        style={style} 
                        onStyleChange={setStyle}
                        onUpgradeClick={handleUpgradeClick}
                        isPremium={isPremium}
                      />
                    </TabsContent>
                    <TabsContent value="analytics">
                      <Analytics 
                        onUpgradeClick={handleUpgradeClick}
                        isPremium={isPremium}
                      />
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>

      <UpgradeDialog 
        open={upgradeDialogOpen}
        onOpenChange={setUpgradeDialogOpen}
        feature={upgradeFeature}
      />
    </div>
  );
}