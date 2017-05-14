/*
 * Given a string, write a function to check if it is a permutation of a palindrome. 
 * e.g., Tact Coa -> 'taco cat'
 */

const assert = require('assert');

function palindromeTest (palindromeStr) {
    var palindromeHash = {};
    palindromeStr = palindromeStr.replace(/\s/gi, '');
    for (let i = 0; i < palindromeStr.length; i++) {
        let strChar = palindromeStr[i];
        if (palindromeHash[strChar] === undefined) {
            palindromeHash[strChar] = 1;
        } else {
            palindromeHash[strChar] = palindromeHash[strChar] + 1;
        }
    }
    var isPalindrome = true;
    var isOdd = false;
    for (let key of Object.keys(palindromeHash)) {
        if (palindromeHash[key] % 2 !== 0) {
            if (isOdd === false) {
                isOdd = true;
            } else {
                isPalindrome = false;
                break;
            }
        }
    }
    return isPalindrome;
}

describe('palindrome tests', function() {
    it('should return true for actual palindromes', function() {
        var goodPalindrome = 'tact coa';
        assert.ok(palindromeTest(goodPalindrome) === true);
    });

    it('should return false for non-palindromes', function() {
        var badPalindrome = 'zarf narf';
        assert.ok(palindromeTest(badPalindrome) === false);
    });
});

