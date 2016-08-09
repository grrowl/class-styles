/* global describe, it */

var assert = require('assert');
var classStyles = require('../index');

var baseStyles = {
	inner: {
		padding: '10px',
		backgroundColor: 'red'
	},
	outer: {
		padding: '5px'
	}
}
var otherStyles = {
	inner: {
		backgroundColor: 'yellow'
	},
	outer: {}
}

var classStylesBound = classStyles.bind([ baseStyles, otherStyles ]);

describe('classStyles', function () {
	it('folds style by single key', function () {
		assert.deepStrictEqual(
			classStylesBound('inner'),
			{
				padding: '10px',
				backgroundColor: 'yellow'
			})
	})

	it('folds style by multiple keys', function () {
		assert.deepStrictEqual(
			classStylesBound('inner', 'outer'),
			{
				padding: '5px',
				backgroundColor: 'yellow'
			})
	})

	it('folds style by multiple keys in single string', function () {
		assert.deepStrictEqual(
			classStylesBound('inner outer'),
			{
				padding: '5px',
				backgroundColor: 'yellow'
			})
	})

	it('folds style by multiple keys with static style before', function () {
		assert.deepStrictEqual(
			classStylesBound({ color: 'blue' }, 'inner outer'),
			{
				color: 'blue',
				padding: '5px',
				backgroundColor: 'yellow'
			})
	})

	it('folds style by multiple keys with static style after', function () {
		assert.deepStrictEqual(
			classStylesBound('inner outer', { backgroundColor: 'blue' }),
			{
				padding: '5px',
				backgroundColor: 'blue'
			})
	})

	it('folds style by multiple keys without static style before (overridden)', function () {
		assert.deepStrictEqual(
			classStylesBound({ backgroundColor: 'blue' }, 'inner outer'),
			{
				padding: '5px',
				backgroundColor: 'yellow'
			})
	})

	it('supports an array of class names', function () {
		assert.deepStrictEqual(
			classStylesBound(['inner', 'outer']),
			{
				padding: '5px',
				backgroundColor: 'yellow'
			});
	});
});
