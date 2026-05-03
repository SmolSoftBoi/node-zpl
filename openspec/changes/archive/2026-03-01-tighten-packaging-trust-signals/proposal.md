## Why

Consumers cannot quickly judge release stability or runtime compatibility from the published package metadata and docs. Tightening trust signals now reduces adoption friction, prevents support churn, and makes releases safer as usage grows.

## What Changes

- Define an explicit semantic versioning policy and release checklist so published package versions match documented change types.
- Introduce a maintained `CHANGELOG.md` with release entries tied to published versions and repository releases.
- Add package trust signals in `README.md`, including CI status and supported Node.js version visibility.
- Align supported Node.js versions across `package.json` engines, CI matrix, and documentation so claims are consistent.
- Clarify ESM and CJS consumption with explicit import and `require` examples and clear public entry-point guidance.

## Capabilities

### New Capabilities
- `package-trust-signals`: Define, publish, and enforce release and packaging signals (semver, changelog, CI badges, Node support, ESM/CJS usage) so consumers can confidently adopt the package.

### Modified Capabilities
- None.

## Impact

- Affected files: `package.json`, `README.md`, CI workflow definitions, and a new `CHANGELOG.md`.
- Affected behaviour: release and documentation workflow becomes policy-driven with explicit compatibility guarantees.
- Dependencies: no new production dependencies expected.
- Risk areas: accidental module-resolution regressions if entry-point clarity changes are not backwards-compatible; implementation should preserve existing import paths where practical.
