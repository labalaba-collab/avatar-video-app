module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#7c3aed',
        dark: '#0b1020',
        panel: '#111827',
      },
      boxShadow: {
        glow: '0 0 30px rgba(124, 58, 237, 0.35)',
      },
      backgroundImage: {
        'aurora': 'radial-gradient(circle at top, rgba(139,92,246,0.35), transparent 45%), radial-gradient(circle at bottom right, rgba(59,130,246,0.25), transparent 40%)',
      },
    },
  },
  plugins: [],
};
