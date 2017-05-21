/*
 * Given two strings, write a fn to check if they are one edit (or 0) edits away.
 */

const assert = require('assert');

function isOneAway(str1, str2) {
    var onlyOneAway = true;
    if (str1 !== str2) {
        let lengthDifference = str1.length - str2.length;
        if (lengthDifference > 1 || lengthDifference < -1) {
            onlyOneAway = false;
        } else {
            var hasEdited = false;
            var editedStr2 = str2;
            for (let i = 0; i < str1.length; i++) {
                let hasChanged = false;
                let areStrCharUndefined = str1[i] !== undefined && editedStr2[i] !== undefined;
                if (areStrCharUndefined && str1[i] !== editedStr2[i]) {
                    if (hasEdited === true) {
                        onlyOneAway = false;
                        break;
                    }
                    hasEdited = true;
                    if (i === 0) {
                        editedStr2 = `x${str2}`;
                    } else {
                        editedStr2 = str2.substr(0, i) + 'x' + str2.substr(i + 1, str2.length);
                    }
                }
            }
        }
    }
    return onlyOneAway;
}


describe('test for one edit away', function() {
    it('should return true for identical strings', function() {
        const str1 = 'bret';
        const str2 = 'bret';
        assert.ok(isOneAway(str1, str2) === true);
    });

    it('should return false for much longer strings', function() {
        const str1 = 'bret';
        const str2 = 'bret is cool';
        assert.ok(isOneAway(str1, str2) === false);
    });

    it('should return true when you have to add a char', function() {
        const str1 = 'bret';
        const str2 = 'brt';
        assert.ok(isOneAway(str1, str2) === true);
    });

    it('should return true when you have to add a char', function() {
        const str1 = 'bret';
        const str2 = 'ret';
        assert.ok(isOneAway(str1, str2) === true);
    });

    it('should return false when you have to add many chars', function() {
        const str1 = 'bt';
        const str2 = 'bret';
        assert.ok(isOneAway(str1, str2) === false);
    });

    it('should return true when you have to edit a char', function() {
        const str1 = 'beet';
        const str2 = 'bret';
        assert.ok(isOneAway(str1, str2) === true);
    });

    it('should return false when you have to edit many chars', function() {
        const str1 = 'beee';
        const str2 = 'bret';
        assert.ok(isOneAway(str1, str2) === false);
    });
    
    it('should return true when you have to remove a char', function() {
        const str1 = 'brets';
        const str2 = 'bret';
        assert.ok(isOneAway(str1, str2) === true);
    });

    it('should return false when you have to remove many chars', function() {
        const str1 = 'bretsssssssss';
        const str2 = 'bret';
        assert.ok(isOneAway(str1, str2) === false);
    });
});