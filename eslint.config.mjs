import { FlatCompat } from "@eslint/eslintrc";

// eslint-config-next 15.x es un shareable config legacy (eslintrc); con
// ESLint 9 (flat config) hay que cargarlo vía FlatCompat.
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
