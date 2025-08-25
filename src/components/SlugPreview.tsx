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
          {/* 16:9 Aspect Ratio Container */}
          <div className="aspect-video w-full max-w-sm mx-auto">
            <Card className="overflow-hidden shadow-elevation-1 bg-background border border-border/50 rounded-2xl h-full">
              <CardContent className="p-6 h-full flex flex-col items-center justify-center text-center">
                {/* Profile Photo - Rounded square like the reference */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-primary opacity-20"></div>
                </div>
                
                {/* Name and Verification */}
                <div className="mb-3">
                  <h2 className="text-xl font-semibold text-foreground flex items-center justify-center gap-2 mb-1">
                    Jane Doe
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </h2>
                </div>

                {/* Bio */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-[200px]">
                  Product Designer who focuses on simplicity & usability.
                </p>

                {/* Image Carousel */}
                <div className="w-full max-w-[200px] mb-4">
                  <Carousel className="w-full">
                    <CarouselContent>
                      <CarouselItem>
                        <div className="w-full h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </CarouselItem>
                      <CarouselItem>
                        <div className="w-full h-20 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg flex items-center justify-center">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                      </CarouselItem>
                      <CarouselItem>
                        <div className="w-full h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-6 h-6 text-white" />
                        </div>
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-foreground">1.2k</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold text-foreground">156</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-semibold text-foreground">892</span>
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