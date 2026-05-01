## ADDED Requirements

### Requirement: Semantic versioning policy SHALL be explicit
The project SHALL define and publish a semantic versioning policy that maps change types to version increments for all npm releases.

#### Scenario: Breaking change classification
- **WHEN** a release includes a backwards-incompatible API, CLI, or packaging contract change
- **THEN** the documented release policy classifies the release as a MAJOR version increment

#### Scenario: Backwards-compatible change classification
- **WHEN** a release includes additive backwards-compatible features or bug fixes only
- **THEN** the documented release policy classifies the release as a MINOR or PATCH increment according to SemVer rules

### Requirement: Changelog SHALL track published versions
The project SHALL maintain a committed `CHANGELOG.md` where each published package version has a corresponding entry describing user-visible changes.

#### Scenario: Release version has changelog entry
- **WHEN** a package version is prepared for publish
- **THEN** `CHANGELOG.md` contains a section for that exact version identifier with user-visible change notes

#### Scenario: Published release references changelog content
- **WHEN** a GitHub/npm release is completed
- **THEN** the release notes align with the corresponding `CHANGELOG.md` version entry

### Requirement: README SHALL surface trust signals
The project README SHALL expose package trust signals including CI health and runtime support claims.

#### Scenario: CI badge visibility
- **WHEN** a user views the repository README
- **THEN** the README displays at least one CI workflow status badge linked to the active workflow run page

#### Scenario: Support claim visibility
- **WHEN** a user views installation or usage guidance
- **THEN** the README includes a clearly labelled supported Node.js version statement

### Requirement: Node.js support claims SHALL stay consistent
Declared Node.js support SHALL be consistent across package metadata, documentation, and CI test coverage.

#### Scenario: Engines, docs, and CI alignment
- **WHEN** supported Node.js majors are defined or updated
- **THEN** `package.json#engines.node`, README support text, and CI matrix are updated in the same change to represent the same support contract

#### Scenario: Minimum supported version is tested
- **WHEN** CI executes repository quality gates
- **THEN** at least one CI job runs on the minimum supported Node.js major declared in `engines.node`

### Requirement: Public module entry points SHALL be explicit for ESM and CJS consumers
The package SHALL document and expose supported public entry points so both ESM and CJS consumers can import the library without relying on undocumented internal paths.

#### Scenario: ESM usage guidance
- **WHEN** an ESM consumer reads usage documentation
- **THEN** documentation includes a valid `import` example for the primary package entry point and any documented command subpath

#### Scenario: CJS usage guidance
- **WHEN** a CJS consumer reads usage documentation
- **THEN** documentation includes a valid `require` example for the primary package entry point and any documented command subpath

#### Scenario: Internal path ambiguity is removed
- **WHEN** package entry points are documented
- **THEN** documentation does not instruct users to import from undocumented internal build paths such as `dist/*`
