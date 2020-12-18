module.exports = {
  plugins: [
    // eslint-disable-next-line
    require("postcss-import"),
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
  ],
};
