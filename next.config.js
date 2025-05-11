/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

module.exports = {
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,
};

module.exports = nextConfig;
