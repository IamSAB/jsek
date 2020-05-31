module.exports = {
    important: '#app',
    theme: {
        extend: {
            fontFamily: {
                'heading': ['Permanent Marker', 'cursive'],
                'body': ['Overpass', 'sans-serif']
            },
            colors: {
                primary: {
                    d: "var(--color-primary-darker)",
                    0: "var(--color-primary)",
                    l: "var(--color-primary-lighter)"
                },
                secondary: {
                    d: "var(--color-secondary-darker)",
                    0: "var(--color-secondary)",
                    l: "var(--color-secondary-lighter)"
                }
            }
        },
        container: {
            center: true,
            padding: {
                default: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
            },
        },
    },
    variants: {
        borderWidth: ['hover'],
    },
    plugins: [],
}