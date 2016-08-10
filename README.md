`classStyles`
===========

[![Version](http://img.shields.io/npm/v/class-styles.svg)](https://www.npmjs.org/package/class-styles)

Forked version of [classnames](https://github.com/JedWatson/classnames) to
support inline styles generated from a group of objects and "class" names
(really just root-level keys on the objects)

## Rules

* classStyles can be bound to an object or an array of objects. These objects
  should have a `{ key: styleObject, otherKey: otherStyle }` structure.
* Arguments are applied from left to right, overwriting defined styles as they
  are applied.
* String arguments are split by space (`" "`) and are applied in turn.
* Object arguments are applied as raw style objects.
* Arrays are recursed into, applying these rules to Strings, Objects and Arrays
  as they're encountered.

## Usage

```js
import classStyles from 'class-styles'

// Define style objects
const markupStyles = { container: { backgroundColor: 'white', margin: '0px auto' } },
  otherStyles = { container: { color: 'red' }, outer: { margin: '10px' } }

// Bind style objects to classStyles. Can be either an object, or an array of objects.
const cx = classStyles.bind([ markupStyles, otherStyles ])

cx('container outer')
// => { margin: '10px', backgroundColor: 'white', color: 'red' }

cx('container', { paddingBottom: '5px' })
// => { backgroundColor: 'white', margin: '0px auto', paddingBottom: '5px' }

cx({ padding: '10px' }, 'not-exist')
// => { padding: '10px' }

// or, without using .bind
classStyles.call([ markupStyles, otherStyles ], 'outer')
// => { margin: '10px' }

```

## Installation

```sh
npm install class-styles --save
```

Alternatively, you can simply include `index.js` on your page with a standalone
`<script>` tag and it will export a global `classStyles` method, or define the
module if you are using RequireJS.

---

`class-styles` follows the [SemVer](http://semver.org/) standard for versioning.

There is also a [Changelog](https://github.com/grrowl/class-styles/blob/master/HISTORY.md).


## Polyfills needed to support older browsers

#### `classNames >=2.0.0`

`Array.isArray`: see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) for details about unsupported older browsers (e.g. <= IE8) and a simple polyfill.

## License

[MIT](LICENSE). Copyright (c) 2016 Jed Watson, Tom McKenzie.
