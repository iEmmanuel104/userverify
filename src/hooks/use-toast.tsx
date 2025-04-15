"use client";

import type React from "react";

// Adapted from shadcn/ui toast component
import { useState, useEffect, useCallback } from "react";

export type ToastProps = {
    title?: string;
    description?: string;
    action?: React.ReactNode;
    variant?: "default" | "destructive";
};

export type ToastActionElement = React.ReactElement<{
    altText: string;
    onClick: () => void;
}>;

const TOAST_TIMEOUT = 5000;

export function useToast() {
    const [toast, setToast] = useState<ToastProps | null>(null);
    const [open, setOpen] = useState(false);

    const dismiss = useCallback(() => {
        setOpen(false);
        setTimeout(() => {
            setToast(null);
        }, 300); // Allow time for exit animation
    }, []);

    useEffect(() => {
        if (toast) {
            setOpen(true);
            const timer = setTimeout(dismiss, TOAST_TIMEOUT);
            return () => clearTimeout(timer);
        }
    }, [toast, dismiss]);

    return {
        toast: (props: ToastProps) => setToast(props),
        dismiss,
        isOpen: open,
        toastProps: toast,
    };
}
