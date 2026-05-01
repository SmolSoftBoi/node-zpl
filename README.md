# ZPL

Build, tweak, and render individual labels.

[![Node-CI](https://github.com/SmolSoftBoi/node-zpl/actions/workflows/nodejs.yml/badge.svg?branch=master)](https://github.com/SmolSoftBoi/node-zpl/actions/workflows/nodejs.yml)
[![ESLint](https://github.com/SmolSoftBoi/node-zpl/actions/workflows/eslint.yml/badge.svg?branch=master)](https://github.com/SmolSoftBoi/node-zpl/actions/workflows/eslint.yml)
[![CodeQL](https://github.com/SmolSoftBoi/node-zpl/actions/workflows/codeql.yml/badge.svg?branch=master)](https://github.com/SmolSoftBoi/node-zpl/actions/workflows/codeql.yml)
[![npm version](https://img.shields.io/npm/v/%40epickris%2Fzpl)](https://www.npmjs.com/package/@epickris/zpl)

## Install

```bash
yarn add @epickris/zpl
```

## Supported Node.js Versions

- Minimum runtime support: `>=20` (declared in `package.json#engines.node`)
- Tested in CI: `20.x`, `22.x`, `24.x`

## Public Entry Points

Supported public entry points are:

- `@epickris/zpl`
- `@epickris/zpl/commands`

Legacy compatibility is maintained for `@epickris/zpl/dist/commands`, but new integrations should use `@epickris/zpl/commands`.

## Usage (ESM)

```ts
import ZplModule from '@epickris/zpl';
import ZplCommands from '@epickris/zpl/commands';

const Zpl = ZplModule.default;

const zpl = new Zpl();
zpl.addZpl([
  ZplCommands.comment('Top section with logo, name and address.'),
  ZplCommands.changeAlphanumericDefaultFont(0, 60),
  ZplCommands.fieldOrigin(50, 50),
  ZplCommands.graphicBox(100, 100, 100),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.fieldOrigin(75, 75),
  ZplCommands.FIELD_REVERSE_PRINT,
  ZplCommands.graphicBox(100, 100, 100),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.fieldOrigin(93, 93),
  ZplCommands.graphicBox(40, 40, 40),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.changeAlphanumericDefaultFont(0, 30),
  ZplCommands.fieldOrigin(220, 115),
  ZplCommands.fieldData('1000 Shipping Lane'),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.fieldOrigin(220.155),
  ZplCommands.fieldData('Shelbyville TN 38102'),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.fieldOrigin(220, 195),
  ZplCommands.fieldData('United States (USA)'),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.fieldOrigin(50, 250),
  ZplCommands.graphicBox(700, 1, 3),
  ZplCommands.FIELD_SEPARATOR,

  ZplCommands.comment('Second section with recipient address and permit information.'),
  ZplCommands.changeAlphanumericDefaultFont('A', 30),
  ZplCommands.fieldOrigin(50, 300),
  ZplCommands.fieldData('John Doe'),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.fieldOrigin(50, 380),
  ZplCommands.fieldData('100 Main Street'),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.fieldOrigin(50, 380),
  ZplCommands.fieldData('Springfield TN 39021'),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.fieldOrigin(50, 420),
  ZplCommands.fieldData('United States (USA)'),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.changeAlphanumericDefaultFont('A', 15),
  ZplCommands.fieldOrigin(600, 300),
  ZplCommands.graphicBox(150, 150, 3),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.fieldOrigin(638, 340),
  ZplCommands.fieldData('Permit'),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.fieldOrigin(638, 390),
  ZplCommands.fieldData('123456'),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.fieldOrigin(50, 500),
  ZplCommands.graphicBox(700, 1, 3),
  ZplCommands.FIELD_SEPARATOR,

  ZplCommands.comment('Third section with barcode.'),
  ZplCommands.barCodeFieldDefault(5, 2, 270),
  ZplCommands.fieldOrigin(100, 550),
  ZplCommands.code128BarCode(),
  ZplCommands.fieldData('12345678'),
  ZplCommands.FIELD_SEPARATOR,

  ZplCommands.comment('Fourth section (the two boxes on the bottom).'),
  ZplCommands.fieldOrigin(50, 900),
  ZplCommands.graphicBox(700, 250, 3),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.fieldOrigin(400, 900),
  ZplCommands.graphicBox(1, 250, 3),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.changeAlphanumericDefaultFont(0, 40),
  ZplCommands.fieldOrigin(100, 960),
  ZplCommands.fieldData('Ctr. X34B-1'),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.fieldOrigin(100, 1010),
  ZplCommands.fieldData('REF1 F00B47'),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.fieldOrigin(100, 1060),
  ZplCommands.fieldData('REF2 BL4H8'),
  ZplCommands.FIELD_SEPARATOR,
  ZplCommands.changeAlphanumericDefaultFont(0, 190),
  ZplCommands.fieldOrigin(470, 955),
  ZplCommands.fieldData('CA'),
  ZplCommands.FIELD_SEPARATOR
]);

console.log(zpl.getZpl());
```

## Usage (CJS)

```js
const Zpl = require('@epickris/zpl').default;
const ZplCommands = require('@epickris/zpl/commands');

const zpl = new Zpl();
zpl.addZpl([
  ZplCommands.comment('Simple label'),
  ZplCommands.fieldOrigin(50, 50),
  ZplCommands.fieldData('Hello from ZPL'),
  ZplCommands.FIELD_SEPARATOR
]);

console.log(zpl.getZpl());
```

## Release Policy

This repository follows Semantic Versioning:

- `MAJOR`: backwards-incompatible API, CLI, or packaging contract changes.
- `MINOR`: backwards-compatible feature additions.
- `PATCH`: backwards-compatible bug fixes and maintenance changes.

For full release rules and the release checklist, see [`docs/RELEASING.md`](docs/RELEASING.md).

## Changelog

Release history is tracked in [`CHANGELOG.md`](CHANGELOG.md).
