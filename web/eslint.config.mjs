import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // `vercel build` deja aquí la salida compilada y minificada. Sin esto el
    // lint la analiza y devuelve ~1900 problemas que no son del proyecto.
    ".vercel/**",
  ]),
]);

export default eslintConfig;
