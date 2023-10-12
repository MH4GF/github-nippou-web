const CopyPlugin = require("copy-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config, { isServer }) => {
    console.log("call webpack", { isServer });

    if (isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: "src/app/server-actions/main.wasm",
              to: "./app/server-actions/main.wasm",
            },
          ],
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;
