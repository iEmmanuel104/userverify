"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    return <div className="fixed top-0 right-0 z-50 p-4 w-full max-w-sm">{children}</div>;
};

const toastVariants = cva(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full",
    {
        variants: {
            variant: {
                default: "border-slate-200 bg-white text-slate-950",
                destructive: "destructive group border-red-500 bg-red-500 text-slate-50",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(({ className, variant, children, open, onOpenChange, ...props }, ref) => {
    return open ? (
        <div ref={ref} className={cn(toastVariants({ variant }), className)} data-state={open ? "open" : "closed"} {...props}>
            {children}
            <button
                className="absolute right-2 top-2 rounded-md p-1 text-slate-950/50 opacity-0 transition-opacity hover:text-slate-950 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600"
                onClick={() => onOpenChange?.(false)}
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </button>
        </div>
    ) : null;
});
Toast.displayName = "Toast";

const ToastTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
ToastDescription.displayName = "ToastDescription";

export { Toast, ToastProvider, ToastTitle, ToastDescription };
