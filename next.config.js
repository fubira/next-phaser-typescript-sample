/** @type {import('next').NextConfig} */
module.exports = {
  output: "standalone",
  publicRuntimeConfig: {
    version: process.env.npm_package_version,
  },
};
