/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

module.exports = {
  basePath: `/${Senryu}`,
  assetPrefix: `/${Senryu}/`,
  trailingSlash: true,
};

module.exports = nextConfig;
