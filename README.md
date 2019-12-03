Utilities for implementing feature toggles in JavaScript. Supports feature namespacing.

## Install

```bash
npm i @danroshko/feature-toggle
```

## Usage

Specify which features are enabled or disabled (but not both), and then check if some feature is enabled or disabled:

```js
const Toggle = require('@danroshko/feature-toggle')

// in that case all unspecified features will be considered disabled
const toggle1 = new Toggle({ enabledFeatures: ['a', 'b'] })

// reverse, all features are considered enabled by default
const toggle2 = new Toggle({ disabledFeatures: ['c', 'd'] })

toggle1.isEnabled('a') // true
toggle1.isEnabled('foo') // false
toggle1.isDisabled('foo') // true

toggle2.isEnabled('c') // false
toggle2.isEnabled('foo') // true

toggle1.enable('x')
toggle1.disable('a')
```

Namespacing can be achieved by using `:` symbol in feature names, e.g. if feature `a` is enabled, then all features in the form `a:something` will also be enabled.
