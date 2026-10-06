import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'info'
  children?: React.ReactNode;
  className?: string;
}

function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
        {
          "border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80": variant === "default",
          "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80": variant === "secondary",
          "text-slate-950 border-slate-200": variant === "outline",
          "border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80": variant === "destructive",
          "border-transparent bg-emerald-500 text-white hover:bg-emerald-600": variant === "success",
          "border-transparent bg-amber-500 text-white hover:bg-amber-600": variant === "warning",
          "border-transparent bg-blue-500 text-white hover:bg-blue-600": variant === "info",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Badge }
