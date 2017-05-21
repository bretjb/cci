/*
 * Implement a method to compress strings.
 */

const assert = require('assert');

const strCompression = strToCompress => {
    const strHash = {};
    var newStr = '';
    for (let i = 0; i < strToCompress.length; i++) {
        let char = strToCompress[i];
        if (strHash[char] == null) {
            strHash[char] = 1;
        } else {
            strHash[char] = strHash[char] + 1;
        }

        // build new string.
        if (strToCompress[i + 1] !== char) {
            newStr += `${char}${strHash[char]}`;
            strHash[char] = null;
        }
    }

    let returnStr = newStr.length > strToCompress.length
        ? strToCompress
        : newStr;

    return returnStr;
};


describe('test for one string compression', function() {
    it('should test for book example', function() {
        const str1 = 'aabcccccaaa';
        assert.ok(strCompression(str1) === 'a2b1c5a3');
    });

    it('should not compress if compression is longer than original', function() {
        const str1 = 'abc';
        assert.ok(strCompression(str1) === 'abc');
    });

    it('should compress a longer string', function() {
        const str1 = 'aaaaaaa';
        assert.ok(strCompression(str1) === 'a7');
    });
});