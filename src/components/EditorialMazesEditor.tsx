import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, ImagePlus, Palette, Eye, Plus, Crown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StyleCustomizer } from "./StyleCustomizer";

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
  profileId: string;
  profile: {
    displayName: string;
    bio: string;
    title: string;
  };
  onSave: (mazeData: any) => Promise<void>;
  savedMazes: any[];
}

export function EditorialMazesEditor({
  coverImage,
  onImageUpload,
  editorialMaze,
  onEditorialMazeChange,
  links,
  style,
  onStyleChange,
  onUpgradeClick,
  onPreviewClick,
  isPremium,
  maxMazes,
  profileId,
  profile,
  onSave,
  savedMazes
}: EditorialMazesEditorProps) {
  const [selectedMazeId, setSelectedMazeId] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Update createdMazes from savedMazes
  const createdMazes = savedMazes.map(maze => ({
    id: maze.id,
    name: maze.title || 'Untitled Maze'
  }));

  // Load selected maze data when selection changes
  useEffect(() => {
    if (selectedMazeId && savedMazes.length > 0) {
      const maze = savedMazes.find(m => m.id === selectedMazeId);
      if (maze?.configuration) {
        onEditorialMazeChange({
          theme: maze.configuration.theme || "",
          idea: maze.configuration.idea || "",
          context: maze.configuration.context || ""
        });
      }
    }
  }, [selectedMazeId]);

  const handleCreateMaze = () => {
    if (createdMazes.length >= maxMazes) {
      onUpgradeClick("More Editorial Mazes");
    } else {
      setSelectedMazeId(null);
      // Reset the maze data for the new maze
      onEditorialMazeChange({
        theme: "",
        idea: "",
        context: ""
      });
    }
  };

  const handleMazeSelection = (value: string) => {
    if (value === "create-new") {
      handleCreateMaze();
    } else {
      setSelectedMazeId(value);
    }
  };

  const handleSaveMaze = async () => {
    if (!editorialMaze.theme) {
      toast.error("Please add a theme before saving");
      return;
    }

    setSaveState('saving');
    try {
      const mazeData = {
        id: selectedMazeId || undefined,
        title: editorialMaze.theme,
        description: editorialMaze.idea,
        configuration: {
          theme: editorialMaze.theme,
          idea: editorialMaze.idea,
          context: editorialMaze.context,
          coverImage,
          style,
          profile,
          links
        }
      };

      await onSave(mazeData);
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 2000);
    } catch (error) {
      setSaveState('idle');
    }
  };
  
  const handleInputChange = (field: keyof typeof editorialMaze, value: string) => {
    const updatedMaze = { ...editorialMaze, [field]: value };
    onEditorialMazeChange(updatedMaze);
  };

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
              <Select value={selectedMazeId || "create-new"} onValueChange={handleMazeSelection}>
                <SelectTrigger id="maze-selector" className="w-full bg-primary text-primary-foreground border-primary hover:bg-primary/90 transition-colors">
                  <SelectValue placeholder="Select a maze" className="text-primary-foreground data-[placeholder]:text-primary-foreground/80" />
                </SelectTrigger>
                <SelectContent className="bg-surface text-foreground border-border z-50">
                  {createdMazes.map((maze) => (
                    <SelectItem key={maze.id} value={maze.id} className="text-foreground hover:bg-primary/15 cursor-pointer focus:bg-primary/20 focus:text-foreground">
                      {maze.name}
                    </SelectItem>
                  ))}
                  {createdMazes.length < maxMazes && (
                    <SelectItem 
                      value="create-new" 
                      className="text-foreground hover:bg-primary/15 cursor-pointer font-medium focus:bg-primary/20"
                    >
                      <div className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        <span>Create New Maze</span>
                      </div>
                    </SelectItem>
                  )}
                  {createdMazes.length >= maxMazes && !isPremium && (
                    <SelectItem 
                      value="upgrade-required" 
                      disabled
                      className="text-on-surface-variant opacity-60"
                    >
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4" />
                        <span>Upgrade for more mazes</span>
                      </div>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-shrink-0 pt-6">
              <Button
                variant="primary"
                size="sm"
                onClick={handleCreateMaze}
                disabled={createdMazes.length >= maxMazes}
                className="text-label-large whitespace-nowrap"
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
                if (e.target.value.length <= 50) {
                  handleInputChange('idea', e.target.value);
                }
              }}
              placeholder="Your angle or perspective"
              maxLength={50}
            />
            <p className={`text-body-small ${editorialMaze.idea.length > 40 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {editorialMaze.idea.length}/50 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="context">Context</Label>
            <Textarea
              id="context"
              value={editorialMaze.context}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  handleInputChange('context', e.target.value);
                }
              }}
              placeholder="Additional context"
              rows={3}
              className="resize-none"
              maxLength={100}
            />
            <p className={`text-body-small ${editorialMaze.context.length > 80 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {editorialMaze.context.length}/100 characters
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
              <StyleCustomizer 
                style={style} 
                onStyleChange={onStyleChange}
                onUpgradeClick={onUpgradeClick}
                isPremium={isPremium}
              />
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
      <Button 
        variant="primary" 
        size="sm" 
        className={`w-full text-label-large transition-all duration-300 ${
          saveState === 'saved' ? 'bg-green-600 hover:bg-green-600' : ''
        } ${saveState === 'saving' ? 'animate-pulse' : ''}`}
        onClick={handleSaveMaze}
        disabled={saveState !== 'idle'}
      >
        {saveState === 'idle' && (selectedMazeId ? "Update Maze" : "Save New Maze")}
        {saveState === 'saving' && 'Saving...'}
        {saveState === 'saved' && (
          <span className="flex items-center gap-2 animate-scale-in">
            <Check className="h-4 w-4" />
            Saved!
          </span>
        )}
      </Button>
    </div>
  );
}
