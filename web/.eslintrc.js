/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  extends: ['@mh4gf/eslint-config', 'next/core-web-vitals', 'plugin:tailwindcss/recommended'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: { project: './tsconfig.json' },
      rules: {
        '@typescript-eslint/no-misused-promises': [
          2,
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
      },
    },
  ],
}
