/*!
  Copyright (c) 2016 Jed Watson, Tom McKenzie
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

/*

Usage notes:

```
const markupStyles = { container: { backgroundColor: 'white', margin: '10px' } },
	otherStyles = { container: { backgroundColor: 'red', color: 'white' }, outer: { margin: 10 } }

import classStyles from 'class-styles'
const cx = classStyles.bind([ markupStyles, otherStyles ])

cx('container outer')
// => { margin: '10px', backgroundColor: 'red', color: 'white' }
cx({ padding: 10 }, 'not-exist')
// => { padding: 10 }
```

All markup.container then other.container styles should be applied, then
markup.second and other.second.

*/

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classStyles () {
		var styles = [];

		if (!Array.isArray(this))
			throw new Error('classStyles must be bound to an array of style objects')

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				styles.push.apply(styles, arg.split(' '))
			} else if (Array.isArray(arg)) {
				styles.push(classStyles.apply(this, arg));
			} else if (argType === 'object') {
				// apply the style itself
				styles.push(arg)
			}
		}

		// styles is now an array of strings (for lookups) and objects (for folding)

		return styles.reduce(
			(result, style) => (typeof style === 'object'
				? Object.assign(result, style)
				: Object.assign(result,
						this.reduce((keyResult, boundStyle) => Object.assign(keyResult, boundStyle[style]), {})
					)
			), {})
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classStyles;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classStyles', consistent with npm package name
		define('classStyles', [], function () {
			return classStyles;
		});
	} else {
		window.classStyles = classStyles;
	}
}());
