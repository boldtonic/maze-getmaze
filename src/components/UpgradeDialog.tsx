import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Sparkles } from "lucide-react";

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature?: string;
}

export function UpgradeDialog({ open, onOpenChange, feature }: UpgradeDialogProps) {
  const plans = [
    {
      name: "Monthly",
      price: "$9",
      period: "/month",
      badge: null,
      features: [
        "3 Featured Links",
        "Custom Accent Colors",
        "Advanced Typography",
        "Custom Layouts",
        "Extended Analytics",
        "Export Analytics Data",
        "Preview Mode",
      ],
    },
    {
      name: "Yearly",
      price: "$89",
      period: "/year",
      badge: "Save 17%",
      popular: true,
      features: [
        "Everything in Monthly",
        "Priority Support",
        "Custom Domain",
        "Advanced Analytics",
        "API Access",
      ],
    },
    {
      name: "Lifetime",
      price: "$299",
      period: "one-time",
      badge: "Best Value",
      features: [
        "Everything in Yearly",
        "Lifetime Updates",
        "Premium Templates",
        "White Label Options",
        "Dedicated Support",
      ],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Crown className="h-6 w-6 text-primary" />
            <DialogTitle className="text-2xl">Upgrade to Premium</DialogTitle>
          </div>
          <DialogDescription className="text-center">
            {feature 
              ? `Unlock ${feature} and all premium features` 
              : "Unlock all premium features and take your Maze to the next level"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-2xl border-2 transition-all ${
                plan.popular
                  ? "border-primary shadow-lg scale-105"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {plan.badge && (
                <Badge
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                  variant={plan.popular ? "default" : "secondary"}
                >
                  {plan.badge}
                </Badge>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "primary" : "outline"}
                className="w-full"
                size="sm"
              >
                {plan.popular && <Sparkles className="h-4 w-4 mr-2" />}
                Choose {plan.name}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          All plans include a 14-day money-back guarantee
        </div>
      </DialogContent>
    </Dialog>
  );
}
