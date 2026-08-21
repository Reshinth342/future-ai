/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#040407",
        surface: "rgba(255, 255, 255, 0.04)",
        "surface-dark": "rgba(10, 10, 18, 0.75)",
        glass: "rgba(255, 255, 255, 0.06)",
        "glass-hover": "rgba(255, 255, 255, 0.12)",
        "border-subtle": "rgba(255, 255, 255, 0.12)",
        "border-glass": "rgba(255, 255, 255, 0.18)",
        "accent-blue": "#3b82f6",
        "accent-violet": "#8b5cf6",
        "accent-cyan": "#06b6d4",
        "accent-amber": "#f59e0b",
        "accent-red": "#ef4444",
        "accent-green": "#10b981",
        "accent-gold": "#eab308",
        "text-primary": "#f8fafc",
        "text-secondary": "#cbd5e1",
        "text-muted": "#64748b",
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'spatial': '0 30px 60px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.18)',
        'spatial-hover': '0 40px 80px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(59, 130, 246, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)',
        'glow-blue': '0 0 50px -5px rgba(59, 130, 246, 0.3)',
        'glow-violet': '0 0 50px -5px rgba(139, 92, 246, 0.3)',
        'glow-cyan': '0 0 50px -5px rgba(6, 182, 212, 0.3)',
        'glow-amber': '0 0 50px -5px rgba(245, 158, 11, 0.3)',
        'glow-red': '0 0 50px -5px rgba(239, 68, 68, 0.3)',
        'glow-gold': '0 0 50px -5px rgba(234, 179, 8, 0.3)',
      },
      borderRadius: {
        '3xl': '28px',
        '4xl': '36px',
      },
      animation: {
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 7s ease-in-out infinite',
        'spatial-glow': 'spatialGlow 4s infinite ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        spatialGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
