## Context

`node-zpl` is a TypeScript Node.js project with documented coding patterns but no Codex-specific instruction files. The change introduces a repeatable way to create `AGENTS.md` files so AI-assisted edits follow project conventions consistently. The implementation should be lightweight, avoid new production dependencies, and fit the existing package-script workflow.

## Goals / Non-Goals

**Goals:**
- Provide a deterministic generator for `AGENTS.md` files.
- Generate at least the repository-root agent file and support optional additional target paths.
- Prevent accidental file clobbering unless the caller explicitly opts in.
- Ensure generated markdown includes mandatory guidance sections required by the team.

**Non-Goals:**
- Building a generic templating engine for arbitrary documentation.
- Introducing remote config, network lookups, or external services.
- Modifying runtime ZPL generation behaviour.
- Auto-updating unrelated docs beyond agent-generation usage notes.

## Decisions

1. **Add a dedicated generation command in repo tooling**
   - Decision: expose generation through an existing package-manager script (for example, `yarn generate:agents`) that invokes a local script.
   - Rationale: keeps execution discoverable and consistent with current local workflows.
   - Alternatives considered:
     - Manual file authoring only: rejected due to drift and inconsistency risk.
     - New standalone CLI package: rejected as unnecessary overhead for this scope.

2. **Use file-based templates with token replacement**
   - Decision: store canonical agent template content in-repo and render outputs with explicit tokens (project name, commands, paths, conventions).
   - Rationale: file-based templates are reviewable, version-controlled, and easy to diff.
   - Alternatives considered:
     - Hard-coded string literals in script: rejected for poor maintainability.
     - External templating dependency: rejected to avoid extra production dependencies.

3. **Implement safe overwrite semantics**
   - Decision: default mode must not overwrite existing `AGENTS.md`; a `--force` flag enables replacement.
   - Rationale: protects user-authored guidance and minimises destructive surprises.
   - Alternatives considered:
     - Always overwrite: rejected because it can erase manual updates.
     - Always merge: rejected due to ambiguous merge semantics and hidden complexity.

4. **Validate required sections before write completion**
   - Decision: generation flow validates required headings and fails fast when template output is incomplete.
   - Rationale: catches malformed outputs early and ensures consumer tools receive predictable structure.
   - Alternatives considered:
     - No validation: rejected because invalid files may go unnoticed until later.

5. **Support nested targets from config and CLI flags**
   - Decision: nested target directories are read from a project config file and can also be provided via repeated CLI flags at runtime.
   - Decision: when both sources are used, config targets are loaded first and CLI targets are appended with path normalisation and de-duplication.
   - Rationale: config provides a stable default while CLI flags enable one-off runs without file edits.
   - Alternatives considered:
     - Config-only: rejected because it is slower for ad-hoc generation.
     - CLI-only: rejected because teams need a committed default configuration.

6. **Enforce deterministic section ordering**
   - Decision: generated markdown must always emit required headings in a fixed canonical order for every target file.
   - Rationale: deterministic output makes diffs stable and test assertions reliable.
   - Alternatives considered:
     - Preserve author/template insertion order dynamically: rejected because it can produce non-deterministic output across updates.

## Risks / Trade-offs

- **[Risk] Template becomes stale as conventions evolve** → **Mitigation:** keep template in version control, document regeneration process, and add tests that assert required headings.
- **[Risk] Existing custom `AGENTS.md` files block generation** → **Mitigation:** print clear skip messages and provide explicit `--force` override.
- **[Trade-off] Strict validation may fail on intentionally custom files** → **Mitigation:** run validation on generated output only, not on pre-existing unmanaged files.
- **[Trade-off] Supporting many target paths increases maintenance surface** → **Mitigation:** start with a small, explicit target list and extend only when needed.

## Migration Plan

1. Add generator script, template assets, and package script entry.
2. Generate root `AGENTS.md` and any configured nested agent files.
3. Add or update documentation describing generation and overwrite flags.
4. Run lint/build gates to verify no regressions.
5. Rollback path: remove the generation command/templates and delete generated files if the approach is rejected.

## Open Questions

- Should generation be part of CI checks (validate-only mode) or remain a local developer action?
