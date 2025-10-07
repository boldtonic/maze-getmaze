import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { User, Newspaper, ArrowRight } from "lucide-react";
import mazeIsotype from "@/assets/maze-isotype.png";

const DashboardSelector = () => {
  const navigate = useNavigate();

  const dashboards = [
    {
      title: "User Dashboard",
      description: "Manage your personal Maze profile, links, and appearance",
      icon: User,
      path: "/user",
      gradient: "from-blue-500/10 to-indigo-500/10",
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500"
    },
    {
      title: "Media Dashboard",
      description: "Create Editorial Mazes, track engagement, and manage monetization",
      icon: Newspaper,
      path: "/media",
      gradient: "from-purple-500/10 to-pink-500/10",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="bg-surface-container border-b border-border">
        <div className="px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <img src={mazeIsotype} alt="Maze isotype" className="h-10 w-10" />
            <img src="/src/assets/maze-logo.svg" alt="maze" className="h-8" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-5xl w-full space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-3 animate-fade-in">
            <h1 className="text-display-medium text-on-surface">
              Select a dashboard to explore
            </h1>
            <p className="text-body-large text-on-surface-variant">
              Switch between user and media modes to preview both MVPs
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-scale-in">
            {dashboards.map((dashboard) => {
              const IconComponent = dashboard.icon;
              return (
                <Card
                  key={dashboard.path}
                  className={`cursor-pointer hover:shadow-elevation-3 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br ${dashboard.gradient} border-0 overflow-hidden group`}
                  onClick={() => navigate(dashboard.path)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`h-14 w-14 rounded-2xl ${dashboard.iconBg} flex items-center justify-center shadow-elevation-2 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-7 w-7 text-white" strokeWidth={2} />
                      </div>
                      <ArrowRight className="h-6 w-6 text-on-surface-variant opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    <CardTitle className="text-headline-medium text-on-surface pt-4">
                      {dashboard.title}
                    </CardTitle>
                    <CardDescription className="text-body-medium text-on-surface-variant">
                      {dashboard.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <div className="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
                      <div className="h-full w-0 group-hover:w-full bg-gradient-primary transition-all duration-500" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSelector;
