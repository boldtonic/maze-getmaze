import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Eye, 
  MousePointer, 
  TrendingUp,
  Crown,
  Lock,
  DollarSign
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MediaAnalyticsProps {
  onUpgradeClick: (feature: string) => void;
  isPremium?: boolean;
}

export function MediaAnalytics({ onUpgradeClick, isPremium = false }: MediaAnalyticsProps) {
  const stats = [
    {
      label: "Total Impressions",
      value: "45,892",
      change: "+18.2%",
      trend: "up",
      icon: Eye,
      description: "Times your Mazes were displayed"
    },
    {
      label: "Total Hovers",
      value: "12,456",
      change: "+12.5%",
      trend: "up",
      icon: MousePointer,
      description: "Users who hovered over Mazes"
    },
    {
      label: "Total Clicks",
      value: "3,847",
      change: "+22.8%",
      trend: "up",
      icon: BarChart3,
      description: "Clicks on your Maze links"
    },
    {
      label: "Overall CTR",
      value: "30.9%",
      change: "+4.3%",
      trend: "up",
      icon: TrendingUp,
      description: "Click-through rate"
    }
  ];

  const topMazes = [
    { theme: "AI Safety", impressions: "15,234", hovers: "4,892", clicks: "1,456", ctr: "29.8%" },
    { theme: "Climate Tech", impressions: "12,847", hovers: "3,678", clicks: "1,234", ctr: "33.5%" },
    { theme: "Web3 Ethics", impressions: "10,293", hovers: "2,456", clicks: "892", ctr: "36.3%" },
    { theme: "Quantum Computing", impressions: "7,518", hovers: "1,430", clicks: "265", ctr: "18.5%" },
  ];

  return (
    <>
      {/* Left Column - Data & Stats */}
      <Card className="shadow-elevation-2 bg-surface-container border-0 rounded-3xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-3 text-headline-large text-on-surface">
            <div className="p-2 bg-[#eef2e3] rounded-full">
              <BarChart3 className="h-5 w-5 text-[#004096]" />
            </div>
            <span>Engagement Data</span>
          </CardTitle>
          <CardDescription className="text-body-medium text-on-surface-variant">
            Track impressions, interactions, and conversions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <Card key={stat.label} className="hover:shadow-elevation-2 transition-shadow bg-surface-container-high border-0">
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
                         <IconComponent className="h-6 w-6 text-white" strokeWidth={2} />
                       </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Time Period Selector */}
          <div className="space-y-2">
            <span className="text-body-medium text-on-surface-variant">Date Range:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "7 days", premium: false },
                { label: "30 days", premium: true },
                { label: "90 days", premium: true },
                { label: "1 year", premium: true },
              ].map(({ label, premium }) => (
                <div key={label} className="relative">
                  <Badge 
                    variant={label === "7 days" ? "default" : "outline"}
                    className={`cursor-pointer hover:bg-primary/10 transition-colors ${
                      premium && !isPremium ? 'opacity-50' : ''
                    }`}
                    onClick={() => premium && !isPremium ? onUpgradeClick('Extended Analytics') : undefined}
                  >
                    {label}
                    {premium && !isPremium && (
                      <Crown className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Mazes */}
          <div className="space-y-4">
            <h3 className="text-title-large text-on-surface">Top Performing Mazes</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Theme</TableHead>
                  <TableHead className="text-right">Impressions</TableHead>
                  <TableHead className="text-right">Hovers</TableHead>
                  <TableHead className="text-right">Clicks</TableHead>
                  <TableHead className="text-right">CTR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topMazes.map((maze) => (
                  <TableRow key={maze.theme}>
                    <TableCell className="font-medium">{maze.theme}</TableCell>
                    <TableCell className="text-right">{maze.impressions}</TableCell>
                    <TableCell className="text-right">{maze.hovers}</TableCell>
                    <TableCell className="text-right">{maze.clicks}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className="text-green-700 bg-green-100">
                        {maze.ctr}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Export Data */}
          {!isPremium ? (
            <Card className="bg-surface-container-high border-2 border-dashed border-primary/30">
              <CardContent className="pt-6">
                <div className="text-title-medium text-on-surface mb-2">Extended Analytics & Data Export</div>
                <div className="text-body-small text-on-surface-variant mb-4">
                  Upgrade to access advanced analytics, custom date ranges, and CSV export.
                </div>
                <Button variant="primary" onClick={() => onUpgradeClick('Extended Analytics')} className="w-full">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="w-full">
                Export CSV
              </Button>
              <Button variant="outline" className="w-full">
                Export PDF Report
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Right Column - Visual Charts */}
      <Card className="shadow-elevation-2 bg-surface-container border-0 rounded-3xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-3 text-headline-large text-on-surface">
            <div className="p-2 bg-[#eef2e3] rounded-full">
              <BarChart3 className="h-5 w-5 text-[#004096]" />
            </div>
            <span>Visual Analytics</span>
          </CardTitle>
          <CardDescription className="text-body-medium text-on-surface-variant">
            Charts and graphs for deeper insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-64 flex items-center justify-center bg-surface-container-high rounded-xl">
            <div className="text-center text-on-surface-variant">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-body-medium">Engagement over time</p>
              <p className="text-body-small">Chart coming soon</p>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-surface-container-high rounded-xl">
            <div className="text-center text-on-surface-variant">
              <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-body-medium">Click-through trends</p>
              <p className="text-body-small">Chart coming soon</p>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-surface-container-high rounded-xl">
            <div className="text-center text-on-surface-variant">
              <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-body-medium">Impression distribution</p>
              <p className="text-body-small">Chart coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
