require("dotenv").config();

module.exports = {
  proxy: `localhost:${process.env.PORT}`,
  files: ["**/*.css", "**/*.pug", "**/*.js"],
  ignore: ["node_modules"],
  reloadDelay: 10,
  ui: false,
  notify: false,
  port: process.env.PORTBROWS,
};
