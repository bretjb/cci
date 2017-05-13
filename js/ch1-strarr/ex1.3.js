/*
 * Write a method to replace all spaces in a string with '%20'. You may assume that the
 * string has sufficient space at the end to hold all the additional characters, and that
 * you are given the 'true' length of the string.
 * 
 * e.g.,
 * 'Mr John Smith     ', 13
 * 'Mr%20John%20Smith'
 */

const assert = require('assert');

// naive and O(n).
// Note: there'd be a problem with unicode whitespace since we're only
// checking for ' '. See below for a fix.
function urlify(str, len) {
    var strToUrlify = str.substr(0, len);
    for (let i = 0; i < strToUrlify.length; i++) {
        if (strToUrlify[i] === ' ') {
            strToUrlify = strToUrlify.substr(0, i) + '%20' + strToUrlify.substr(i + 1, strToUrlify.length);
        }
    }
    return strToUrlify;
}

const unicodeWhiteSpaceChars = ['\u0020', '\u00A0', '\u1680', '\u180E', '\u2000', 
    '\u2001', '\u2002', '\u2003', '\u2004', '\u2005', '\u2006', '\u2007', '\u2008', 
    '\u2009', '\u200A', '\u200B', '\u202F', '\u205F', '\u3000', '\uFEFF'];

// O(a + b)
function urlifyUnicode(str, len) {
    var strToUrlify = str.substr(0, len);
    for (let i = 0; i < strToUrlify.length; i++) {
        const potentialWhiteSpaceChar = strToUrlify[i];
        var isWhiteSpace = false;
        for (let whiteSpaceChar of unicodeWhiteSpaceChars) {
            if (potentialWhiteSpaceChar === whiteSpaceChar) {
                isWhiteSpace = true;
                break;
            }
        }
        if (isWhiteSpace === true) {
            strToUrlify = strToUrlify.substr(0, i) + '%20' + strToUrlify.substr(i + 1, strToUrlify.length);
        }
    }
    return strToUrlify;
}

// why not let the stdlib do it?
function urlifyByStdLib(str, len) {
    return str
        .substr(0, len)
        .replace(/\s/gi, '%20');
}

// functional!
// O(n) -- maybe. Depends on how split and join work. Either way, this is just showing
// off. I'd use the stdlib.
function urlifyFunctionally(str, len) {
    return str
        .substr(0, len)
        .split('')
        .map(char => char === ' ' ? '%20' : char)
        .join('');
}

describe('urlify tests', function() {
    describe('naive solution tests', function() {
        it('should work on the example', function() {
            const strToConvert = 'Mr John Smith     ';
            const actualString = urlify(strToConvert, 13);
            assert.ok(actualString === 'Mr%20John%20Smith');
        });

        it('should work on strings without spaces', function() {
            const strToConvert = 'NopeNopeNope';
            const actualString = urlify(strToConvert, 12);
            assert.ok(actualString === 'NopeNopeNope');
        });

        it('should trim to length', function() {
            const strToConvert = 'NopeNopeNope';
            const actualString = urlify(strToConvert, 2);
            assert.ok(actualString === 'No');
        });

        it('should convert multiple spaces to %20', function() {
            const strToConvert = '       hey!';
            const actualString = urlify(strToConvert, 11);
            assert.ok(actualString === '%20%20%20%20%20%20%20hey!');
        });
    });

    describe('naive unicode tests', function() {
        it('should work on the example', function() {
            const strToConvert = 'Mr John Smith     ';
            const actualString = urlify(strToConvert, 13);
            assert.ok(actualString === 'Mr%20John%20Smith');
        });

        it('should work on strings without spaces', function() {
            const strToConvert = 'NopeNopeNope';
            const actualString = urlify(strToConvert, 12);
            assert.ok(actualString === 'NopeNopeNope');
        });

        it('should trim to length', function() {
            const strToConvert = 'NopeNopeNope';
            const actualString = urlify(strToConvert, 2);
            assert.ok(actualString === 'No');
        });

        it('should convert multiple spaces to %20', function() {
            const strToConvert = '       hey!';
            const actualString = urlify(strToConvert, 11);
            assert.ok(actualString === '%20%20%20%20%20%20%20hey!');
        });

        it('should convert unicode spaces to %20', function() {
            const strToConvert = 'ᠪᠢ ᠰᠢᠯᠢ ᠢᠳᠡᠶᠦ ᠴᠢᠳᠠᠨᠠ ᠂ ᠨᠠᠳᠤᠷ ᠬᠣᠤᠷᠠᠳᠠᠢ ᠪᠢᠰᠢ';
            const actualString = urlify(strToConvert, 41);
            assert.ok(actualString === 'ᠪᠢ%20ᠰᠢᠯᠢ%20ᠢᠳᠡᠶᠦ%20ᠴᠢᠳᠠᠨᠠ%20᠂%20ᠨᠠᠳᠤᠷ%20ᠬᠣᠤᠷᠠᠳᠠᠢ%20ᠪᠢᠰ');
        });
    });

    describe('stdlib solution tests', function() {
        it('should work on the example', function() {
            const strToConvert = 'Mr John Smith     ';
            const actualString = urlifyByStdLib(strToConvert, 13);
            assert.ok(actualString === 'Mr%20John%20Smith');
        });

        it('should work on strings without spaces', function() {
            const strToConvert = 'NopeNopeNope';
            const actualString = urlifyByStdLib(strToConvert, 12);
            assert.ok(actualString === 'NopeNopeNope');
        });

        it('should trim to length', function() {
            const strToConvert = 'NopeNopeNope';
            const actualString = urlifyByStdLib(strToConvert, 2);
            assert.ok(actualString === 'No');
        });

        it('should convert multiple spaces to %20', function() {
            const strToConvert = '       hey!';
            const actualString = urlifyByStdLib(strToConvert, 11);
            assert.ok(actualString === '%20%20%20%20%20%20%20hey!');
        });
    });

    describe('functional solution tests', function() {
        it('should work on the example', function() {
            const strToConvert = 'Mr John Smith     ';
            const actualString = urlifyFunctionally(strToConvert, 13);
            assert.ok(actualString === 'Mr%20John%20Smith');
        });

        it('should work on strings without spaces', function() {
            const strToConvert = 'NopeNopeNope';
            const actualString = urlifyFunctionally(strToConvert, 12);
            assert.ok(actualString === 'NopeNopeNope');
        });

        it('should trim to length', function() {
            const strToConvert = 'NopeNopeNope';
            const actualString = urlifyFunctionally(strToConvert, 2);
            assert.ok(actualString === 'No');
        });

        it('should convert multiple spaces to %20', function() {
            const strToConvert = '       hey!';
            const actualString = urlifyFunctionally(strToConvert, 11);
            assert.ok(actualString === '%20%20%20%20%20%20%20hey!');
        });
    });
});