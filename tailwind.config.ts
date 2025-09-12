/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    'src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'src/components/**/*.{js,ts,jsx,tsx,mdx}',
    'src/models/**/*.{js,ts,jsx,tsx,mdx}',
    'src/helpers/**/*.{js,ts,jsx,tsx,mdx}',
    'src/libs/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      lineHeight: {
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px'
      },
      colors: {
        textPrimary: '#C273ED',
        sidebarBackground: '#221A2D',
        sidebarActive: '#393142',

        search: '#2F2739',
        searchText: '#EEE',
        searchFocus: '#34224F',
        settingsFocus: '#493961',

        login: '#9B4DE0',

        content: '#170F23',
        contentDesc: '#FFFFFF80',
        contentFocus: '#594B6F',
        playerFocus: '#282230',
        playerBackground: '#130C1C',

        playlistBackground: '#120822'
      },
      backgroundImage: {
        mask: 'linear-gradient(180deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.8) 10%,#333, 50%,#333);'
      },
      spacing: {
        sidebarWidth: '13.5rem',
        sidebarHeight: '3.9rem',
        18: '4.5rem',
        30: '7.5rem',
        38: '9.5rem',
        42: '10.5rem',
        46: '11.5rem',
        50: '12.5rem',
        54: '13.5rem',
        80: '20rem',
        85: '21.25rem',
        90: '22.5rem',
        100: '25rem',
        110: '27.5rem'
      },
      fontSize: {
        xxxx: '0.5rem',
        xxx: '0.625rem',
        xx: '0.67rem',
        xds: '0.78rem'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      width: {
        '1/7': '14.285714%',
        '1/8': '12.5%'
      },
      height: {
        '1/7': '14.285714%',
        '1/14': '7.142857%'
      },
      animation: {
        run: 'run 12s linear infinite',
        'spin-slow': 'spin-slow 8s linear infinite'
      },
      keyframes: {
        run: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'spin-slow': {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        }
      }
    },
    plugins: []
  },
  safelist: [
    {
      pattern: /grid-cols-./,
      variants: ['sm', 'md', 'lg', 'xl', '2xl']
    },
    {
      pattern: /w-./,
      variants: ['after']
    },
    {
      pattern: /h-./,
      variants: ['after']
    },
    {
      pattern: /truncate/
    },
    {
      pattern: /line-clamp-./
    },
    {
      pattern: /space-x-./
    }
  ]
};
