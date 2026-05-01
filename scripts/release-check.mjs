#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';

function fail(message) {
    console.error(`release-check: ${message}`);
    process.exit(1);
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const packageJsonPath = resolve(process.cwd(), 'package.json');
const changelogPath = resolve(process.cwd(), 'CHANGELOG.md');
const releaseGuidePath = resolve(process.cwd(), 'docs/RELEASING.md');

let packageJson;
try {
    packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
} catch (error) {
    fail(`failed to read package.json (${error instanceof Error ? error.message : String(error)})`);
}

const version = packageJson.version;
if (typeof version !== 'string' || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z-.]+)?(?:\+[0-9A-Za-z-.]+)?$/.test(version)) {
    fail(`package.json version "${String(version)}" is not a valid semantic version`);
}

let changelog;
try {
    changelog = readFileSync(changelogPath, 'utf8');
} catch (error) {
    fail(`failed to read CHANGELOG.md (${error instanceof Error ? error.message : String(error)})`);
}

if (!/^##\s+\[?Unreleased\]?/m.test(changelog)) {
    fail('CHANGELOG.md must include an "Unreleased" section');
}

const versionHeading = new RegExp(`^##\\s+\\[?${escapeRegExp(version)}\\]?\\s*(?:-|$)`, 'm');
if (!versionHeading.test(changelog)) {
    fail(`CHANGELOG.md must include a section for version ${version}`);
}

let releaseGuide;
try {
    releaseGuide = readFileSync(releaseGuidePath, 'utf8');
} catch (error) {
    fail(`failed to read docs/RELEASING.md (${error instanceof Error ? error.message : String(error)})`);
}

if (!/^##\s+Semantic Versioning Policy/m.test(releaseGuide)) {
    fail('docs/RELEASING.md must include a "Semantic Versioning Policy" section');
}

if (!/^##\s+Release Checklist/m.test(releaseGuide)) {
    fail('docs/RELEASING.md must include a "Release Checklist" section');
}

console.log(`release-check: passed for version ${version}`);
