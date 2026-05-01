# codex-agents-generation Specification

## Purpose
TBD - created by archiving change generate-codex-agents-files. Update Purpose after archive.
## Requirements
### Requirement: Deterministic agent file generation
The system SHALL generate `AGENTS.md` files from a canonical in-repo template with deterministic section ordering and content for the same inputs.

#### Scenario: Generate repository root agent file
- **WHEN** a contributor runs the agent-generation command with default settings
- **THEN** the system writes a repository-root `AGENTS.md` file using the canonical template

#### Scenario: Re-run generation without input changes
- **WHEN** a contributor runs the same generation command again with unchanged inputs
- **THEN** the generated output is byte-for-byte identical to the previous output

#### Scenario: Canonical section order across targets
- **WHEN** generation writes both repository-root and nested target files
- **THEN** every generated file contains required headings in the same canonical section order

### Requirement: Configurable generation targets
The system SHALL support generating `AGENTS.md` in a defined set of target paths, including repository root and optional additional nested directories sourced from both a config file and CLI flags.

#### Scenario: Generate nested targets from config file
- **WHEN** the config file defines one or more nested target directories
- **THEN** generation includes those configured directories in addition to repository root

#### Scenario: Add nested targets via CLI flags
- **WHEN** generation is invoked with one or more nested target CLI flags
- **THEN** generation includes those flag-provided directories in addition to repository root

#### Scenario: Merge config and CLI targets deterministically
- **WHEN** both config targets and CLI targets are provided
- **THEN** the system normalises and de-duplicates the combined target list with deterministic ordering

#### Scenario: Invalid target path handling
- **WHEN** generation includes a path outside the repository workspace
- **THEN** the system refuses that target and reports a clear error message

### Requirement: Safe overwrite behaviour
The system SHALL protect existing `AGENTS.md` files from replacement by default and SHALL only replace them when explicit overwrite intent is provided.

#### Scenario: Existing file without force flag
- **WHEN** a target `AGENTS.md` already exists and generation runs without overwrite mode
- **THEN** the system leaves the existing file unchanged and reports that it was skipped

#### Scenario: Existing file with force flag
- **WHEN** a target `AGENTS.md` already exists and generation runs with explicit overwrite mode
- **THEN** the system replaces the existing file with regenerated content

### Requirement: Required-section validation
The system SHALL validate generated content includes mandatory sections before reporting successful completion.

#### Scenario: Missing required heading in template output
- **WHEN** generated content omits one or more required headings
- **THEN** the system fails the command and reports which required section is missing

#### Scenario: Valid generated output
- **WHEN** generated content includes all required sections
- **THEN** the system reports successful generation for each completed target

