import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  GripVertical, 
  ExternalLink, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  Music,
  ShoppingBag,
  Trash2,
  Crown
} from "lucide-react";

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  thumbnail?: string;
  type: "featured" | "social";
  position: "A2" | "A3" | "B3";
}

interface LinksEditorProps {
  brandMode: boolean;
  links: Link[];
  onLinksChange: (links: Link[]) => void;
}

export function LinksEditor({ brandMode, links, onLinksChange }: LinksEditorProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverPosition, setDragOverPosition] = useState<"A2" | "A3" | "B3" | null>(null);
  const dragNodeRef = useRef<HTMLDivElement>(null);

  const maxLinks = brandMode ? 3 : 2;
  const canAddLink = links.length < maxLinks;
  
  const getNextAvailablePosition = (): "A2" | "A3" | "B3" => {
    const usedPositions = new Set(links.map(link => link.position));
    const availablePositions = brandMode ? ["A2", "A3", "B3"] : ["A2", "B3"];
    
    for (const pos of availablePositions) {
      if (!usedPositions.has(pos as any)) {
        return pos as "A2" | "A3" | "B3";
      }
    }
    return "A2"; // fallback
  };

  const addLink = () => {
    if (!canAddLink) return;
    
    const newLink: Link = {
      id: Date.now().toString(),
      title: "New Link",
      url: "",
      icon: "link",
      type: "featured",
      position: getNextAvailablePosition()
    };
    onLinksChange([...links, newLink]);
  };

  const updateLink = (id: string, field: string, value: string) => {
    const updatedLinks = links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    );
    onLinksChange(updatedLinks);
  };

  const removeLink = (id: string) => {
    const updatedLinks = links.filter(link => link.id !== id);
    onLinksChange(updatedLinks);
  };

  const changePosition = (id: string, newPosition: "A2" | "A3" | "B3") => {
    const draggedLink = links.find(link => link.id === id);
    const targetLink = links.find(link => link.position === newPosition);
    
    if (draggedLink && draggedLink.position !== newPosition) {
      let updatedLinks;
      
      if (targetLink) {
        // Swap positions
        updatedLinks = links.map(link => {
          if (link.id === id) {
            return { ...link, position: newPosition };
          }
          if (link.id === targetLink.id) {
            return { ...link, position: draggedLink.position };
          }
          return link;
        });
      } else {
        // Move to empty position
        updatedLinks = links.map(link => 
          link.id === id 
            ? { ...link, position: newPosition }
            : link
        );
      }
      
      console.log('Button change - updating links:', updatedLinks);
      onLinksChange(updatedLinks);
    }
  };

  const handleDragStart = (e: React.DragEvent, linkId: string) => {
    setDraggedItem(linkId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', linkId);
    
    // Add drag ghost effect
    if (dragNodeRef.current) {
      const dragImage = dragNodeRef.current.cloneNode(true) as HTMLElement;
      dragImage.style.transform = 'rotate(5deg)';
      dragImage.style.opacity = '0.8';
      document.body.appendChild(dragImage);
      e.dataTransfer.setDragImage(dragImage, 20, 20);
      setTimeout(() => document.body.removeChild(dragImage), 0);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverPosition(null);
  };

  const handleDragOver = (e: React.DragEvent, position: "A2" | "A3" | "B3") => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverPosition(position);
  };

  const handleDragLeave = () => {
    setDragOverPosition(null);
  };

  const handleDrop = (e: React.DragEvent, targetPosition: "A2" | "A3" | "B3") => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/html');
    
    if (draggedId && draggedItem) {
      const draggedLink = links.find(link => link.id === draggedId);
      const targetLink = links.find(link => link.position === targetPosition);
      
      if (draggedLink && draggedLink.position !== targetPosition) {
        let updatedLinks;
        
        if (targetLink) {
          // Swap positions
          updatedLinks = links.map(link => {
            if (link.id === draggedId) {
              return { ...link, position: targetPosition };
            }
            if (link.id === targetLink.id) {
              return { ...link, position: draggedLink.position };
            }
            return link;
          });
        } else {
          // Move to empty position
          updatedLinks = links.map(link => 
            link.id === draggedId 
              ? { ...link, position: targetPosition }
              : link
          );
        }
        
        console.log('Updating links:', updatedLinks);
        onLinksChange(updatedLinks);
      }
    }
    
    setDraggedItem(null);
    setDragOverPosition(null);
  };


  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      portfolio: ExternalLink,
      youtube: Youtube,
      link: ExternalLink,
      shop: ShoppingBag,
    };
    return iconMap[iconName] || ExternalLink;
  };

  return (
    <div className="space-y-6">
      {/* Featured Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ExternalLink className="h-5 w-5" />
            <span>Featured Links</span>
          </CardTitle>
          <CardDescription>
            Add your most important links that will appear prominently
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {links.map((link, index) => {
            const IconComponent = getIconComponent(link.icon);
            const isDragging = draggedItem === link.id;
            const isValidDropTarget = (brandMode ? ["A2", "A3", "B3"] : ["A2", "B3"]).includes(link.position);
            
            return (
              <div 
                key={link.id} 
                ref={dragNodeRef}
                className={`space-y-3 p-4 border border-border rounded-lg bg-surface transition-all duration-200 ${
                  isDragging ? 'opacity-50 scale-95 rotate-2' : 'opacity-100 scale-100'
                } ${isValidDropTarget && dragOverPosition === link.position ? 'ring-2 ring-primary/50 bg-primary/5' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, link.id)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, link.position)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, link.position)}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs transition-colors duration-200 ${
                      dragOverPosition === link.position ? 'border-primary text-primary' : ''
                    }`}
                  >
                    Position: {link.position}
                  </Badge>
                  <div className="flex gap-1">
                    {(brandMode ? ["A2", "A3", "B3"] : ["A2", "B3"]).map((pos) => (
                      <Button
                        key={pos}
                        variant={link.position === pos ? "default" : "outline"}
                        size="sm"
                        onClick={() => changePosition(link.id, pos as "A2" | "A3" | "B3")}
                        className={`h-6 px-2 text-xs transition-all duration-200 ${
                          dragOverPosition === pos ? 'ring-2 ring-primary/30' : ''
                        }`}
                      >
                        {pos}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <GripVertical 
                    className={`h-4 w-4 text-muted-foreground cursor-move transition-all duration-200 hover:text-primary hover:scale-110 ${
                      isDragging ? 'text-primary scale-110' : ''
                    }`} 
                  />
                  <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Input
                      value={link.title}
                      onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                      placeholder="Link title"
                      className="font-medium"
                    />
                    <Input
                      value={link.url}
                      onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                      placeholder="https://..."
                      type="url"
                    />
                    <Input
                      value={link.thumbnail || ""}
                      onChange={(e) => updateLink(link.id, 'thumbnail', e.target.value)}
                      placeholder="Thumbnail image URL (optional)"
                      type="url"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLink(link.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}

          <Button 
            onClick={addLink}
            variant="outline" 
            className="w-full border-dashed border-2 h-12"
            disabled={!canAddLink}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Featured Link {!brandMode && `(${links.length}/2)`}
          </Button>
          {!canAddLink && (
            <p className="text-xs text-muted-foreground text-center">
              {brandMode ? "Maximum 3 links reached" : "Basic plan allows 2 links max. Upgrade for more positions."}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Brand Mode - Special Links */}
      {brandMode && (
        <Card className="border-accent">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-accent">
              <Crown className="h-5 w-5" />
              <span>Brand Links</span>
              <Badge variant="secondary">Pro</Badge>
            </CardTitle>
            <CardDescription>
              Special link types available for brands
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button variant="outline" className="h-16 flex-col border-dashed">
                <ShoppingBag className="h-5 w-5 mb-1" />
                <span className="text-sm">Shop Link</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col border-dashed">
                <Plus className="h-5 w-5 mb-1" />
                <span className="text-sm">CTA Button</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}


      {/* Save Button */}
      <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
        Save Link Changes
      </Button>
    </div>
  );
}