module.exports = {
    theme: {
        fontFamily: {
            'heading': ['Pacifico', 'cursive'],
            'body': ['Quicksand', 'sans-serif']
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
    variants: {
        borderWidth: ['hover'],
    },
    plugins: [],
}