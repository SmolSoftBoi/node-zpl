# Releasing `@epickris/zpl`

This project keeps release policy and release checks in-repo so version bumps and changelog updates stay consistent.

## Semantic Versioning Policy

`@epickris/zpl` follows [Semantic Versioning 2.0.0](https://semver.org/):

- `MAJOR`: backwards-incompatible API, CLI, or packaging contract changes.
- `MINOR`: backwards-compatible feature additions.
- `PATCH`: backwards-compatible bug fixes and maintenance updates.

Version decisions MUST be based on user-facing impact, not implementation size.

## Release Checklist

Run this checklist before publishing:

1. Confirm the target version in `package.json` is a valid SemVer version.
2. Add a matching version section to `CHANGELOG.md` with user-visible changes.
3. Keep `README.md` support claims and usage examples current.
4. Run `yarn release:prepare` (lint, build, release metadata checks).
5. Create/publish the GitHub release with notes aligned to the matching changelog entry.
6. Publish to npm only after checks pass.

## Automation

- Local release gate: `yarn release:check`
- CI release gate: `.github/workflows/release-integrity.yml`
- Publish workflow additionally runs `yarn release:check` before `yarn publish`
