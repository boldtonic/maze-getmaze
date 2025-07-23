import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin, 
  ExternalLink,
  Music,
  Play,
  ShoppingBag
} from "lucide-react";

interface SlugPreviewProps {
  mode: "mobile" | "desktop";
  brandMode: boolean;
}

export function SlugPreview({ mode, brandMode }: SlugPreviewProps) {
  const containerClass = mode === "mobile" 
    ? "max-w-sm mx-auto" 
    : "max-w-2xl mx-auto";

  return (
    <div className="space-y-6">
      {/* Thumbnail Preview showing how it appears on websites */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">How it appears on websites</h4>
        <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg p-6 overflow-hidden">
          {/* Simulated website content with blur */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 to-slate-300/50 dark:from-slate-700/50 dark:to-slate-800/50" />
          <div className="relative space-y-4 blur-sm opacity-60">
            <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-3/4" />
            <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded w-1/2" />
            <div className="space-y-2">
              <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded" />
              <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded w-5/6" />
            </div>
          </div>
          
          {/* Highlighted mention with pop-up preview */}
          <div className="absolute top-4 left-6 right-6">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Great article by{" "}
              <span 
                className="px-1 rounded font-medium cursor-pointer relative group"
                style={{ backgroundColor: "hsl(var(--accent))", color: "white" }}
              >
                @janedoe
                
                {/* Hover preview window */}
                <div className="absolute top-full left-0 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-10">
                  <div className="w-64 bg-background border border-border rounded-lg shadow-elevation-3 p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-primary text-white text-sm">
                          JD
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">Jane Doe</div>
                        <div className="text-xs text-muted-foreground">Creative Designer</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Sharing my journey in design and creativity...
                    </p>
                  </div>
                </div>
              </span>
              {" "}about the future of design.
            </p>
          </div>
        </div>
      </div>

      {/* Main SLUG Window Preview */}
      <div className={`${containerClass} relative`}>
        {/* Desktop-oriented rectangular window */}
        <Card className="overflow-hidden shadow-elevation-3 bg-gradient-to-br from-background to-surface-variant border-0">
          <CardContent className="p-8 space-y-8">
            {/* Profile Section - Horizontal Layout for Desktop */}
            <div className="flex items-start space-x-6">
              <Avatar className="h-24 w-24 ring-4 ring-primary/20 flex-shrink-0">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback className="bg-gradient-primary text-white text-xl font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    Jane Doe
                    {brandMode && (
                      <Badge variant="secondary" className="ml-3">
                        Verified
                      </Badge>
                    )}
                  </h2>
                  <p className="text-muted-foreground">
                    {brandMode ? "Creative Director & Brand Strategist" : "Content Creator & Designer"}
                  </p>
                </div>

                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {brandMode 
                    ? "Helping brands tell their story through design. 10+ years experience in creative direction and visual identity development."
                    : "Sharing my journey in design and creativity. Coffee enthusiast ☕ Always exploring new ways to create meaningful digital experiences."
                  }
                </p>
              </div>
            </div>

            {/* Content Grid - Drag & Drop Style Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Featured Links Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-foreground">Featured Links</h3>
                  {brandMode && (
                    <Badge variant="outline" className="text-xs">
                      Pro
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between bg-surface hover:bg-surface-variant transition-colors h-12"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <ExternalLink className="h-4 w-4 text-white" />
                      </div>
                      <span>Latest Portfolio</span>
                    </div>
                    <ExternalLink className="h-4 w-4" />
                  </Button>

                  {brandMode && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-between bg-surface hover:bg-surface-variant transition-colors h-12"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                          <ShoppingBag className="h-4 w-4 text-white" />
                        </div>
                        <span>Shop Products</span>
                      </div>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}

                  <Button 
                    variant="outline" 
                    className="w-full justify-between bg-surface hover:bg-surface-variant transition-colors h-12"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-lg bg-red-500 flex items-center justify-center">
                        <Youtube className="h-4 w-4 text-white" />
                      </div>
                      <span>Watch Process</span>
                    </div>
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Social & Connect Section */}
              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Connect</h3>
                <div className="grid grid-cols-4 gap-3">
                  <Button size="sm" variant="ghost" className="h-12 w-full flex-col">
                    <Twitter className="h-5 w-5 mb-1" />
                    <span className="text-xs">Twitter</span>
                  </Button>
                  <Button size="sm" variant="ghost" className="h-12 w-full flex-col">
                    <Instagram className="h-5 w-5 mb-1" />
                    <span className="text-xs">Instagram</span>
                  </Button>
                  <Button size="sm" variant="ghost" className="h-12 w-full flex-col">
                    <Linkedin className="h-5 w-5 mb-1" />
                    <span className="text-xs">LinkedIn</span>
                  </Button>
                  <Button size="sm" variant="ghost" className="h-12 w-full flex-col">
                    <Music className="h-5 w-5 mb-1" />
                    <span className="text-xs">Music</span>
                  </Button>
                </div>

                {brandMode && (
                  <div className="space-y-3 pt-3 border-t border-border">
                    <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                      Schedule Consultation
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Powered by SLUG Network
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview Badge */}
        <div className="absolute -top-2 -right-2">
          <Badge className="bg-accent shadow-elevation-2">
            Live Preview
          </Badge>
        </div>
      </div>
    </div>
  );
}