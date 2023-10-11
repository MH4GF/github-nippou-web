const CopyPlugin = require("copy-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "src/app/server-actions/main.wasm",
            to: "./server/app/server-actions/main.wasm",
          },
        ],
      })
    );
    return config;
  },
};

module.exports = nextConfig;
