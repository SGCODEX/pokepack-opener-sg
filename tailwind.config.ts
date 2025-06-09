
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['PT Sans', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'card-flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        'card-reveal': { 
          '0%': { transform: 'scale(0.5) translateY(50px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
         'pack-shake': { 
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '10%, 30%, 50%': { transform: 'translateX(-5px) rotate(-2deg)' },
          '20%, 40%, 60%': { transform: 'translateX(5px) rotate(2deg)' },
          '70%, 90%': { transform: 'translateX(-3px) rotate(-1deg)' },
          '80%': { transform: 'translateX(3px) rotate(1deg)' },
        },
        'opening-pack-burst': {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '15%': { transform: 'scale(1.03) rotate(-2deg) translateX(-3px)' },
          '30%': { transform: 'scale(1.03) rotate(2deg) translateX(3px)' },
          '45%': { transform: 'scale(1.08) rotate(-3deg)' },
          '60%': { transform: 'scale(1.08) rotate(3deg)' },
          '75%': { transform: 'scale(1.12) rotate(-1deg)' },
          '90%': { transform: 'scale(1.12) rotate(1deg)' },
          '100%': { transform: 'scale(1.15) rotate(0deg)', opacity: '0.9' },
        },
        'rarity-glow-common': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(200, 200, 200, 0.5)' },
          '50%': { boxShadow: '0 0 15px rgba(200, 200, 200, 0.8)' },
        },
        'rarity-glow-uncommon': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(100, 150, 255, 0.5)' },
          '50%': { boxShadow: '0 0 15px rgba(100, 150, 255, 0.8)' },
        },
        'rarity-glow-rare': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(255, 215, 0, 0.7)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 215, 0, 1)' },
        },
        'rarity-glow-holo': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255, 105, 180, 0.8), 0 0 5px rgba(0, 255, 255, 0.8)' },
          '50%': { boxShadow: '0 0 25px rgba(255, 105, 180, 1), 0 0 15px rgba(0, 255, 255, 1)' },
        },
        'swipe-out-left': {
          '0%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateX(-150%) rotate(-15deg)', opacity: '0' },
        },
        'swipe-out-right': {
          '0%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateX(150%) rotate(15deg)', opacity: '0' },
        },
        'holo-blue-wave-shimmer': { 
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        /* Removed rare-glow-bg keyframes as it's a solid color now */
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'card-flip': 'card-flip 0.6s ease-in-out',
        'card-reveal': 'card-reveal 0.5s ease-out forwards',
        'pack-shake': 'pack-shake 0.6s ease-in-out infinite', 
        'opening-pack-burst': 'opening-pack-burst 0.9s ease-in-out forwards', 
        'rarity-glow-common': 'rarity-glow-common 2s infinite ease-in-out',
        'rarity-glow-uncommon': 'rarity-glow-uncommon 2s infinite ease-in-out',
        'rarity-glow-rare': 'rarity-glow-rare 2s infinite ease-in-out',
        'rarity-glow-holo': 'rarity-glow-holo 2.5s infinite alternate ease-in-out',
        'swipe-out-left': 'swipe-out-left 0.5s ease-in-out forwards',
        'swipe-out-right': 'swipe-out-right 0.5s ease-in-out forwards',
        'holo-blue-wave-shimmer': 'holo-blue-wave-shimmer 7s ease-in-out infinite',
         /* Removed rare-glow-bg animation as it's a solid color now */
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
