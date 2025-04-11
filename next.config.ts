/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configuración para permitir imágenes desde placeholder.svg
  images: {
    domains: ['placeholder.svg'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placeholder.svg',
      },
    ],
  },
  // Configuración para servir archivos estáticos desde la carpeta assets
  async rewrites() {
    return [
      {
        source: '/assets/:path*',
        destination: '/assets/:path*',
      },
    ];
  },
};

export default nextConfig;

