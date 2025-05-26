/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideDown: 'slideDown 0.2s ease-out',
        bounce: 'bounce 1.5s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            maxWidth: '100%',
            code: {
              backgroundColor: theme('colors.gray.100'),
              borderRadius: theme('borderRadius.md'),
              paddingTop: theme('spacing.1'),
              paddingRight: theme('spacing.1.5'),
              paddingBottom: theme('spacing.1'),
              paddingLeft: theme('spacing.1.5'),
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
              borderRadius: theme('borderRadius.lg'),
              padding: theme('spacing.4'),
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.200'),
            code: {
              backgroundColor: theme('colors.gray.700'),
            },
            pre: {
              backgroundColor: theme('colors.gray.900'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.prose': {
          '& p': {
            marginTop: '1em',
            marginBottom: '1em',
          },
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            marginTop: '1.5em',
            marginBottom: '0.5em',
            fontWeight: '600',
          },
          '& h1': { fontSize: '1.875rem' },
          '& h2': { fontSize: '1.5rem' },
          '& h3': { fontSize: '1.25rem' },
          '& h4': { fontSize: '1.125rem' },
          '& h5': { fontSize: '1rem' },
          '& h6': { fontSize: '0.875rem' },
          '& ul, & ol': {
            paddingLeft: '1.5rem',
            marginTop: '1em',
            marginBottom: '1em',
          },
          '& ul': { listStyleType: 'disc' },
          '& ol': { listStyleType: 'decimal' },
          '& li': {
            marginTop: '0.25em',
            marginBottom: '0.25em',
          },
          '& pre': {
            borderRadius: '0.75rem',
            padding: '1rem',
            marginTop: '1.5em',
            marginBottom: '1.5em',
            overflowX: 'auto',
          },
          '& blockquote': {
            borderLeftWidth: '4px',
            borderLeftColor: '#3b82f6',
            paddingLeft: '1rem',
            fontStyle: 'italic',
            marginTop: '1.5em',
            marginBottom: '1.5em',
            backgroundColor: '#f8fafc',
            borderRadius: '0.5rem',
            padding: '1rem',
          },
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            marginTop: '1.5em',
            marginBottom: '1.5em',
            borderRadius: '0.5rem',
          },
          '& hr': {
            marginTop: '2em',
            marginBottom: '2em',
            borderColor: '#e2e8f0',
          },
          '& a': {
            color: '#3b82f6',
            textDecoration: 'underline',
            '&:hover': {
              color: '#2563eb',
            },
          },
          '& table': {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '1.5em',
            marginBottom: '1.5em',
            borderRadius: '0.5rem',
            overflow: 'hidden',
          },
          '& th': {
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            padding: '0.75rem',
            textAlign: 'left',
            fontWeight: '600',
          },
          '& td': {
            borderBottom: '1px solid #e2e8f0',
            padding: '0.75rem',
          },
        },
        '.dark .prose': {
          '& a': {
            color: '#60a5fa',
            '&:hover': {
              color: '#93c5fd',
            },
          },
          '& blockquote': {
            borderLeftColor: '#60a5fa',
            backgroundColor: '#1e293b',
          },
          '& th': {
            backgroundColor: '#1e293b',
            borderBottomColor: '#374151',
          },
          '& td': {
            borderBottomColor: '#374151',
          },
        },
      });
    },
  ],
};