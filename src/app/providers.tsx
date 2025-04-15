"use client";

import type React from "react";

import { useToast } from "../hooks/use-toast";
import { Toast, ToastProvider, ToastTitle, ToastDescription } from "../components/ui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <ToastContainer />
        </>
    );
}

function ToastContainer() {
    const { isOpen, toastProps, dismiss } = useToast();

    return (
        <ToastProvider>
            <Toast variant={toastProps?.variant} open={isOpen} onOpenChange={dismiss}>
                {toastProps?.title && <ToastTitle>{toastProps.title}</ToastTitle>}
                {toastProps?.description && <ToastDescription>{toastProps.description}</ToastDescription>}
            </Toast>
        </ToastProvider>
    );
}
