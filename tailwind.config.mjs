/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css,module.css}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        'primary-foreground': '#ffffff',
        secondary: '#4B5563',
        'secondary-foreground': '#F3F4F6',
        destructive: '#DC2626',
        'destructive-foreground': '#FFFFFF',
        accent: '#3B82F6',
        'accent-foreground': '#FFFFFF',
      },
    },
  },
  plugins: [],
};
