import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Link, 
  Palette, 
  BarChart3, 
  Settings, 
  Crown,
  Plus,
  Eye
} from "lucide-react";
import { MazePreview } from "./MazePreview";
import { ProfileEditor } from "./ProfileEditor";
import { LinksEditor } from "./LinksEditor";
import { StyleCustomizer } from "./StyleCustomizer";
import { Analytics } from "./Analytics";

export function MazeDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [brandMode, setBrandMode] = useState(false);
  

  return (
    <div className="min-h-screen bg-surface">
      {/* Material 3 Top App Bar */}
      <header className="border-b border-border bg-surface-container/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center shadow-elevation-1">
                <span className="text-primary-foreground font-medium text-lg">M</span>
              </div>
              <div>
                <h1 className="text-2xl font-normal text-on-surface">Maze Dashboard</h1>
                <p className="text-sm text-on-surface-variant">Your semantic identity window</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant={brandMode ? "default" : "elevated"}
                size="default"
                onClick={() => setBrandMode(!brandMode)}
                className="flex items-center space-x-2"
              >
                <Crown className="h-4 w-4" />
                <span>{brandMode ? "Brand Mode" : "Creator Mode"}</span>
              </Button>
              <Button variant="outline" size="default">
                <Eye className="h-4 w-4 mr-2" />
                Preview Live
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
                <CardTitle className="flex items-center space-x-3 text-xl font-normal text-on-surface">
                  <div className="p-2 bg-secondary/10 rounded-full">
                    <Eye className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <span>Live Preview</span>
                </CardTitle>
                <CardDescription className="text-on-surface-variant">
                  Live preview of both card and mention effects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <MazePreview brandMode={brandMode} />
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Editor */}
          <div className="space-y-6">
            <Card className="shadow-elevation-2 bg-surface-container border-0 rounded-3xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3 text-xl font-normal text-on-surface">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <span>Edit Your Maze</span>
                </CardTitle>
                <CardDescription className="text-on-surface-variant">
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
                      <span className="hidden sm:inline">Style</span>
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
                      <ProfileEditor brandMode={brandMode} />
                    </TabsContent>
                    <TabsContent value="links">
                      <LinksEditor brandMode={brandMode} />
                    </TabsContent>
                    <TabsContent value="style">
                      <StyleCustomizer />
                    </TabsContent>
                    <TabsContent value="analytics">
                      <Analytics />
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            {brandMode && (
              <Card className="shadow-elevation-2 bg-surface-container border-0 rounded-3xl ring-2 ring-accent/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3 text-xl font-normal text-on-surface">
                    <div className="p-2 bg-accent/10 rounded-full">
                      <Crown className="h-5 w-5 text-accent" />
                    </div>
                    <span>Brand Features</span>
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-0 rounded-full">Pro</Badge>
                  </CardTitle>
                  <CardDescription className="text-on-surface-variant">
                    Advanced features for brands and businesses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="elevated" className="h-20 flex-col rounded-2xl">
                      <Plus className="h-6 w-6 mb-2" />
                      <span className="text-sm">Product Carousel</span>
                    </Button>
                    <Button variant="elevated" className="h-20 flex-col rounded-2xl">
                      <Plus className="h-6 w-6 mb-2" />
                      <span className="text-sm">Newsletter Embed</span>
                    </Button>
                    <Button variant="elevated" className="h-20 flex-col rounded-2xl">
                      <Plus className="h-6 w-6 mb-2" />
                      <span className="text-sm">CTA Buttons</span>
                    </Button>
                    <Button variant="elevated" className="h-20 flex-col rounded-2xl">
                      <Plus className="h-6 w-6 mb-2" />
                      <span className="text-sm">Shop Integration</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}