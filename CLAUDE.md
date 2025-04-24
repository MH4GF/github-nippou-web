# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Build: `pnpm build`
- Dev server: `pnpm dev` 
- Production server: `pnpm start`
- Linting: `pnpm lint`
- Formatting: `pnpm format`
- Tests: `pnpm test:vrt:compare`
- Single test: `pnpm test:vrt:compare --grep="test name"`
- Update test snapshots: `pnpm test:vrt:screenshots`

## Style Guide
- Uses TypeScript in strict mode with path alias `@/*` → `./src/*`
- Package manager: pnpm 8.9.2
- ESLint extends: `@mh4gf/eslint-config`, `next/core-web-vitals`, `plugin:tailwindcss/recommended`
- Prettier config: `@mh4gf/configs/prettier`
- Next.js App Router structure with _features, _components folders
- TypeScript Promise handling in event handlers needs checksVoidReturn attributes:false
- Use Tailwind CSS for styling