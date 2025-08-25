import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin, 
  ExternalLink,
  Music,
  Play,
  ShoppingBag,
  Heart,
  MessageCircle
} from "lucide-react";

interface SlugPreviewProps {
  brandMode: boolean;
  previewMode?: "card" | "mention";
}

export function SlugPreview({ brandMode, previewMode = "card" }: SlugPreviewProps) {

  return (
    <div className="space-y-6">
      {/* Show mention effect preview when previewMode is "mention" */}
      {previewMode === "mention" && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">How it appears on websites</h4>
          <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg p-6 overflow-hidden">
            {/* Simulated website content with blur */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 to-slate-300/50 dark:from-slate-700/50 dark:to-slate-800/50 -z-10" />
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
      )}

      {/* Show card preview when previewMode is "card" */}
      {previewMode === "card" && (
        <div className="relative">
          {/* Fixed dimensions: 420w x 236h (16:9 aspect ratio) */}
          <div className="w-[420px] h-[236px] mx-auto">
            <Card className="overflow-hidden shadow-elevation-1 bg-background border border-border/50 rounded-2xl h-full w-full">
              <CardContent className="p-3 h-full">
                {/* Bento Grid Layout - Horizontal */}
                <div className="grid grid-cols-4 grid-rows-2 gap-2 h-full">
                  {/* Profile Section - Left */}
                  <div className="col-span-1 row-span-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-3 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary mb-2 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">JD</span>
                    </div>
                    <h3 className="text-xs font-semibold text-foreground text-center leading-tight">Jane Doe</h3>
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex items-center justify-center">
                      <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Image 1 - Top */}
                  <div className="col-span-1 row-span-1 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>

                  {/* Image 2 - Top */}
                  <div className="col-span-1 row-span-1 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>

                  {/* Large Image - Top Right */}
                  <div className="col-span-1 row-span-2 bg-gradient-to-r from-green-400 to-teal-500 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center">
                      <Instagram className="w-6 h-6 text-white mx-auto mb-1" />
                      <span className="text-xs text-white font-medium">Latest Work</span>
                    </div>
                  </div>

                  {/* Bio Text - Bottom Left */}
                  <div className="col-span-1 row-span-1 bg-accent/10 rounded-xl p-2 flex items-center">
                    <p className="text-xs text-muted-foreground leading-tight">Product Designer</p>
                  </div>

                  {/* Image 3 - Bottom */}
                  <div className="col-span-1 row-span-1 bg-gradient-to-br from-pink-400 to-red-500 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
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
      )}
    </div>
  );
}