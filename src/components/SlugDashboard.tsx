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
  Eye,
  Smartphone,
  Monitor
} from "lucide-react";
import { SlugPreview } from "./SlugPreview";
import { ProfileEditor } from "./ProfileEditor";
import { LinksEditor } from "./LinksEditor";
import { StyleCustomizer } from "./StyleCustomizer";
import { Analytics } from "./Analytics";

export function SlugDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [brandMode, setBrandMode] = useState(false);
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("mobile");

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-surface-variant">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">SLUG Manager</h1>
                <p className="text-sm text-muted-foreground">Your semantic identity window</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant={brandMode ? "default" : "outline"}
                size="sm"
                onClick={() => setBrandMode(!brandMode)}
                className="flex items-center space-x-2"
              >
                <Crown className="h-4 w-4" />
                <span>{brandMode ? "Brand Mode" : "Creator Mode"}</span>
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview Live
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Editor */}
          <div className="space-y-6">
            <Card className="shadow-elevation-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Edit Your SLUG</span>
                </CardTitle>
                <CardDescription>
                  Customize your semantic identity window that appears when you're mentioned online
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">Profile</span>
                    </TabsTrigger>
                    <TabsTrigger value="links" className="flex items-center space-x-2">
                      <Link className="h-4 w-4" />
                      <span className="hidden sm:inline">Links</span>
                    </TabsTrigger>
                    <TabsTrigger value="style" className="flex items-center space-x-2">
                      <Palette className="h-4 w-4" />
                      <span className="hidden sm:inline">Style</span>
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="flex items-center space-x-2">
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
              <Card className="shadow-elevation-2 border-accent">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-accent">
                    <Crown className="h-5 w-5" />
                    <span>Brand Features</span>
                    <Badge variant="secondary">Pro</Badge>
                  </CardTitle>
                  <CardDescription>
                    Advanced features for brands and businesses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <Plus className="h-6 w-6 mb-2" />
                      <span className="text-sm">Product Carousel</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Plus className="h-6 w-6 mb-2" />
                      <span className="text-sm">Newsletter Embed</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Plus className="h-6 w-6 mb-2" />
                      <span className="text-sm">CTA Buttons</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Plus className="h-6 w-6 mb-2" />
                      <span className="text-sm">Shop Integration</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <Card className="shadow-elevation-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Live Preview</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={previewMode === "mobile" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("mobile")}
                    >
                      <Smartphone className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={previewMode === "desktop" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("desktop")}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  See how your SLUG will appear when you're mentioned
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SlugPreview mode={previewMode} brandMode={brandMode} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}