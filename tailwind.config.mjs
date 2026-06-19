/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                teal:         '#119DA4',
                'teal-dark':  '#0d7a80',
                orange:       '#FF7B00',
                'orange-drk': '#e66a00',
                purple:       '#AF4D98',
                'purple-drk': '#8c3d79',
                yellow:       '#FFE900',
                'dark-blue':  '#002A55',
                cream:        '#FAFAFA',
            },
            fontFamily: {
                title: ['Gerbil', 'system-ui', 'sans-serif'],
                body:  ['"Nunito Sans"', 'sans-serif'],
            },
        }
    },
    plugins: [],
}
