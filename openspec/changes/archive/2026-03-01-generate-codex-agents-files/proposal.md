## Why

The repository does not include Codex agent guidance files, so assistants lack repo-specific instructions for coding, validation, and conventions. Adding a repeatable way to generate these files reduces drift and makes agent behaviour consistent across the codebase.

## What Changes

- Add support to generate Codex agent files (`AGENTS.md`) from a standard template tailored to this project.
- Define where agent files are created (repository root and nested sub-paths) using both a config file and CLI flags, and define how existing files are handled.
- Add usage documentation so contributors can regenerate agent files after convention changes.
- Add validation checks to ensure generated files include required sections and valid markdown structure.

## Capabilities

### New Capabilities
- `codex-agents-generation`: Generate and maintain Codex `AGENTS.md` files with project-specific guidance, deterministic output, and safe overwrite behaviour.

### Modified Capabilities
- None.

## Impact

- Affected code: CLI or utility code responsible for template rendering and file output.
- Affected files: New agent template/source files, generated `AGENTS.md` outputs, a config file for target directories, and documentation updates (likely `README.md`).
- Dependencies: No new production dependencies expected; implementation should use existing Node.js tooling.
- Systems: Local developer workflow and AI-assisted development process become standardised.
