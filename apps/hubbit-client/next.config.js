/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  webpack: (config, { isServer }) => {
    // Add HTML loader for handling HTML files
    config.module.rules.push({
      test: /\.html$/,
      use: "html-loader",
    });

    // Return the modified webpack config
    return config;
  },
  images: {
    domains: ["st3.depositphotos.com"],
  },
};
