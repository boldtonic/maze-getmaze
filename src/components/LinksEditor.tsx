import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
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
}

interface LinksEditorProps {
  brandMode: boolean;
  links: Link[];
  onLinksChange: (links: Link[]) => void;
}

export function LinksEditor({ brandMode, links, onLinksChange }: LinksEditorProps) {
  const maxLinks = brandMode ? 3 : 2;
  const canAddLink = links.length < maxLinks;

  const addLink = () => {
    if (!canAddLink) return;
    
    const newLink: Link = {
      id: Date.now().toString(),
      title: "New Link",
      url: "",
      icon: "link",
      type: "featured"
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
          <CardTitle className="flex items-center space-x-2 text-headline-medium">
            <ExternalLink className="h-5 w-5" />
            <span>Featured Links</span>
          </CardTitle>
          <CardDescription className="text-body-medium">
            Add your most important links that will appear prominently
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {links.map((link, index) => {
            const IconComponent = getIconComponent(link.icon);
            
            return (
              <div 
                key={link.id} 
                className="space-y-3 p-4 border border-border rounded-lg bg-surface"
              >
                <div className="flex items-center space-x-3">
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
            variant="primary" 
            size="sm"
            className="w-full h-10 text-label-large"
            disabled={!canAddLink}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Featured Link {!brandMode && `(${links.length}/2)`}
          </Button>
          {!canAddLink && (
            <p className="text-body-small text-muted-foreground text-center">
              {brandMode ? "Maximum 3 links reached" : "Basic plan allows 2 links max. Upgrade for more positions."}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Brand Mode - Special Links */}
      {brandMode && (
        <Card className="border-accent">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-accent text-headline-medium">
              <Crown className="h-5 w-5" />
              <span>Brand Links</span>
              <Badge variant="secondary" className="text-label-medium">Pro</Badge>
            </CardTitle>
            <CardDescription className="text-body-medium">
              Special link types available for brands
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button variant="outline" className="h-16 flex-col border-dashed hover:bg-surface-variant text-label-large">
                <ShoppingBag className="h-5 w-5 mb-1" />
                <span>Shop Link</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col border-dashed hover:bg-surface-variant text-label-large">
                <Plus className="h-5 w-5 mb-1" />
                <span>CTA Button</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}


      {/* Save Button */}
      <Button variant="primary" size="sm" className="w-full text-label-large">
        Save Link Changes
      </Button>
    </div>
  );
}