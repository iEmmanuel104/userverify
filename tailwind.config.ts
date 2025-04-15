import type { Config } from "tailwindcss"
const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
        "*.{js,ts,jsx,tsx,mdx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                emerald: {
                    50: "oklch(0.97 0.03 160)",
                    100: "oklch(0.95 0.05 160)",
                    200: "oklch(0.9 0.08 160)",
                    300: "oklch(0.8 0.12 160)",
                    400: "oklch(0.7 0.16 160)",
                    500: "oklch(0.59 0.19 160)",
                    600: "oklch(0.52 0.19 160)",
                    700: "oklch(0.45 0.19 160)",
                    800: "oklch(0.38 0.17 160)",
                    900: "oklch(0.32 0.15 160)",
                },
                teal: {
                    50: "oklch(0.97 0.03 180)",
                    100: "oklch(0.95 0.05 180)",
                    200: "oklch(0.9 0.08 180)",
                    300: "oklch(0.8 0.12 180)",
                    400: "oklch(0.7 0.16 180)",
                    500: "oklch(0.55 0.18 180)",
                    600: "oklch(0.48 0.18 180)",
                    700: "oklch(0.42 0.16 180)",
                    800: "oklch(0.36 0.14 180)",
                    900: "oklch(0.3 0.12 180)",
                },
                cyan: {
                    50: "oklch(0.97 0.03 200)",
                    100: "oklch(0.95 0.05 200)",
                    200: "oklch(0.9 0.08 200)",
                    300: "oklch(0.8 0.12 200)",
                    400: "oklch(0.7 0.16 200)",
                    500: "oklch(0.6 0.18 200)",
                    600: "oklch(0.5 0.18 200)",
                    700: "oklch(0.4 0.16 200)",
                    800: "oklch(0.35 0.14 200)",
                    900: "oklch(0.3 0.12 200)",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
