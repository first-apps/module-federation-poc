// @ts-nocheck
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "streamHost",
          filename: "static/chunks/streamHost.js",
          remotes: {
            streamLanding:
              "streamLanding@http://localhost:3001/streamLanding.js",
          },
        })
      );
    }
    return config;
  },
};
