import { useState, useEffect } from "react";
import { User, Settings, Bell, Shield, HelpCircle, CreditCard, BarChart3, LogOut, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface AccountSettingsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "account" | "settings";
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

type TabId = "general" | "notifications" | "privacy" | "support" | "profile" | "billing" | "usage";

export function AccountSettingsDrawer({ 
  open, 
  onOpenChange, 
  defaultTab = "settings",
  isDarkMode,
  onToggleDarkMode 
}: AccountSettingsDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabId>(defaultTab === "account" ? "profile" : "general");
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Update activeTab when defaultTab changes and drawer opens
  useEffect(() => {
    if (open) {
      setActiveTab(defaultTab === "account" ? "profile" : "general");
    }
  }, [open, defaultTab]);

  const handleSave = async () => {
    if (saveState !== 'idle') return;
    setSaveState('saving');
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 800));
    setSaveState('saved');
    setTimeout(() => setSaveState('idle'), 2000);
  };

  const navigationItems: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "general", label: "General", icon: <Settings className="h-4 w-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
    { id: "privacy", label: "Privacy & Data", icon: <Shield className="h-4 w-4" /> },
    { id: "support", label: "Support", icon: <HelpCircle className="h-4 w-4" /> },
    { id: "profile", label: "Account", icon: <User className="h-4 w-4" /> },
    { id: "billing", label: "Billing", icon: <CreditCard className="h-4 w-4" /> },
    { id: "usage", label: "Usage", icon: <BarChart3 className="h-4 w-4" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-on-surface mb-1">General</h2>
              <p className="text-sm text-on-surface-variant">Manage your app preferences</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Theme</Label>
                  <p className="text-sm text-on-surface-variant">Choose your preferred theme</p>
                </div>
                <Select defaultValue="system">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Language</Label>
                  <p className="text-sm text-on-surface-variant">Select your preferred language</p>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Beta Features</Label>
                  <p className="text-sm text-on-surface-variant">Try experimental features</p>
                </div>
                <Switch />
              </div>
            </div>

            <Button className="w-full sm:w-auto" onClick={handleSave}>
              {saveState === 'idle' && 'Save Changes'}
              {saveState === 'saving' && 'Saving...'}
              {saveState === 'saved' && (
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Saved!
                </span>
              )}
            </Button>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-on-surface mb-1">Notifications</h2>
              <p className="text-sm text-on-surface-variant">Manage how you receive notifications</p>
            </div>

            <div className="space-y-4">
              {[
                { label: "Mentions", description: "When someone mentions you" },
                { label: "Followers", description: "New followers" },
                { label: "Comments", description: "Comments on your content" },
                { label: "Product Tips", description: "Tips to get the most out of Maze" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <Label className="text-base">{item.label}</Label>
                      <p className="text-sm text-on-surface-variant">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 ml-4">
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <span className="text-sm">Email</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <span className="text-sm">In-app</span>
                    </div>
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>

            <Button className="w-full sm:w-auto" onClick={handleSave}>
              {saveState === 'idle' && 'Save Changes'}
              {saveState === 'saving' && 'Saving...'}
              {saveState === 'saved' && (
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Saved!
                </span>
              )}
            </Button>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-on-surface mb-1">Privacy & Data</h2>
              <p className="text-sm text-on-surface-variant">Control your data and privacy</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between group hover:bg-surface-container-highest/50 transition-colors rounded-lg p-3 -mx-3">
                <div className="space-y-0.5">
                  <Label className="text-base">Maze Activation</Label>
                  <p className="text-sm text-on-surface-variant">Select your maze visibility across the internet</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_0_12px_rgba(var(--primary-rgb),0.4)]" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Search Engine Indexing</Label>
                  <p className="text-sm text-on-surface-variant">Allow search engines to index your profile</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-base">Data Export</Label>
                <p className="text-sm text-on-surface-variant mb-2">Download your data</p>
                <Button variant="outline" size="sm">Export Data</Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-base text-destructive">Delete Account</Label>
                <p className="text-sm text-on-surface-variant mb-2">Permanently delete your account and data</p>
                <Button variant="destructive" size="sm">Delete Account</Button>
              </div>
            </div>
          </div>
        );

      case "support":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-on-surface mb-1">Support</h2>
              <p className="text-sm text-on-surface-variant">Get help and resources</p>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help Center
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="h-4 w-4 mr-2" />
                Report an Issue
              </Button>
              <Separator />
              <Button variant="ghost" className="w-full justify-start text-on-surface-variant" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Terms & Privacy Policy
                </a>
              </Button>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-on-surface mb-1">Profile</h2>
              <p className="text-sm text-on-surface-variant">Manage your account information</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-medium">
                  U
                </div>
                <Button variant="outline" size="sm">Change Photo</Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" defaultValue="Jane Doe" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="flex items-center">
                  <span className="text-sm text-on-surface-variant mr-2">maze.bio/</span>
                  <Input id="username" defaultValue="janedoe" className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" defaultValue="Sharing my journey in design and creativity." rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="jane@example.com" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-base">Linked Accounts</Label>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="justify-start">Connect Twitter</Button>
                  <Button variant="outline" size="sm" className="justify-start">Connect LinkedIn</Button>
                </div>
              </div>
            </div>

            <Button className="w-full sm:w-auto" onClick={handleSave}>
              {saveState === 'idle' && 'Save Changes'}
              {saveState === 'saving' && 'Saving...'}
              {saveState === 'saved' && (
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Saved!
                </span>
              )}
            </Button>
          </div>
        );

      case "billing":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-on-surface mb-1">Plan & Billing</h2>
              <p className="text-sm text-on-surface-variant">Manage your subscription</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 border rounded-2xl bg-surface-container-high">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-on-surface">Free Plan</h3>
                    <p className="text-sm text-on-surface-variant">Perfect for getting started</p>
                  </div>
                  <Button variant="primary" size="sm">Upgrade</Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Renewal Date</span>
                    <span className="text-on-surface">N/A</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-base">Payment Method</Label>
                <p className="text-sm text-on-surface-variant mb-2">No payment method on file</p>
                <Button variant="outline" size="sm">Add Payment Method</Button>
              </div>
            </div>
          </div>
        );

      case "usage":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-on-surface mb-1">Usage</h2>
              <p className="text-sm text-on-surface-variant">Track your activity</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 border rounded-2xl bg-surface-container-high">
                <h3 className="text-base font-semibold text-on-surface mb-4">This Month</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-on-surface-variant">Mentions</span>
                    <span className="text-lg font-semibold text-on-surface">0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-on-surface-variant">Maze Views</span>
                    <span className="text-lg font-semibold text-on-surface">0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-on-surface-variant">Link Clicks</span>
                    <span className="text-lg font-semibold text-on-surface">0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-on-surface-variant">Storage Used</span>
                    <span className="text-lg font-semibold text-on-surface">0 MB / 100 MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-3xl p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left Navigation */}
          <div className="w-48 bg-surface-container border-r border-border p-4 flex flex-col">
            <div className="flex-1 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <Separator className="my-3" />

            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start text-on-surface-variant hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </div>

          {/* Right Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
