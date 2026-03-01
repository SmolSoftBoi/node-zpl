## 1. Generator scaffolding

- [x] 1.1 Add a local generation script and wire it to a package-manager command (for example `generate:agents`).
- [x] 1.2 Add canonical agent template source files with token placeholders for project-specific values.
- [x] 1.3 Add config-file support for nested target directories and load defaults from that config.
- [x] 1.4 Add CLI flag support for nested target directories and merge with config targets using normalisation and de-duplication.

## 2. Generation behaviour

- [x] 2.1 Implement deterministic template rendering so repeated runs with identical inputs produce identical output and canonical section ordering.
- [x] 2.2 Implement safe default behaviour that skips existing `AGENTS.md` files unless explicit overwrite mode is requested.
- [x] 2.3 Implement `--force` overwrite mode that replaces existing managed files predictably.

## 3. Validation and error handling

- [x] 3.1 Add required-section validation for generated markdown and fail fast when mandatory headings are missing.
- [x] 3.2 Add clear error messaging for invalid target paths (including targets outside repository boundaries).
- [x] 3.3 Add logging/reporting of generated, skipped, and failed targets for operator visibility.

## 4. Verification and documentation

- [x] 4.1 Add tests (or equivalent assertions) for deterministic output, canonical section ordering, config-plus-CLI target merging, overwrite behaviour, and validation failures.
- [x] 4.2 Update documentation with generation usage, config file schema, CLI target flags, merge semantics, and overwrite behaviour.
- [x] 4.3 Run project quality gates (`yarn lint` and `yarn build`) and fix any issues introduced by the change.
