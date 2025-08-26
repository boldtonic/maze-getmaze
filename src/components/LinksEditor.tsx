import { useState } from "react";
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
}

interface LinksEditorProps {
  brandMode: boolean;
}

export function LinksEditor({ brandMode }: LinksEditorProps) {
  const [links, setLinks] = useState<Link[]>([
    {
      id: "1",
      title: "Latest Portfolio",
      url: "https://janedoe.com/portfolio",
      icon: "portfolio",
      type: "featured"
    },
    {
      id: "2",
      title: "Watch My Process",
      url: "https://youtube.com/@janedoe",
      icon: "youtube",
      type: "featured"
    }
  ]);


  const addLink = () => {
    const newLink: Link = {
      id: Date.now().toString(),
      title: "New Link",
      url: "",
      icon: "link",
      type: "featured"
    };
    setLinks([...links, newLink]);
  };

  const updateLink = (id: string, field: string, value: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
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
            return (
              <div key={link.id} className="space-y-3 p-4 border border-border rounded-lg bg-surface">
                <div className="flex items-center space-x-3">
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
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
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Featured Link
          </Button>
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