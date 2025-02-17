// eslint.config.mjs
import { defineConfig } from "eslint";

export default defineConfig({
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "next/core-web-vitals", // Regras específicas do Next.js
    "eslint:recommended", // Regras recomendadas do ESLint
    "plugin:@typescript-eslint/recommended", // Regras para TypeScript
    "plugin:import/errors", // Regras de organização de imports
    "plugin:import/warnings",
    "plugin:prettier/recommended" // Adiciona as regras do Prettier
  ],
  parser: "@typescript-eslint/parser", // Usar o parser do TypeScript
  parserOptions: {
    ecmaVersion: "latest", // Configuração para usar as features mais novas do ECMAScript
    sourceType: "module" // Usar módulos ES
  },
  plugins: [
    "@typescript-eslint", // Plugin do TypeScript
    "import", // Plugin para organização de imports
    "prettier" // Plugin do Prettier
  ],
  rules: {
    "prettier/prettier": "error", // Aplica a formatação do Prettier como um erro
    indent: ["error", 2], // Usar indentação de 2 espaços
    quotes: ["error", "double"], // Usar aspas duplas
    semi: ["error", "always"], // Exigir ponto e vírgula
    "@typescript-eslint/explicit-module-boundary-types": "off", // Permitir inferência de tipos
    "import/no-unused-modules": ["warn", { unusedExports: true }], // Detecta módulos não usados
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external", "internal"],
          ["parent", "sibling", "index"]
        ],
        "newlines-between": "always"
      }
    ] // Organização dos imports
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Regras específicas para arquivos TypeScript
      rules: {
        "no-explicit-any": "warn", // Evitar o uso de 'any' explicitamente
        "@typescript-eslint/no-explicit-any": "warn"
      }
    },
    {
      files: ["*.mjs"], // Regras específicas para arquivos .mjs
      rules: {
        "no-undef": "off", // Desabilitar a regra `no-undef` para arquivos .mjs
        "import/no-commonjs": "error" // Evitar `require` e `module.exports` em módulos ES
      }
    }
  ]
});
