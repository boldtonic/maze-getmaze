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
    : "max-w-md mx-auto";

  return (
    <div className={`${containerClass} relative`}>
      {/* Material Design Floating Window */}
      <Card className="overflow-hidden shadow-elevation-3 bg-gradient-to-br from-background to-surface-variant border-0">
        <CardContent className="p-6 space-y-6">
          {/* Profile Header */}
          <div className="text-center space-y-4">
            <Avatar className="h-20 w-20 mx-auto ring-4 ring-primary/20">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback className="bg-gradient-primary text-white text-lg font-semibold">
                JD
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Jane Doe
                {brandMode && (
                  <Badge variant="secondary" className="ml-2">
                    Verified
                  </Badge>
                )}
              </h2>
              <p className="text-muted-foreground text-sm">
                {brandMode ? "Creative Director & Brand Strategist" : "Content Creator & Designer"}
              </p>
            </div>

            <p className="text-sm text-on-surface-variant px-2">
              {brandMode 
                ? "Helping brands tell their story through design. 10+ years experience in creative direction."
                : "Sharing my journey in design and creativity. Coffee enthusiast ☕"
              }
            </p>
          </div>

          {/* Featured Links */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Featured</h3>
              {brandMode && (
                <Badge variant="outline" className="text-xs">
                  Pro
                </Badge>
              )}
            </div>
            
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-between bg-surface hover:bg-surface-variant transition-colors"
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
                  className="w-full justify-between bg-surface hover:bg-surface-variant transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                      <ShoppingBag className="h-4 w-4 text-white" />
                    </div>
                    <span>Shop Our Products</span>
                  </div>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}

              <Button 
                variant="outline" 
                className="w-full justify-between bg-surface hover:bg-surface-variant transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-red-500 flex items-center justify-center">
                    <Youtube className="h-4 w-4 text-white" />
                  </div>
                  <span>Watch My Process</span>
                </div>
                <Play className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Connect</h3>
            <div className="flex justify-center space-x-4">
              <Button size="sm" variant="ghost" className="h-10 w-10 p-0">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="h-10 w-10 p-0">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="h-10 w-10 p-0">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="h-10 w-10 p-0">
                <Music className="h-5 w-5" />
              </Button>
            </div>
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
        </CardContent>
      </Card>

      {/* Preview Badge */}
      <div className="absolute -top-2 -right-2">
        <Badge className="bg-accent shadow-elevation-2">
          Live Preview
        </Badge>
      </div>
    </div>
  );
}