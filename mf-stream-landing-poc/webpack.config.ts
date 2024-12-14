import path from "path";
import HTMLWebpackPlugin from "html-webpack-plugin";
import ModuleFederationPlugin from "webpack/lib/container/ModuleFederationPlugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import glob from "glob-all";
import { PurgeCSSPlugin } from "purgecss-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

const config = {
  mode: "development",
  devServer: {
    static: "./build",
    client: {
      logging: "info",
    },
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "http://localhost:3001/",
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      // css files
      {
        test: /\.css$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: false,
              modules: {
                auto: true,
                namedExport: false,
                localIdentName: "css__module__[hash]__[local]",
              },
              sourceMap: true,
            },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
        ],
      },
      // js and jsx files
      {
        test: /^(?!.*\.(test|config)\.).*\.(js|jsx)$/,
        exclude: [
          /node_modules/, // Exclude node_modules
        ],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      // ts and tsx files
      {
        test: /^(?!.*\.(test|config)\.).*\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                "@babel/preset-react",
              ],
            },
          },
          "ts-loader",
        ],
        exclude: [
          /node_modules/, // Exclude node_modules
        ],
      },
      // assets
      // {
      //   test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
      //   type: "asset",
      // }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "streamLanding",
      filename: "streamLanding.js",
      remotes: {
        streamStore: "streamStore@http://localhost:3002/streamStore.js",
      },
      exposes: {
        "./StreamLanding": "./src/app",
      },
      shared: {
        react: {
          singleton: true,
          version: "0",
          requiredVersion: false,
        },
        "react-dom": {
          requiredVersion: false,
          singleton: true,
          version: "0",
        },
      },
    }),
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      // chunkFilename: "[id].css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync([
        path.join(__dirname, "src/app/*.js"),
        path.join(__dirname, "src/app/*.jsx"),
        path.join(__dirname, "src/app/*.ts"),
        path.join(__dirname, "src/app/*.tsx"),
      ]),
      safelist: {
        // Keep all base styles (you can specify elements or classes if needed)
        deep: [
          /^html$/,
          /^body$/,
          /^div$/,
          /^span$/,
          /^h1$/,
          /^h2$/,
          /^h3$/,
          /^h4$/,
          /^h5$/,
          /^h6$/,
          /^p$/,
          /^a$/,
          /^ul$/,
          /^ol$/,
          /^li$/,
          /^button$/,
          /^input$/,
          /^textarea$/,
          /^select$/,
          /^option$/,
          /^form$/,
          /^label$/,
          /^nav$/,
          /^header$/,
          /^footer$/,
          /^section$/,
          /^article$/,
          /^aside$/,
          /^main$/,
          /^figure$/,
          /^figcaption$/,
          /^blockquote$/,
          /^pre$/,
          /^code$/,
          /^table$/,
          /^thead$/,
          /^tbody$/,
          /^tr$/,
          /^th$/,
          /^td$/,
          /^img$/,
          /^video$/,
          /^audio$/,
          /^canvas$/,
          /^svg$/,
          /^path$/,
          /^g$/,
          /^circle$/,
          /^rect$/,
          /^polygon$/,
          /^iframe$/,
          /^strong$/,
          /^em$/,
          /^b$/,
          /^i$/,
          /^u$/,
          /^small$/,
          /^big$/,
          /^sup$/,
          /^sub$/,
          /^hr$/,
          /^br$/,
          /^dl$/,
          /^dt$/,
          /^dd$/,
          /^fieldset$/,
          /^legend$/,
          /^caption$/,
          /^details$/,
          /^summary$/,
          /^mark$/,
          /^meter$/,
          /^progress$/,
          /^output$/,
          /^embed$/,
          /^object$/,
          /^source$/,
          /^track$/,
          /^wbr$/,
          /css__module__/,
        ], // Matches all tags and elements
      },
      blocklist: [],
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = config;
