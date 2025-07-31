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
  brandMode: boolean;
}

export function SlugPreview({ brandMode }: SlugPreviewProps) {

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

      {/* Main SLUG Window Preview - 16:9 Format */}
      <div className="relative">
        {/* 16:9 Aspect Ratio Container */}
        <div className="aspect-video w-full">
          <Card className="overflow-hidden shadow-elevation-2 bg-surface-container border-0 rounded-3xl h-full">
            <CardContent className="p-6 h-full flex flex-col justify-between">
            {/* Profile Section - Horizontal Layout optimized for 16:9 */}
            <div className="flex items-start space-x-6">
              <Avatar className="h-16 w-16 ring-2 ring-primary/20 flex-shrink-0">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback className="bg-gradient-primary text-white text-lg font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div>
                  <h2 className="text-xl font-semibold text-foreground flex items-center">
                    Jane Doe
                    {brandMode && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Verified
                      </Badge>
                    )}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {brandMode ? "Creative Director & Brand Strategist" : "Content Creator & Designer"}
                  </p>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {brandMode 
                    ? "Helping brands tell their story through design. 10+ years experience in creative direction."
                    : "Sharing my journey in design and creativity. Coffee enthusiast ☕"
                  }
                </p>
              </div>
            </div>

            {/* Content Grid - Compact for 16:9 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Featured Links Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">Featured Links</h3>
                  {brandMode && (
                    <Badge variant="outline" className="text-xs">
                      Pro
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Button 
                    variant="elevated" 
                    className="w-full justify-between h-10 rounded-2xl text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-lg bg-primary flex items-center justify-center">
                        <ExternalLink className="h-3 w-3 text-primary-foreground" />
                      </div>
                      <span>Latest Portfolio</span>
                    </div>
                    <ExternalLink className="h-3 w-3" />
                  </Button>

                  {brandMode && (
                    <Button 
                      variant="elevated" 
                      className="w-full justify-between h-10 rounded-2xl text-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="h-6 w-6 rounded-lg bg-accent flex items-center justify-center">
                          <ShoppingBag className="h-3 w-3 text-accent-foreground" />
                        </div>
                        <span>Shop Products</span>
                      </div>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}

                  <Button 
                    variant="elevated" 
                    className="w-full justify-between h-10 rounded-2xl text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-lg bg-red-500 flex items-center justify-center">
                        <Youtube className="h-3 w-3 text-white" />
                      </div>
                      <span>Watch Process</span>
                    </div>
                    <Play className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Social & Connect Section */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">Connect</h3>
                <div className="grid grid-cols-4 gap-2">
                  <Button size="sm" variant="ghost" className="h-10 w-full flex-col rounded-2xl">
                    <Twitter className="h-4 w-4 mb-1" />
                    <span className="text-xs">Twitter</span>
                  </Button>
                  <Button size="sm" variant="ghost" className="h-10 w-full flex-col rounded-2xl">
                    <Instagram className="h-4 w-4 mb-1" />
                    <span className="text-xs">Instagram</span>
                  </Button>
                  <Button size="sm" variant="ghost" className="h-10 w-full flex-col rounded-2xl">
                    <Linkedin className="h-4 w-4 mb-1" />
                    <span className="text-xs">LinkedIn</span>
                  </Button>
                  <Button size="sm" variant="ghost" className="h-10 w-full flex-col rounded-2xl">
                    <Music className="h-4 w-4 mb-1" />
                    <span className="text-xs">Music</span>
                  </Button>
                </div>

                {brandMode && (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <Button className="w-full rounded-2xl h-9 text-sm">
                      Schedule Consultation
                    </Button>
                    <p className="text-xs text-center text-on-surface-variant">
                      Powered by SLUG Network
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

        {/* Material 3 Floating Action Button Style Badge */}
        <div className="absolute -top-3 -right-3">
          <Badge className="bg-accent text-accent-foreground shadow-elevation-3 rounded-full px-3 py-1 border-0">
            Live Preview
          </Badge>
        </div>
      </div>
    </div>
  );
}