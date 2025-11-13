const path = require("path");

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
            // Asegúrate de tener estos presets instalados
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(svg|png|jpg|jpeg|gif)$/, type: "asset/resource" }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src") // opcional, para rutas cortas tipo "@/components"
    }
  },
  devtool: "inline-source-map"
};

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],

    // Todos los archivos de test
    files: ["test/**/*.spec.js"],

    preprocessors: {
      "test/**/*.spec.js": ["webpack", "sourcemap"]
    },

    webpack: webpackConfig,

    // Reportes de salida
    reporters: ["progress"],

    // Usa ChromeHeadless sin entorno gráfico (perfecto para EC2)
    browsers: ["ChromeHeadlessNoSandbox"],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"]
      }
    },

    singleRun: true,
    concurrency: Infinity,

    // Opcional: tiempo extra por si los tests demoran más en EC2
    browserNoActivityTimeout: 60000
  });
};
