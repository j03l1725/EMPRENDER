import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fuera el indicador flotante de desarrollo: esta pantalla se enseña en reuniones.
  devIndicators: false,

  images: {
    // Next 16 rechaza cualquier `quality` que no esté declarada aquí.
    // 62 para las fotos: en un móvil con DPR 3 la diferencia visual es nula y
    // el ahorro de datos es de más de la mitad.
    qualities: [62, 75],
  },
};

export default nextConfig;
