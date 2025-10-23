import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { User, Newspaper, Crown, Check, LogOut } from "lucide-react";
import mazeIsotype from "@/assets/maze-isotype.png";
import { useAuth } from "@/contexts/AuthContext";
import { ROUTES } from "@/constants";

const DashboardSelector = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const plans = [
    {
      type: "user",
      title: "User Dashboard",
      icon: User,
      gradient: "from-blue-500/10 to-indigo-500/10",
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500",
      options: [
        {
          name: "Free",
          description: "1 Maze • Fixed branding • Basic analytics",
          features: ["1 User Maze", "2 Featured Links", "Fixed 'Made with Maze'", "Basic Analytics"],
          path: "/user",
          isPremium: false
        },
        {
          name: "Premium",
          description: "10 Mazes • Custom branding • Advanced features",
          features: ["10 User Mazes", "3 Featured Links", "Remove 'Made with Maze'", "Custom Typography & Layout", "Export Analytics"],
          path: "/user",
          isPremium: true
        }
      ]
    },
    {
      type: "media",
      title: "Media Dashboard",
      icon: Newspaper,
      gradient: "from-purple-500/10 to-pink-500/10",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
      options: [
        {
          name: "Free",
          description: "1 Maze • Fixed branding • Basic analytics",
          features: ["1 Editorial Maze", "Fixed 'Made with Maze'", "Basic Analytics", "No Monetization"],
          path: "/media",
          isPremium: false
        },
        {
          name: "Premium",
          description: "10 Mazes • Monetization • Advanced analytics",
          features: ["10 Editorial Mazes", "Remove 'Made with Maze'", "Affiliate Links", "Advanced Analytics", "Export Data"],
          path: "/media",
          isPremium: true
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="bg-surface-container border-b border-border">
        <div className="px-6 py-4 max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={mazeIsotype} alt="Maze isotype" className="h-10 w-10" />
            <img src="/src/assets/maze-logo.svg" alt="maze" className="h-8" />
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-on-surface-variant">{user.email}</span>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.AUTH)}>
              Sign In
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-3 animate-fade-in">
            <h1 className="text-display-medium text-on-surface">
              Select Your Dashboard
            </h1>
            <p className="text-body-large text-on-surface-variant">
              Choose between User or Media dashboard, and select your plan
            </p>
          </div>

          {/* Dashboard Sections */}
          <div className="space-y-12">
            {plans.map((dashboard) => {
              const IconComponent = dashboard.icon;
              return (
                <div key={dashboard.type} className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className={`h-10 w-10 rounded-xl ${dashboard.iconBg} flex items-center justify-center`}>
                      <IconComponent className="h-5 w-5 text-white" strokeWidth={2} />
                    </div>
                    <h2 className="text-headline-large text-on-surface">{dashboard.title}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dashboard.options.map((option) => (
                      <Card
                        key={option.name}
                        className={`cursor-pointer hover:shadow-elevation-3 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br ${dashboard.gradient} border-2 ${option.isPremium ? 'border-primary' : 'border-transparent'} overflow-hidden group relative`}
                        onClick={() => navigate(option.path, { state: { isPremium: option.isPremium } })}
                      >
                        {option.isPremium && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-gradient-primary text-white border-0">
                              <Crown className="h-3 w-3 mr-1" />
                              Premium
                            </Badge>
                          </div>
                        )}
                        <CardHeader className="pb-4">
                          <CardTitle className="text-headline-medium text-on-surface">
                            {option.name}
                          </CardTitle>
                          <CardDescription className="text-body-medium text-on-surface-variant">
                            {option.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            {option.features.map((feature, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-body-small text-on-surface-variant">{feature}</span>
                              </div>
                            ))}
                          </div>
                          <div className="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
                            <div className="h-full w-0 group-hover:w-full bg-gradient-primary transition-all duration-500" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSelector;
