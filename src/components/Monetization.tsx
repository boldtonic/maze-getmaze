import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Crown, Lock, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MonetizationProps {
  onUpgradeClick: (feature: string) => void;
  isPremium?: boolean;
}

export function Monetization({ onUpgradeClick, isPremium = false }: MonetizationProps) {
  const stats = [
    {
      label: "Total Affiliate Clicks",
      value: isPremium ? "2,456" : "0",
      change: "+15.3%",
      icon: ExternalLink,
      description: "Clicks on affiliate links"
    },
    {
      label: "Estimated Earnings",
      value: isPremium ? "$1,234" : "$0",
      change: "+18.2%",
      icon: DollarSign,
      description: "This month"
    },
    {
      label: "Conversion Rate",
      value: isPremium ? "8.2%" : "0%",
      change: "+2.1%",
      icon: TrendingUp,
      description: "Affiliate conversion rate"
    },
  ];

  const affiliateMazes = [
    { theme: "AI Safety", clicks: "892", conversions: "73", earnings: "$456" },
    { theme: "Climate Tech", clicks: "734", conversions: "59", earnings: "$378" },
    { theme: "Web3 Ethics", clicks: "523", conversions: "41", earnings: "$267" },
    { theme: "Quantum Computing", clicks: "307", conversions: "22", earnings: "$133" },
  ];

  const exampleDeals = [
    { 
      partner: "Tech Publisher Co.", 
      category: "Technology", 
      commission: "12-15%",
      description: "Premium tech products and services"
    },
    { 
      partner: "Sustainable Brands", 
      category: "Sustainability", 
      commission: "10-20%",
      description: "Eco-friendly products and solutions"
    },
    { 
      partner: "Digital Learning Hub", 
      category: "Education", 
      commission: "25-30%",
      description: "Online courses and workshops"
    },
    { 
      partner: "FinTech Solutions", 
      category: "Finance", 
      commission: "15-18%",
      description: "Financial tools and services"
    },
    { 
      partner: "Health & Wellness Co.", 
      category: "Health", 
      commission: "20-25%",
      description: "Health products and supplements"
    },
  ];

  return (
    <>
      {/* Left Column - Information & Data */}
      <Card className="shadow-elevation-2 bg-surface-container border-0 rounded-3xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-3 text-headline-large text-on-surface">
            <div className="p-2 bg-[#eef2e3] rounded-full">
              <DollarSign className="h-5 w-5 text-[#004096]" />
            </div>
            <span>Monetization</span>
          </CardTitle>
          <CardDescription className="text-body-medium text-on-surface-variant">
            Earn revenue through affiliate links in your Editorial Mazes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Introduction */}
          <div className="space-y-3 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl">
            <p className="text-body-large text-on-surface">
              <strong>Monetize your Editorial Mazes</strong> through affiliate links and contextual interactions — a better alternative to intrusive ads.
            </p>
            <p className="text-body-medium text-on-surface-variant">
              Integrate affiliate links seamlessly into your Mazes and earn revenue when readers engage with recommended products or services.
            </p>
            {!isPremium && (
              <Button 
                variant="primary" 
                size="sm" 
                className="w-full"
                onClick={() => onUpgradeClick('Affiliate Links')}
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Enable Monetization
              </Button>
            )}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 gap-4">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <Card key={stat.label} className={`hover:shadow-elevation-2 transition-shadow bg-surface-container-high border-0 ${!isPremium ? 'opacity-60' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between space-x-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.label}
                        </p>
                        <div className="flex items-center space-x-2">
                          <p className="text-2xl font-bold">{stat.value}</p>
                          {isPremium && (
                            <Badge 
                              variant="secondary" 
                              className="text-green-700 bg-green-100"
                            >
                              {stat.change}
                            </Badge>
                          )}
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

          {/* Mazes with Affiliate Links */}
          {isPremium && (
            <div className="space-y-4">
              <h3 className="text-title-large text-on-surface">Mazes with Active Affiliate Links</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Theme</TableHead>
                    <TableHead className="text-right">Clicks</TableHead>
                    <TableHead className="text-right">Conversions</TableHead>
                    <TableHead className="text-right">Earnings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {affiliateMazes.map((maze) => (
                    <TableRow key={maze.theme}>
                      <TableCell className="font-medium">{maze.theme}</TableCell>
                      <TableCell className="text-right">{maze.clicks}</TableCell>
                      <TableCell className="text-right">{maze.conversions}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary" className="text-green-700 bg-green-100">
                          {maze.earnings}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Right Column - Affiliate Catalog */}
      <Card className="shadow-elevation-2 bg-surface-container border-0 rounded-3xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-3 text-headline-large text-on-surface">
            <div className="p-2 bg-[#eef2e3] rounded-full">
              <ExternalLink className="h-5 w-5 text-[#004096]" />
            </div>
            <span>Affiliate Catalog</span>
          </CardTitle>
          <CardDescription className="text-body-medium text-on-surface-variant">
            Browse and add affiliate partnerships to your Mazes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {exampleDeals.map((deal, index) => (
              <div 
                key={index}
                className={`flex items-start justify-between p-4 rounded-lg border border-border ${isPremium ? 'hover:bg-surface-variant/50 transition-colors' : 'opacity-60'}`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{deal.partner}</span>
                    <Badge variant="outline" className="text-xs">{deal.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{deal.description}</p>
                  <p className="text-xs text-muted-foreground">Commission: <span className="font-medium text-green-700">{deal.commission}</span></p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  disabled={!isPremium}
                  className="flex items-center space-x-1 ml-2"
                >
                  {!isPremium && <Lock className="h-3 w-3 mr-1" />}
                  <span>Apply</span>
                </Button>
              </div>
            ))}
          </div>
          {!isPremium && (
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4"
              onClick={() => onUpgradeClick('Affiliate Catalog')}
            >
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Access Affiliate Catalog
            </Button>
          )}
          {isPremium && (
            <div className="mt-4 p-3 bg-surface-container-high rounded-lg">
              <Badge variant="secondary" className="flex items-center space-x-1 w-fit">
                <span>Coming Soon</span>
              </Badge>
              <p className="text-body-small text-on-surface-variant mt-2">
                More affiliate partnerships being added regularly
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
