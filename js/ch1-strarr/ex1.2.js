/*
 * 1. Given two strings, write a method to decide if one is a permutation of the other.
 */

const assert = require('assert');

// O(a + b)
function isPermutation(str1, str2) {
    var isAPermutation = true;
    if (str1.length !== str2.length) {
        isAPermutation = false;
    } else if (str1 !== str2) {
        var str1Hash = {};
        for (let i of str1) {
            str1Hash[i] = '';
        }

        for (let j of str2) {
            if (str1Hash[j] === undefined) {
                isAPermutation = false;
                break;
            }
        }
    }
    return isAPermutation;
}

describe('test for permutations', function() {
    it('should return true for identical strings', function() {
        assert.ok(isPermutation('abc', 'abc') === true);
    });

    it('should return true for good permutation', function() {
        assert.ok(isPermutation('abc', 'cba') === true);
    });

    it('should return false for bad permutation', function() {
        assert.ok(isPermutation('abc', 'def') === false);
    });

    it('should return false for differing lengths', function() {
        assert.ok(isPermutation('abcdef', 'def') === false);
    });
});