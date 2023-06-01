# react-inspector-plus

[![npm version](https://img.shields.io/npm/v/react-inspector-plus.svg?style=flat-square)](https://www.npmjs.com/package/react-inspector-plus)
[![npm downloads](https://img.shields.io/npm/dm/react-inspector-plus.svg?style=flat-square)](https://www.npmjs.com/package/react-inspector-plus)

## [LIVE DEMO](https://codesandbox.io/s/infinite-variable-size-react-inspector-plus-list-advanced-lcvpg6)

## DISCLAIMER
This is a fork of [react-inspector](https://github.com/storybookjs/react-inspector/). It builds upon on version 5.1.1. It adds the following features:

- Uses `emotion` for CSS handling.
- Fixes `isNode` error in Next.js.
- Adds resizable table columns.
- New Searchable Object Inspector allows searching for values within objects.
- Most API is now exposed, including useStyles.
- Now the expandedPaths state can be controlled.
- `ObjectName` and `ObjectValue` support a custom `propertyValueFormatter`.

If you have no need for these features, please keep using the authors' version.

## Install

NPM:

```sh
npm install @emotion/react react-resizable react-inspector
```

Recommended versions:
- version `6.0.0`: If you are using React 17.0.0 or later.
- Go to original repository for more details.

## Getting started
Please visit the original [repo](https://github.com/storybookjs/react-inspector/).

**Note:** More verbose details on how to use some of these features will be provided, meanwhile, you can explore the [`stories/` folder](https://github.com/luminaxster/react-inspector/tree/master/stories/).

## Additional

- Why Emotion CSS and not inline style? 

  Emotion CSS overcomes the limitations explained in [this document](https://github.com/erikras/react-redux-universal-hot-example/blob/master/docs/InlineStyles.md).
