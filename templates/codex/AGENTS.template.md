# Codex Agent Guide

## Purpose
This guide defines how automation and coding agents should operate in `{{PACKAGE_NAME}}`.
It keeps generated changes consistent with repository conventions.

Package description: {{PACKAGE_DESCRIPTION}}

## Scope
- Work within the repository root unless a task explicitly requires another location.
- Prefer small, reviewable diffs with deterministic output.
- Follow existing project tooling and coding conventions.

## Workflow
1. Validate updates using `{{LINT_COMMAND}}` and `{{BUILD_COMMAND}}`.
2. Keep OpenSpec tasks in sync by ticking completed checklist items.

## Quality Gates
- Lint: `{{LINT_COMMAND}}`
- Build: `{{BUILD_COMMAND}}`

## Safety
- Do not overwrite existing files unless explicit overwrite mode is requested.
- Treat credentials and tokens as sensitive inputs sourced from environment variables.
- Stop and ask before destructive operations or broad refactors.
