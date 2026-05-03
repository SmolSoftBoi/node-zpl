## Context

`@epickris/zpl` already ships via npm with CI workflows, but package trust signals are fragmented: release policy is implicit, there is no committed changelog, README trust indicators are minimal, and runtime compatibility details are split across `package.json`, workflows, and examples. The package currently exposes `main` and a deep import example (`/dist/commands`) without a clear public entry-point contract, which increases consumer uncertainty.

## Goals / Non-Goals

**Goals:**
- Make versioning intent explicit through a documented semantic versioning policy tied to releases.
- Establish a deterministic changelog workflow that maps package versions to release entries.
- Surface trust signals in README (build health and support claims) in a stable, maintainable way.
- Keep Node.js support claims consistent across docs, `engines`, and CI.
- Make module consumption expectations explicit for both ESM and CJS users.

**Non-Goals:**
- Rewriting the core label-generation runtime or CLI behaviour.
- Introducing automated release tooling beyond lightweight policy and documentation updates.
- Guaranteeing support for every historical deep import path outside documented public entry points.

## Decisions

1. **Define release policy in-repo and link it to version bumps**
   - Decision: add a release policy section in project docs that states SemVer expectations (MAJOR for breaking changes, MINOR for additive backwards-compatible features, PATCH for fixes).
   - Rationale: clear policy reduces accidental version misuse and gives consumers predictable upgrade risk.
   - Alternatives considered:
     - Keep implicit policy: rejected because contributors interpret version bumps inconsistently.
     - Depend only on GitHub release text: rejected because policy should live with source control and code review.

2. **Adopt a committed `CHANGELOG.md` as the release ledger**
   - Decision: introduce/maintain `CHANGELOG.md` with one section per released version, and require release notes/changelog entry alignment before publish.
   - Rationale: changelog is the canonical history consumers expect when evaluating upgrades.
   - Alternatives considered:
     - Use Git history only: rejected because commit logs are noisy and not consumer-oriented.
     - Auto-generate full changelog from commits: deferred to keep scope small and reviewable.

3. **Expose trust signals directly in README**
   - Decision: add stable badges (at minimum CI workflow status; optionally npm version and security scanning status if already available) and a concise support matrix section.
   - Rationale: trust signals should be visible at first glance on npm/GitHub landing surfaces.
   - Alternatives considered:
     - Keep trust signals only in GitHub UI tabs: rejected because users should not need to navigate away to validate package health.

4. **Align Node support contract across metadata, docs, and CI**
   - Decision: treat `package.json#engines.node` as the source-of-truth floor, and ensure README and CI matrix reflect tested majors at or above that floor.
   - Rationale: mismatched support claims create avoidable runtime failures and support burden.
   - Alternatives considered:
     - Keep broad unbounded `>=` support claim without tested matrix guidance: rejected because it overstates confidence in untested future majors.

5. **Document and codify public package entry points for ESM/CJS clarity**
   - Decision: define explicit public consumption paths (root package and commands subpath) and document both `import` and `require` usage; avoid relying on undocumented internal `/dist/*` imports.
   - Decision: if package metadata changes are needed (for example `exports` map), preserve backwards compatibility for existing documented usage during migration.
   - Rationale: clear entry points reduce module-resolution ambiguity and future packaging breakages.
   - Alternatives considered:
     - Leave entry points implicit via `main` and direct `dist` paths: rejected due to unclear contract.
     - Move to ESM-only immediately: rejected because it would raise migration cost for existing CJS consumers.

## Risks / Trade-offs

- **[Risk] Badge links drift as workflow names or branches change** → **Mitigation:** reference canonical workflow filenames and validate rendered badge URLs in review.
- **[Risk] Entry-point tightening can break undocumented deep imports** → **Mitigation:** document supported paths, preserve currently documented imports, and call out migration guidance before removing legacy paths.
- **[Trade-off] Additional release checklist steps increase maintainer effort** → **Mitigation:** keep policy concise and integrate checks into existing release flow.
- **[Trade-off] Testing only selected Node majors limits confidence on other versions** → **Mitigation:** explicitly document tested majors and avoid over-claiming unsupported versions.

## Migration Plan

1. Add/update docs for SemVer policy, support matrix, and ESM/CJS consumption examples.
2. Add `CHANGELOG.md` with an initial baseline and define update rules for each release.
3. Update package metadata and README to align public entry points and compatibility claims.
4. Verify CI workflows reflect declared support matrix and ensure badge targets are correct.
5. Rollback path: revert metadata/doc changes in one release if consumer regressions are detected.

## Open Questions

- Should Node support be expressed as a floor only (for example `>=20`) or a tested-major range that tracks CI more strictly?
- Should the project formally guarantee the `./commands` subpath as a stable public API, or deprecate it in favour of root exports only?
