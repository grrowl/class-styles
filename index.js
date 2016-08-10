/*!
  Copyright (c) 2016 Jed Watson, Tom McKenzie
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var objectAssign = require('object-assign')
	var hasOwn = {}.hasOwnProperty;

	function classStyles () {
		var styles = [],
			stylesArray = Array.isArray(this) ? this : [this]

		if ((typeof window !== 'undefined' && this === window)
			|| (typeof global !== 'undefined' && this === global)) {
			throw new Error('classStyles must be bound to an object, or an array of objects')
		}

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

		// styles is now an array of strings (for lookups then folding) and objects
		// (for folding)

		return styles.reduce(
			(result, style) => (typeof style === 'object'
				? objectAssign(result, style)
				: objectAssign(result,
						stylesArray.reduce((keyResult, boundStyle) => objectAssign(keyResult, boundStyle[style]), {})
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
