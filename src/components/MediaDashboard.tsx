import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Newspaper, 
  BarChart3, 
  DollarSign, 
  Eye,
  Moon,
  Sun,
  Code,
  Users,
  ChevronDown,
  User,
  Settings,
  Briefcase,
  LogOut
} from "lucide-react";
import { MazePreview } from "./MazePreview";
import { EditorialMazesEditor } from "./EditorialMazesEditor";
import { MediaAnalytics } from "./MediaAnalytics";
import { Monetization } from "./Monetization";
import { IntegrationModal } from "./IntegrationModal";
import { TeamModal } from "./TeamModal";
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

interface MediaDashboardProps {
  initialPremium?: boolean;
}

export function MediaDashboard({ initialPremium = false }: MediaDashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("mazes");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState<string>("");
  const [integrationModalOpen, setIntegrationModalOpen] = useState(false);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const isPremium = initialPremium;
  
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
  const [editorialMaze, setEditorialMaze] = useState({
    theme: "AI Safety",
    idea: "Exploring ethical AI development",
    context: "An overview of AI safety research, frameworks, and responsible development practices.",
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
  
  const maxMazes = isPremium ? 10 : 1;

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

  const handleEditorialMazeChange = (updatedMaze: typeof editorialMaze) => {
    setEditorialMaze(updatedMaze);
  };

  const handleUpgradeClick = (feature: string) => {
    setUpgradeFeature(feature);
    setUpgradeDialogOpen(true);
  };

  const handlePreviewClick = () => {
    navigate("/preview", { 
      state: { 
        profile: {
          displayName: editorialMaze.theme,
          title: editorialMaze.idea,
          bio: editorialMaze.context,
        }, 
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
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("mazes")}
                className={`text-label-large ${activeTab === "mazes" ? "bg-surface-container-high" : ""}`}
              >
                <Newspaper className="h-4 w-4 mr-2" />
                Mazes
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("analytics")}
                className={`text-label-large ${activeTab === "analytics" ? "bg-surface-container-high" : ""}`}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("monetization")}
                className={`text-label-large ${activeTab === "monetization" ? "bg-surface-container-high" : ""}`}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Monetization
              </Button>

              <div className="h-6 w-px bg-border"></div>

              <Button 
                variant="ghost" 
                size="sm" 
                className="text-label-large"
                onClick={() => setIntegrationModalOpen(true)}
              >
                <Code className="h-4 w-4 mr-2" />
                Integration
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-label-large"
                onClick={() => setTeamModalOpen(true)}
              >
                <Users className="h-4 w-4 mr-2" />
                Team
              </Button>
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
                  <Button variant="ghost" size="sm" className="gap-2 h-10 px-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-medium">
                      M
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/")}>
                    <User className="h-4 w-4" />
                    Switch to User Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Briefcase className="h-4 w-4" />
                    Workspace Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-8">
        {/* Content Area - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mazes Section */}
          {activeTab === "mazes" && (
            <>
              {/* Left - Live Preview */}
              <Card className="shadow-elevation-2 bg-surface-container border-0 rounded-3xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-headline-large text-on-surface">
                    <div className="p-2 bg-[#eef2e3] rounded-full">
                      <Eye className="h-5 w-5 text-[#004096]" />
                    </div>
                    <span>Live Preview</span>
                  </CardTitle>
                  <CardDescription className="text-body-medium text-on-surface-variant">
                    Preview how your Editorial Maze will appear when triggered
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <MazePreview 
                    brandMode={false} 
                    coverImage={coverImage}
                    onImageUpload={triggerFileUpload}
                    onAddLink={() => {}}
                    canAddLink={false}
                    profile={{
                      displayName: editorialMaze.theme,
                      title: editorialMaze.idea,
                      bio: editorialMaze.context,
                    }}
                    links={links}
                    style={style}
                  />
                </CardContent>
              </Card>

              {/* Right - Mazes Editor */}
              <Card className="shadow-elevation-2 bg-surface-container border-0 rounded-3xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-headline-large text-on-surface">
                    <div className="p-2 bg-[#eef2e3] rounded-full">
                      <Newspaper className="h-5 w-5 text-[#004096]" />
                    </div>
                    <span>Editorial Mazes</span>
                  </CardTitle>
                  <CardDescription className="text-body-medium text-on-surface-variant">
                    Create and manage your Editorial Mazes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EditorialMazesEditor 
                    coverImage={coverImage}
                    onImageUpload={triggerFileUpload}
                    editorialMaze={editorialMaze}
                    onEditorialMazeChange={handleEditorialMazeChange}
                    links={links}
                    onLinksChange={setLinks}
                    style={style}
                    onStyleChange={setStyle}
                    onUpgradeClick={handleUpgradeClick}
                    onPreviewClick={handlePreviewClick}
                    isPremium={isPremium}
                    maxMazes={maxMazes}
                  />
                </CardContent>
              </Card>
            </>
          )}

          {/* Analytics Section */}
          {activeTab === "analytics" && (
            <MediaAnalytics 
              onUpgradeClick={handleUpgradeClick}
              isPremium={isPremium}
            />
          )}

          {/* Monetization Section */}
          {activeTab === "monetization" && (
            <Monetization 
              onUpgradeClick={handleUpgradeClick}
              isPremium={isPremium}
            />
          )}
        </div>
      </div>

      <IntegrationModal 
        open={integrationModalOpen}
        onOpenChange={setIntegrationModalOpen}
      />

      <TeamModal 
        open={teamModalOpen}
        onOpenChange={setTeamModalOpen}
      />

      <UpgradeDialog 
        open={upgradeDialogOpen}
        onOpenChange={setUpgradeDialogOpen}
        feature={upgradeFeature}
      />
    </div>
  );
}
