/*
 * 1. Implement an algorithm to determine if a string has all unique characters. 
 * 2. What if you cannot use any additional data structures?
 */

const assert = require('assert');

// O(n)
function isUniqueWithObj(uniqueString) {
	var hasUnique = true;
	
	if (uniqueString.length > 1) {
		var strHash = {};
		for (let i = 0; i < uniqueString.length; i++) {
			const char = uniqueString[i];
			if (strHash[char] !== undefined) {
				hasUnique = false;
				break;
			}
			strHash[char] = '';
		}
	}
	return hasUnique;
}

// O(n^2)
function isUniqueWithStr(uniqueString) {
	var hasUnique = true;
	if (uniqueString.length > 1) {
		for (let i = 0; i < uniqueString.length; i++) {
			for (let p = 0; p < uniqueString.length; p++) {
				if (i === p) {
					break;
				} else if (uniqueString[i] === uniqueString[p]) {
					hasUnique = false;
					break;
				}
			}
		}
	}	

	return hasUnique;
}



/// TESTS
describe('Unique String Tests', function() {
	describe('Unique tests with arrays', function() {
		it('should return true when the string has just one char', function() {
			const onechar = isUniqueWithObj('a');
			assert.ok(onechar === true);
		});

		it('should return true when there are unique chars', function() {
			const uniqueString = isUniqueWithObj('bret');
			assert.ok(uniqueString === true);
		});

		it('should return false when there are non-unique chars', function() {
			const uniqueString = isUniqueWithObj('bbbb');
			assert.ok(uniqueString === false);
		});

	});
	
	describe('Unique tests with just strings', function() {
		it('should return true when there are unique chars', function() {
			const uniqueString = isUniqueWithStr('bret');
			assert.ok(uniqueString === true);
		});

		it('should return false when there are non-unique chars', function() {
			const uniqueString = isUniqueWithStr('bbbb');
			assert.ok(uniqueString === false);
		});
	
	});
});