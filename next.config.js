const webpack = require("webpack");

module.exports = {
  images: {
    domains: ["api.xn--80agodft5c.xn--p1ai"],
  },
  publicRuntimeConfig: {
    API_URL: 'https://api.xn--80agodft5c.xn--p1ai/api', // process.env.API_URL
	BASE_URL: 'https://api.xn--80agodft5c.xn--p1ai'
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
       and: [/\.(js|ts)x?$/],
      },
      use: ['@svgr/webpack'],
      
    });

    return config;
  }
}