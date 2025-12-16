const webpackConfig = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // Esto activa babel-plugin-istanbul solo para tests
            plugins: ["istanbul"]
          }
        }
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(svg|png|jpg|jpeg|gif)$/, use: "file-loader" }
    ]
  },
  resolve: { extensions: [".js", ".jsx"] },
};

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: ["test/**/*.spec.js"],
    preprocessors: {
      "src/**/*.js": ["webpack", "sourcemap"],  // instrumenta código fuente
      "test/**/*.spec.js": ["webpack", "sourcemap"]
    },
    webpack: webpackConfig,

    browsers: ["ChromeHeadlessCustom"],
    customLaunchers: {
      ChromeHeadlessCustom: {
        base: "ChromeHeadless",
        flags: [
          "--no-sandbox",
          "--disable-gpu",
          "--disable-dev-shm-usage",
          "--remote-debugging-port=9222",
          "--user-data-dir=/tmp/chrome-karma"
        ]
      }
    },

    singleRun: true,
    reporters: ["progress", "coverage"],
    coverageReporter: {
      type: "text",        // solo texto en terminal
      dir: "coverage/",    // carpeta temporal, no se generará HTML
      includeAllSources: true
    },
  });
};

