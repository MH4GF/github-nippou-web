# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Build: `pnpm build`
- Dev server: `pnpm dev` 
- Production server: `pnpm start`
- Linting: `pnpm lint` (runs both Biome and TypeScript checks)
- Linting (Biome only): `pnpm lint:biome`
- Linting (TypeScript only): `pnpm lint:tsc`
- Formatting: `pnpm format`
- Tests: `pnpm test:vrt:compare`
- Single test: `pnpm test:vrt:compare --grep="test name"`
- Update test snapshots: `pnpm test:vrt:screenshots`

## Style Guide
- Uses TypeScript in strict mode with path alias `@/*` → `./src/*`
- Package manager: pnpm 10.9.0
- Biome config: Extends `@mh4gf/configs/biome`
- Next.js App Router structure with _features, _components folders
- TypeScript Promise handling in event handlers needs checksVoidReturn attributes:false
- Uses Tailwind CSS v4 for styling