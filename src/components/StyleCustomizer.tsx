import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Palette, 
  Type, 
  Layout,
  RotateCcw,
  Crown,
  Lock
} from "lucide-react";

interface StyleCustomizerProps {
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
  isPremium?: boolean;
}

export function StyleCustomizer({ style, onStyleChange, onUpgradeClick, isPremium = false }: StyleCustomizerProps) {

  const colorPresets = [
    { name: "Purple", primary: "#6366f1", background: "#f1f0ff" },
    { name: "Blue", primary: "#3b82f6", background: "#eff6ff" },
    { name: "Green", primary: "#10b981", background: "#ecfdf5" },
    { name: "Pink", primary: "#ec4899", background: "#fdf2f8" },
    { name: "Orange", primary: "#f59e0b", background: "#fff7ed" },
    { name: "Dark", primary: "#6366f1", background: "#1f2937" },
  ];

  const fontOptions = [
    { name: "Inter", value: "Inter" },
    { name: "Roboto", value: "Roboto" },
    { name: "Poppins", value: "Poppins" },
    { name: "Playfair Display", value: "Playfair Display" },
  ];

  const updateStyle = (field: string, value: any) => {
    console.log('Updating style:', field, value); // Debug log
    onStyleChange({ ...style, [field]: value });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="colors" className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Colors</span>
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center space-x-2">
            <Type className="h-4 w-4" />
            <span className="hidden sm:inline">Typography</span>
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center space-x-2">
            <Layout className="h-4 w-4" />
            <span className="hidden sm:inline">Layout</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="colors" className="space-y-6">
            <div className="space-y-3">
              <Label>Color Presets</Label>
              <div className="grid grid-cols-3 gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      onStyleChange({ 
                        ...style, 
                        accentColor: preset.primary,
                        backgroundColor: preset.background 
                      });
                    }}
                    className="h-12 rounded-lg border-2 border-border hover:border-primary transition-colors overflow-hidden p-3 flex items-center justify-between"
                    style={{ backgroundColor: preset.background }}
                  >
                     <span 
                       className="text-xs font-medium"
                       style={{ 
                         color: preset.background === "#1f2937" ? "#ffffff" : "#1a1a1a"
                       }}
                     >
                      {preset.name}
                    </span>
                    <div 
                      className="w-4 h-4 rounded-full border border-white/50"
                      style={{ backgroundColor: preset.primary }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 relative">
              <div className="flex items-center justify-between">
                <Label>Custom Accent Color</Label>
                {!isPremium && (
                  <Badge variant="secondary" className="flex items-center space-x-1 bg-[#eef2e3] text-[#004096]">
                    <Crown className="h-3 w-3" />
                    <span>Premium</span>
                  </Badge>
                )}
              </div>
              <div 
                className={`${!isPremium ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => !isPremium && onUpgradeClick('Custom Accent Colors')}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={style.accentColor}
                    onChange={(e) => {
                      const newColor = e.target.value;
                      // Generate complementary background color
                      const hex = newColor.replace('#', '');
                      const r = parseInt(hex.substr(0, 2), 16);
                      const g = parseInt(hex.substr(2, 2), 16);
                      const b = parseInt(hex.substr(4, 2), 16);
                      
                      // Create a light tint of the accent color for background
                      const bgColor = `rgb(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)})`;
                      
                      onStyleChange({ 
                        ...style, 
                        accentColor: newColor,
                        backgroundColor: bgColor
                      });
                    }}
                    className="h-10 w-20 rounded border border-border cursor-pointer"
                    disabled={!isPremium}
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={style.accentColor}
                      onChange={(e) => {
                        const newColor = e.target.value;
                        if (newColor.match(/^#[0-9A-F]{6}$/i)) {
                          // Generate complementary background color
                          const hex = newColor.replace('#', '');
                          const r = parseInt(hex.substr(0, 2), 16);
                          const g = parseInt(hex.substr(2, 2), 16);
                          const b = parseInt(hex.substr(4, 2), 16);
                          
                          // Create a light tint of the accent color for background
                          const bgColor = `rgb(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)})`;
                          
                          onStyleChange({ 
                            ...style, 
                            accentColor: newColor,
                            backgroundColor: bgColor
                          });
                        } else {
                          onStyleChange({ ...style, accentColor: newColor });
                        }
                      }}
                      className="w-full px-3 py-2 border border-border rounded-md"
                      placeholder="#6366f1"
                      disabled={!isPremium}
                    />
                  </div>
                </div>
                <div className="text-xs text-on-surface-variant mt-2">
                  Custom colors override preset selections
                </div>
              </div>
              {!isPremium && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => onUpgradeClick('Custom Accent Colors')}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Upgrade to Unlock
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Font Family</Label>
                {!isPremium && (
                  <Badge variant="secondary" className="flex items-center space-x-1 bg-[#eef2e3] text-[#004096]">
                    <Crown className="h-3 w-3" />
                    <span>Premium</span>
                  </Badge>
                )}
              </div>
              <div className={`grid grid-cols-2 gap-3 ${!isPremium ? 'opacity-50' : ''}`}>
                {fontOptions.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => isPremium ? updateStyle('fontFamily', font.value) : onUpgradeClick('Advanced Typography')}
                    className={`p-4 text-left border-2 rounded-lg transition-colors ${
                      style.fontFamily === font.value 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{ fontFamily: font.value }}
                    disabled={!isPremium}
                  >
                    <div className="font-semibold">{font.name}</div>
                    <div className="text-sm text-muted-foreground">The quick brown fox</div>
                  </button>
                ))}
              </div>
              {!isPremium && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => onUpgradeClick('Advanced Typography')}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Upgrade to Unlock
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Orientation</Label>
                {!isPremium && (
                  <Badge variant="secondary" className="flex items-center space-x-1 bg-[#eef2e3] text-[#004096]">
                    <Crown className="h-3 w-3" />
                    <span>Premium</span>
                  </Badge>
                )}
              </div>
              <div className={`flex gap-3 ${!isPremium ? 'opacity-50' : ''}`}>
                <button
                  onClick={() => isPremium ? updateStyle('orientation', 'horizontal') : onUpgradeClick('Custom Layouts')}
                  className={`flex-1 p-4 text-left border-2 rounded-lg transition-colors ${
                    style.orientation === 'horizontal' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  disabled={!isPremium}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-2 bg-current opacity-60 rounded-sm"></div>
                    <span className="font-semibold">Horizontal</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Wide layout</div>
                </button>
                <button
                  onClick={() => isPremium ? updateStyle('orientation', 'vertical') : onUpgradeClick('Custom Layouts')}
                  className={`flex-1 p-4 text-left border-2 rounded-lg transition-colors ${
                    style.orientation === 'vertical' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  disabled={!isPremium}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-4 bg-current opacity-60 rounded-sm"></div>
                    <span className="font-semibold">Vertical</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Tall layout</div>
                </button>
              </div>
              {!isPremium && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => onUpgradeClick('Custom Layouts')}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Upgrade to Unlock
                </Button>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Border Radius</Label>
                <span className="text-sm text-muted-foreground">{style.borderRadius}px</span>
              </div>
              <Slider
                value={[style.borderRadius]}
                onValueChange={(value) => updateStyle('borderRadius', value[0])}
                max={24}
                min={0}
                step={2}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Sharp</span>
                <span>Rounded</span>
              </div>
            </div>
          </TabsContent>

        </div>
      </Tabs>

      <Button
        variant="primary"
        size="sm"
        className="w-full flex items-center justify-center space-x-2 text-label-large"
      >
        <span>Save Design Changes</span>
      </Button>
    </div>
  );
}