module.exports = {
    important: true,
    theme: {
        extend: {},
    },
    variants: {
        flexDirection: ["responsive", "hover", "focus"],
    },
    plugins: [],
    purge: {
        content: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx"],
    },
};
