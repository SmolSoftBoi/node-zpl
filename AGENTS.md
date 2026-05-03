# Codex Agent Guide

## Purpose
This guide defines how automation and coding agents should operate in `@epickris/zpl`.
It keeps generated changes consistent with repository conventions.

Package description: Build, tweak and render individual labels.

## Scope
- Work within the repository root unless a task explicitly requires another location.
- Prefer small, reviewable diffs with deterministic output.
- Follow existing project tooling and coding conventions.

## Workflow
1. Validate using `yarn lint` and `yarn build`.
2. Keep OpenSpec tasks in sync by ticking completed checklist items.

## Quality Gates
- Lint: `yarn lint`
- Build: `yarn build`

## Safety
- Do not overwrite existing files unless explicit overwrite mode is requested.
- Treat credentials and tokens as sensitive inputs sourced from environment variables.
- Stop and ask before destructive operations or broad refactors.
