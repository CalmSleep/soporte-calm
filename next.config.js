/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    version: process.env.BUILD_ID,
  },
  transpilePackages: ["three"],
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "calmessimple.com.ar",
      },
      {
        protocol: "https",
        hostname: "hipno.com.ar",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    deviceSizes: [520, 640, 768, 800, 1024, 1280, 1350, 1536],
    imageSizes: [16, 32, 48, 64, 96],
  },
  experimental: {
    appDir: false, // Deshabilita la carpeta "app/" si no la estás usando
    workerThreads: false,
    cpus: 1,
  },
  i18n: {
    locales: ["es-AR"],
    defaultLocale: "es-AR",
  },
  /* async rewrites() {
    return [
      {
        source: '/producto/Colchon%20Hibrido%201400x1900/:path*',
        destination: '/renders3D/Colchon%20Hibrido%201400x1900/:path*',
      },
      {
        source: '/producto/Colchon%20Hibrido%20Plus%201400x1900/:path*',
        destination: 'https://calm-web-nextjs.vercel.app/renders3D/Colchon%20Hibrido%20Plus%201400x1900/:path*',
      },
      {
        source: '/producto/Colchon%20Original%201400x1900/:path*',
        destination: 'https://calm-web-nextjs.vercel.app/renders3D/Colchon%20Original%201400x1900/:path*',
      },
      {
        source: '/producto/Colchon%20Original%20Plus%201400x1900/:path*',
        destination: 'https://calm-web-nextjs.vercel.app/renders3D/Colchon%20Original%20Plus%201400x1900/:path*',
      },
      {
        source: '/producto/Sofa%20Cama%20Cerrado_Light/:path*',
        destination: 'https://calm-web-nextjs.vercel.app/renders3D/Sofa%20Cama%20Cerrado_Light/:path*',
      },
      {
        source: '/producto/Sofa%20Cama%20Abierto_Light/:path*',
        destination: 'https://calm-web-nextjs.vercel.app/renders3D/Sofa%20Cama%20Abierto_Light/:path*',
      },
      {
        source: '/producto/Sofa%20Cama%20Cerrado_Dark/:path*',
        destination: 'https://calmessimple.com.ar/lab/render3d/Sofa%20Cama%20Cerrado_Dark/:path*',
      },
      {
        source: '/producto/Sofa%20Cama%20Abierto_Dark/:path*',
        destination: 'https://calmessimple.com.ar/lab/render3d/Sofa%20Cama%20Abierto_Dark/:path*',
      },
    ];
  }, */
  async rewrites() {
    return [
      {
        source: "/producto/Colchon%20Hibrido%201400x1900/:path*",
        destination: "/renders3D/Colchon%20Hibrido%201400x1900/:path*",
      },
      {
        source: "/producto/Colchon%20Hibrido%20Plus%201400x1900/:path*",
        destination: "/renders3D/Colchon%20Hibrido%20Plus%201400x1900/:path*",
      },
      {
        source: "/producto/Colchon%20Original%201400x1900/:path*",
        destination: "/renders3D/Colchon%20Original%201400x1900/:path*",
      },
      {
        source: "/producto/Colchon%20Original%20Plus%201400x1900/:path*",
        destination: "/renders3D/Colchon%20Original%20Plus%201400x1900/:path*",
      },
      {
        source: "/producto/Sofa%20Cama%20Cerrado_Light/:path*",
        destination: "/renders3D/Sofa%20Cama%20Cerrado_Light/:path*",
      },
      {
        source: "/producto/Sofa%20Cama%20Abierto_Light/:path*",
        destination: "/renders3D/Sofa%20Cama%20Abierto_Light/:path*",
      },
      {
        source: "/producto/Sofa%20Cama%20Cerrado_Dark/:path*",
        destination: "/renders3D/Sofa%20Cama%20Cerrado_Dark/:path*",
      },
      {
        source: "/producto/Sofa%20Cama%20Abierto_Dark/:path*",
        destination: "/renders3D/Sofa%20Cama%20Abierto_Dark/:path*",
      },
    ];
  },
  /* webpack: (config, { isServer }) => {
    if (isServer) {
      const fs = require('fs');
      const path = require('path');
      const cacheDir = path.resolve('.next/cache');
      if (fs.existsSync(cacheDir)) {
        fs.rmSync(cacheDir, { recursive: true, force: true });
      }
    }
    return config;
  }, */
};

module.exports = nextConfig;
