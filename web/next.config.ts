import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fuera el indicador flotante de desarrollo: esta pantalla se va a enseñar
  // en una reunión y ese círculo negro distrae.
  devIndicators: false,
};

export default nextConfig;
