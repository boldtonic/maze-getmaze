import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transform-gpu",
  {
    variants: {
      variant: {
        // Material 3 Filled Button - Enhanced with gradient and better hover
        default: "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-elevation-1 hover:shadow-elevation-2 hover:scale-[1.02] active:scale-[0.98] active:shadow-elevation-0",
        // Material 3 Filled Tonal Button - Enhanced with subtle gradient
        secondary: "bg-gradient-to-r from-filled-tonal-button to-filled-tonal-button/95 text-filled-tonal-button-foreground shadow-elevation-1 hover:shadow-elevation-2 hover:scale-[1.02] active:scale-[0.98]",
        // Material 3 Elevated Button - Enhanced with better elevation
        elevated: "bg-gradient-to-b from-surface to-surface-variant text-elevated-button-foreground shadow-elevation-2 hover:shadow-elevation-3 hover:scale-[1.02] active:scale-[0.98] border border-border/20",
        // Material 3 Outlined Button - Enhanced with better hover states
        outline: "border-2 border-primary/20 bg-gradient-to-b from-surface/50 to-surface-variant/30 text-primary hover:border-primary/40 hover:bg-primary/8 hover:scale-[1.02] active:scale-[0.98] active:bg-primary/12 backdrop-blur-sm",
        // Material 3 Text Button - Enhanced with better hover
        ghost: "bg-transparent text-primary hover:bg-primary/10 hover:scale-[1.02] active:scale-[0.98] active:bg-primary/15",
        // Destructive - Enhanced
        destructive: "bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground shadow-elevation-1 hover:shadow-elevation-2 hover:scale-[1.02] active:scale-[0.98]",
        // Link - Enhanced
        link: "text-primary underline-offset-4 hover:underline bg-transparent hover:scale-[1.02] active:scale-[0.98]",
        // New premium variant
        premium: "bg-gradient-to-r from-accent via-primary to-accent/80 text-white shadow-elevation-2 hover:shadow-elevation-3 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        // Save/Export buttons variant - transparent with dark text, orange border, orange fill on hover
        save: "bg-transparent text-[#1a1a1a] border-2 border-[#ff6e3a] hover:bg-[#ff6e3a] hover:text-[#1a1a1a] hover:border-[#ff6e3a] hover:shadow-sm transition-all duration-200",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-full px-4 text-xs",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
