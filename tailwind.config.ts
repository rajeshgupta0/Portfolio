import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        jetbrains: ['JetBrains Mono', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          secondary: "hsl(var(--background-secondary))",
          tertiary: "hsl(var(--background-tertiary))",
          elevated: "hsl(var(--background-elevated))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          muted: "hsl(var(--foreground-muted))",
          subtle: "hsl(var(--foreground-subtle))",
          dim: "hsl(var(--foreground-dim))",
        },
        neon: {
          primary: "hsl(var(--neon-primary))",
          secondary: "hsl(var(--neon-secondary))",
          accent: "hsl(var(--neon-accent))",
          warning: "hsl(var(--neon-warning))",
          success: "hsl(var(--neon-success))",
          error: "hsl(var(--neon-error))",
          magenta: "hsl(var(--neon-magenta))",
          teal: "hsl(var(--neon-teal))",
        },
        section: {
          hero: "hsl(var(--section-hero))",
          about: "hsl(var(--section-about))",
          skills: "hsl(var(--section-skills))",
          experience: "hsl(var(--section-experience))",
          projects: "hsl(var(--section-projects))",
          proof: "hsl(var(--section-proof))",
          contact: "hsl(var(--section-contact))",
        },
        glass: {
          bg: "hsl(var(--glass-bg))",
          border: "hsl(var(--glass-border))",
          highlight: "hsl(var(--glass-highlight))",
        },
        recruiter: {
          accent: "hsl(var(--recruiter-accent))",
          bg: "hsl(var(--recruiter-bg))",
        },
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(10px)" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          from: { transform: "translateY(-20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-out": "fade-out 0.3s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "slide-down": "slide-down 0.5s ease-out forwards",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "typewriter": "typewriter 3s steps(40) 1s both",
        "glitch": "glitch 0.3s ease-in-out infinite alternate",
        "flicker": "flicker 0.1s ease-in-out infinite",
        "gradient-shift": "gradient-shift 4s ease-in-out infinite",
        "ring-rotate": "ring-rotate 6s linear infinite",
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-secondary': 'var(--gradient-secondary)',
        'gradient-premium': 'var(--gradient-premium)',
        'gradient-gold': 'var(--gradient-gold)',
        'gradient-cosmic': 'var(--gradient-cosmic)',
        'gradient-ring': 'var(--gradient-ring)',
        'gradient-text': 'var(--gradient-text)',
        'gradient-holographic': 'var(--gradient-holographic)',
      },
      boxShadow: {
        'neon': 'var(--shadow-neon)',
        'neon-lg': 'var(--shadow-neon-lg)',
        'neon-intense': 'var(--shadow-neon-intense)',
        'glass': 'var(--shadow-glass)',
        'premium': 'var(--shadow-premium)',
        'elevated': 'var(--shadow-elevated)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
