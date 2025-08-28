import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Palette, 
  Type, 
  Layout
} from "lucide-react";

export function StyleCustomizer() {
  const [style, setStyle] = useState({
    backgroundColor: "#ffffff",
    accentColor: "#6366f1",
    fontFamily: "Inter",
    borderRadius: 12,
    theme: "light"
  });

  const colorPresets = [
    { name: "Purple", primary: "#6366f1", secondary: "#f3f4f6" },
    { name: "Blue", primary: "#3b82f6", secondary: "#dbeafe" },
    { name: "Green", primary: "#10b981", secondary: "#d1fae5" },
    { name: "Pink", primary: "#ec4899", secondary: "#fce7f3" },
    { name: "Orange", primary: "#f59e0b", secondary: "#fef3c7" },
    { name: "Teal", primary: "#14b8a6", secondary: "#ccfbf1" },
  ];

  const fontOptions = [
    { name: "Inter", value: "Inter" },
    { name: "Roboto", value: "Roboto" },
    { name: "Poppins", value: "Poppins" },
    { name: "Playfair Display", value: "Playfair Display" },
  ];

  const updateStyle = (field: string, value: any) => {
    setStyle(prev => ({ ...prev, [field]: value }));
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
                    onClick={() => updateStyle('accentColor', preset.primary)}
                    className="group relative h-16 rounded-lg border-2 border-border hover:border-primary transition-colors overflow-hidden"
                  >
                    <div 
                      className="h-full w-full"
                      style={{ 
                        background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})` 
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <span className="absolute bottom-1 left-2 text-xs font-medium text-white drop-shadow">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Custom Accent Color</Label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={style.accentColor}
                  onChange={(e) => updateStyle('accentColor', e.target.value)}
                  className="h-10 w-20 rounded border border-border cursor-pointer"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={style.accentColor}
                    onChange={(e) => updateStyle('accentColor', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md"
                    placeholder="#6366f1"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <div className="space-y-3">
              <Label>Font Family</Label>
              <div className="grid grid-cols-2 gap-3">
                {fontOptions.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => updateStyle('fontFamily', font.value)}
                    className={`p-4 text-left border-2 rounded-lg transition-colors ${
                      style.fontFamily === font.value 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{ fontFamily: font.value }}
                  >
                    <div className="font-semibold">{font.name}</div>
                    <div className="text-sm text-muted-foreground">The quick brown fox</div>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-6">
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

      <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
        Save Style Changes
      </Button>
    </div>
  );
}