import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, ImagePlus, Palette, Lock, Crown, Eye, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  thumbnail?: string;
  type: "featured" | "social";
}

interface EditorialMazesEditorProps {
  coverImage: string | null;
  onImageUpload: () => void;
  editorialMaze: {
    theme: string;
    idea: string;
    context: string;
  };
  onEditorialMazeChange: (maze: { theme: string; idea: string; context: string }) => void;
  links: Link[];
  onLinksChange: (links: Link[]) => void;
  style: {
    backgroundColor: string;
    accentColor: string;
    fontFamily: string;
    borderRadius: number;
    theme: string;
    orientation: 'horizontal' | 'vertical';
  };
  onStyleChange: (style: any) => void;
  onUpgradeClick: (feature: string) => void;
  onPreviewClick: () => void;
  isPremium: boolean;
  maxMazes: number;
}

export function EditorialMazesEditor({
  coverImage,
  onImageUpload,
  editorialMaze,
  onEditorialMazeChange,
  style,
  onStyleChange,
  onUpgradeClick,
  onPreviewClick,
  isPremium,
  maxMazes
}: EditorialMazesEditorProps) {
  const [designTab, setDesignTab] = useState("colors");
  const [selectedMazeId, setSelectedMazeId] = useState("1");
  const [createdMazes] = useState([
    { id: "1", name: "AI Safety" },
  ]);

  const handleCreateMaze = () => {
    if (createdMazes.length >= maxMazes) {
      onUpgradeClick("More Editorial Mazes");
    } else {
      // Create new maze logic would go here
      console.log("Creating new maze...");
    }
  };
  
  const handleInputChange = (field: keyof typeof editorialMaze, value: string) => {
    const updatedMaze = { ...editorialMaze, [field]: value };
    onEditorialMazeChange(updatedMaze);
  };

  const fonts = [
    { name: "Inter", label: "Inter" },
    { name: "Georgia", label: "Georgia" },
    { name: "Space Mono", label: "Space Mono" },
    { name: "Playfair Display", label: "Playfair Display" },
  ];

  return (
    <div className="space-y-6">
      {/* Maze Count and Selector */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body-medium text-on-surface">Editorial Mazes</p>
              <p className="text-body-small text-on-surface-variant">{createdMazes.length} of {maxMazes} mazes created</p>
            </div>
            {!isPremium && (
              <Badge 
                variant="secondary" 
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => onUpgradeClick("More Editorial Mazes")}
              >
                <Crown className="h-3 w-3" />
                <span>Upgrade for 10 mazes</span>
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Label htmlFor="maze-selector" className="text-body-small text-on-surface-variant mb-2 block">
                Select Maze
              </Label>
              <Select value={selectedMazeId} onValueChange={setSelectedMazeId}>
                <SelectTrigger id="maze-selector" className="w-full bg-surface border-border">
                  <SelectValue placeholder="Select a maze" />
                </SelectTrigger>
                <SelectContent className="bg-surface border-border z-50">
                  {createdMazes.map((maze) => (
                    <SelectItem key={maze.id} value={maze.id} className="hover:bg-surface-container-high cursor-pointer">
                      {maze.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-shrink-0 pt-6">
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreateMaze}
                className="text-label-large whitespace-nowrap"
                disabled={!isPremium && createdMazes.length >= maxMazes}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Maze
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme - Design - Preview Tabs */}
      <Tabs defaultValue="theme" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-surface-container-high rounded-2xl p-1">
          <TabsTrigger 
            value="theme" 
            className="data-[state=active]:bg-surface data-[state=active]:shadow-elevation-0 rounded-xl transition-all duration-200"
          >
            Theme
          </TabsTrigger>
          <TabsTrigger 
            value="design" 
            className="data-[state=active]:bg-surface data-[state=active]:shadow-elevation-0 rounded-xl transition-all duration-200"
          >
            Design
          </TabsTrigger>
          <TabsTrigger 
            value="preview" 
            className="data-[state=active]:bg-surface data-[state=active]:shadow-elevation-0 rounded-xl transition-all duration-200"
          >
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="space-y-6 mt-6">

      {/* Cover Image */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-headline-medium">
            <span>Theme Cover</span>
          </CardTitle>
          <CardDescription className="text-body-medium">
            Upload an image that represents this editorial theme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 rounded-xl overflow-hidden ring-4 ring-primary/20" style={{ backgroundColor: '#87b2f3' }}>
              {coverImage ? (
                <img 
                  src={coverImage} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <ImagePlus className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Button 
                variant="primary"
                size="sm"
                className="flex items-center space-x-2 text-label-large"
                onClick={onImageUpload}
              >
                <Upload className="h-4 w-4" />
                <span>Upload Image</span>
              </Button>
              <p className="text-body-small text-muted-foreground">
                Recommended: 200px×100px (2:1 aspect ratio), JPG or PNG
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-headline-medium">
            <span>Theme Information</span>
          </CardTitle>
          <CardDescription className="text-body-medium">
            Define the editorial theme or concept
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme or Keyword</Label>
            <Input
              id="theme"
              value={editorialMaze.theme}
              onChange={(e) => handleInputChange('theme', e.target.value)}
              placeholder="e.g., AI Safety, Climate Tech, Web3"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="idea">Idea</Label>
            <Input
              id="idea"
              value={editorialMaze.idea}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  handleInputChange('idea', e.target.value);
                }
              }}
              placeholder="Brief angle (max 60 chars)"
              maxLength={60}
            />
            <p className={`text-body-small ${editorialMaze.idea.length > 50 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {editorialMaze.idea.length}/60 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="context">Context</Label>
            <Textarea
              id="context"
              value={editorialMaze.context}
              onChange={(e) => {
                if (e.target.value.length <= 120) {
                  handleInputChange('context', e.target.value);
                }
              }}
              placeholder="Brief context (max 120 chars)"
              rows={3}
              className="resize-none"
              maxLength={120}
            />
            <p className={`text-body-small ${editorialMaze.context.length > 100 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {editorialMaze.context.length}/120 characters
            </p>
          </div>
        </CardContent>
      </Card>

          </TabsContent>

        <TabsContent value="design" className="space-y-6 mt-6">
          {/* Style Customization */}
          <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-headline-medium">
            <Palette className="h-5 w-5 text-primary" />
            <span>Design</span>
          </CardTitle>
          <CardDescription className="text-body-medium">
            Customize the visual appearance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={designTab} onValueChange={setDesignTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bgColor">Background Color</Label>
                <div className="flex items-center space-x-3">
                  <Input
                    id="bgColor"
                    type="color"
                    value={style.backgroundColor}
                    onChange={(e) => onStyleChange({ ...style, backgroundColor: e.target.value })}
                    className="w-20 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={style.backgroundColor}
                    onChange={(e) => onStyleChange({ ...style, backgroundColor: e.target.value })}
                    placeholder="#ffffff"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accentColor">Accent Color</Label>
                <div className="flex items-center space-x-3">
                  <Input
                    id="accentColor"
                    type="color"
                    value={style.accentColor}
                    onChange={(e) => onStyleChange({ ...style, accentColor: e.target.value })}
                    className="w-20 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={style.accentColor}
                    onChange={(e) => onStyleChange({ ...style, accentColor: e.target.value })}
                    placeholder="#6366f1"
                    className="flex-1"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="typography" className="space-y-4">
              <div className="space-y-2">
                <Label>Font Family</Label>
                <div className="grid grid-cols-2 gap-2">
                  {fonts.map((font) => (
                    <Button
                      key={font.name}
                      variant={style.fontFamily === font.name ? "default" : "outline"}
                      className="justify-start"
                      style={{ fontFamily: font.name }}
                      onClick={() => {
                        if (!isPremium) {
                          onUpgradeClick("Custom Typography");
                        } else {
                          onStyleChange({ ...style, fontFamily: font.name });
                        }
                      }}
                    >
                      {!isPremium && style.fontFamily !== font.name && (
                        <Lock className="h-3 w-3 mr-2" />
                      )}
                      {font.label}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="layout" className="space-y-4">
              <div className="space-y-2">
                <Label>Card Orientation</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={style.orientation === "horizontal" ? "default" : "outline"}
                    onClick={() => {
                      if (!isPremium) {
                        onUpgradeClick("Layout Options");
                      } else {
                        onStyleChange({ ...style, orientation: "horizontal" });
                      }
                    }}
                  >
                    {!isPremium && style.orientation !== "horizontal" && (
                      <Lock className="h-3 w-3 mr-2" />
                    )}
                    Horizontal
                  </Button>
                  <Button
                    variant={style.orientation === "vertical" ? "default" : "outline"}
                    onClick={() => {
                      if (!isPremium) {
                        onUpgradeClick("Layout Options");
                      } else {
                        onStyleChange({ ...style, orientation: "vertical" });
                      }
                    }}
                  >
                    {!isPremium && style.orientation !== "vertical" && (
                      <Lock className="h-3 w-3 mr-2" />
                    )}
                    Vertical
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="borderRadius">Border Radius</Label>
                  {!isPremium && (
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <Crown className="h-3 w-3" />
                      <span>Premium</span>
                    </Badge>
                  )}
                </div>
                <div className={!isPremium ? "opacity-50 pointer-events-none" : ""}>
                  <Slider
                    id="borderRadius"
                    min={0}
                    max={24}
                    step={4}
                    value={[style.borderRadius]}
                    onValueChange={(value) => onStyleChange({ ...style, borderRadius: value[0] })}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-2">{style.borderRadius}px</p>
                </div>
                {!isPremium && (
                  <p className="text-body-small text-muted-foreground">
                    Upgrade to customize border radius
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <Button 
            variant="primary" 
            size="sm" 
            className="w-full text-label-large mt-6"
            onClick={() => {
              if (!isPremium && (designTab === "typography" || designTab === "layout")) {
                onUpgradeClick(`${designTab === "typography" ? "Typography" : "Layout"} Customization`);
              }
            }}
          >
            {!isPremium && (designTab === "typography" || designTab === "layout") ? (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Upgrade to Unlock
              </>
            ) : (
              "Save Design Changes"
            )}
          </Button>
        </CardContent>
      </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-headline-medium">
                <Eye className="h-5 w-5 text-primary" />
                <span>Live Preview</span>
              </CardTitle>
              <CardDescription className="text-body-medium">
                Preview how your Editorial Maze will appear when triggered
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-body-small text-on-surface-variant">
                  Use the full preview to see your maze in action
                </div>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="w-full text-label-large"
                  onClick={onPreviewClick}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Open Full Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <Button variant="primary" size="sm" className="w-full text-label-large">
        Save Editorial Maze
      </Button>
    </div>
  );
}
