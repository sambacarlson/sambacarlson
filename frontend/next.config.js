/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  async redirects() {
    return [
      { source: "/developer", destination: "/", permanent: true },
      { source: "/developer/resume", destination: "/resume", permanent: true },
      { source: "/designer", destination: "/", permanent: true },
      { source: "/teacher", destination: "/", permanent: true },
      { source: "/theologian", destination: "/", permanent: true },
      { source: "/coverLetter", destination: "/", permanent: true },
    ];
  },
};

module.exports = nextConfig;