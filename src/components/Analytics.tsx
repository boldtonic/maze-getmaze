import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Eye, 
  MousePointer, 
  Users, 
  TrendingUp,
  Calendar,
  ExternalLink
} from "lucide-react";

export function Analytics() {
  const stats = [
    {
      label: "Total Mentions",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      description: "Times you've been mentioned"
    },
    {
      label: "SLUG Hovers",
      value: "1,293",
      change: "+8.2%",
      trend: "up",
      icon: Eye,
      description: "People who hovered to see your SLUG"
    },
    {
      label: "Link Clicks",
      value: "456",
      change: "+15.3%",
      trend: "up",
      icon: MousePointer,
      description: "Clicks on your featured links"
    },
    {
      label: "Conversion Rate",
      value: "35.2%",
      change: "+3.1%",
      trend: "up",
      icon: TrendingUp,
      description: "Hovers that resulted in clicks"
    }
  ];

  const recentMentions = [
    {
      platform: "Twitter",
      user: "@designweekly",
      text: "Great work by @janedoe on the latest brand identity project...",
      time: "2 hours ago",
      engagement: "High"
    },
    {
      platform: "LinkedIn",
      user: "Sarah Chen",
      text: "Inspired by Jane Doe's approach to creative direction...",
      time: "5 hours ago",
      engagement: "Medium"
    },
    {
      platform: "Instagram",
      user: "@creativestudio",
      text: "Collaboration with @janedoe turned out amazing!",
      time: "1 day ago",
      engagement: "High"
    },
    {
      platform: "Blog",
      user: "Design Trends",
      text: "Interview with Jane Doe about the future of design...",
      time: "2 days ago",
      engagement: "Very High"
    }
  ];

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case "Very High": return "bg-green-500";
      case "High": return "bg-blue-500";
      case "Medium": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getEngagementTextColor = (engagement: string) => {
    switch (engagement) {
      case "Very High": return "text-green-700 bg-green-100";
      case "High": return "text-blue-700 bg-blue-100";
      case "Medium": return "text-yellow-700 bg-yellow-100";
      default: return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.label} className="hover:shadow-elevation-2 transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between space-x-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <Badge 
                        variant="secondary" 
                        className="text-green-700 bg-green-100"
                      >
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Time Period Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Analytics Period</span>
          </CardTitle>
          <CardDescription>
            Choose the time period for your analytics data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            {["7 days", "30 days", "90 days", "1 year"].map((period) => (
              <Badge 
                key={period}
                variant={period === "30 days" ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-colors"
              >
                {period}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Mentions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Recent Mentions</span>
          </CardTitle>
          <CardDescription>
            Latest mentions of you across the web
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMentions.map((mention, index) => (
              <div 
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:bg-surface-variant/50 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{mention.platform}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{mention.user}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{mention.time}</span>
                  </div>
                  <p className="text-sm">{mention.text}</p>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={getEngagementTextColor(mention.engagement)}
                    >
                      {mention.engagement} Engagement
                    </Badge>
                    <button className="text-primary hover:text-primary/80 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Data */}
      <Card>
        <CardHeader>
          <CardTitle>Export Analytics</CardTitle>
          <CardDescription>
            Download your analytics data for further analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-border rounded-lg hover:bg-surface-variant transition-colors">
              Export CSV
            </button>
            <button className="px-4 py-2 border border-border rounded-lg hover:bg-surface-variant transition-colors">
              Export PDF Report
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}