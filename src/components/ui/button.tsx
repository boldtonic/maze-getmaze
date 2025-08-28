import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Material 3 Filled Button - Blue with White Text
        default: "bg-primary text-white hover:shadow-elevation-2 hover:bg-primary/90 active:shadow-elevation-1 transform hover:scale-[1.02] active:scale-[0.98]",
        // Material 3 Filled Tonal Button  
        secondary: "bg-filled-tonal-button text-filled-tonal-button-foreground hover:shadow-elevation-1 hover:bg-filled-tonal-button/90 active:shadow-elevation-0",
        // Material 3 Elevated Button
        elevated: "bg-surface text-primary shadow-elevation-1 hover:shadow-elevation-3 hover:bg-surface/90 active:shadow-elevation-2 transform hover:scale-[1.02]",
        // Material 3 Outlined Button
        outline: "border border-border bg-transparent text-primary hover:bg-primary/8 hover:shadow-elevation-1 active:bg-primary/12",
        // Material 3 Text Button
        ghost: "bg-transparent text-primary hover:bg-primary/8 active:bg-primary/12",
        destructive: "bg-destructive text-white hover:shadow-elevation-2 hover:bg-destructive/90 active:shadow-elevation-1 transform hover:scale-[1.02]",
        link: "text-primary underline-offset-4 hover:underline bg-transparent",
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
