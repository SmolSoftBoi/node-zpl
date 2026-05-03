## 1. Release policy and changelog baseline

- [x] 1.1 Add a documented semantic versioning policy section (including MAJOR/MINOR/PATCH rules) to project documentation.
- [x] 1.2 Create `CHANGELOG.md` with an initial baseline and define the required per-release entry format.
- [x] 1.3 Update release workflow documentation/checklist so publish steps require version-to-changelog alignment.

## 2. Package metadata and entry-point contract

- [x] 2.1 Update `package.json` metadata to reflect explicit public entry points and keep current documented consumption paths backward-compatible.
- [x] 2.2 Define and document supported import patterns for both ESM (`import`) and CJS (`require`) consumers.
- [x] 2.3 Remove or replace documentation examples that rely on undocumented internal `dist/*` import paths.

## 3. Trust signals and support matrix alignment

- [x] 3.1 Add README trust signal badges (CI status at minimum) with stable links to active workflows.
- [x] 3.2 Add a clear supported Node.js versions section in README.
- [x] 3.3 Align Node.js support claims across README, `package.json#engines.node`, and CI workflow matrix in a single change.

## 4. Verification

- [x] 4.1 Run `yarn lint` and `yarn build` to confirm packaging/docs changes do not introduce regressions.
- [x] 4.2 Validate README examples for both ESM and CJS usage against actual package entry points.
- [x] 4.3 Confirm changelog, release policy text, and release metadata are consistent for the next publish.
