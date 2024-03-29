'use strict';

var assert = require ('assert');

var base64 = require ('..');


var btoa = base64.btoa;
var atob = base64.atob;


describe ('Base64.js', function() {

  it ('can encode ASCII input', function() {
    assert.strictEqual (btoa (''), '');
    assert.strictEqual (btoa ('f'), 'Zg==');
    assert.strictEqual (btoa ('fo'), 'Zm8=');
    assert.strictEqual (btoa ('foo'), 'Zm9v');
    assert.strictEqual (btoa ('quux'), 'cXV1eA==');
    assert.strictEqual (btoa ('!"#$%'), 'ISIjJCU=');
    assert.strictEqual (btoa ("&'()*+"), 'JicoKSor');
    assert.strictEqual (btoa (',-./012'), 'LC0uLzAxMg==');
    assert.strictEqual (btoa ('3456789:'), 'MzQ1Njc4OTo=');
    assert.strictEqual (btoa (';<=>?@ABC'), 'Ozw9Pj9AQUJD');
    assert.strictEqual (btoa ('DEFGHIJKLM'), 'REVGR0hJSktMTQ==');
    assert.strictEqual (btoa ('NOPQRSTUVWX'), 'Tk9QUVJTVFVWV1g=');
    assert.strictEqual (btoa ('YZ[\\]^_`abc'), 'WVpbXF1eX2BhYmM=');
    assert.strictEqual (btoa ('defghijklmnop'), 'ZGVmZ2hpamtsbW5vcA==');
    assert.strictEqual (btoa ('qrstuvwxyz{|}~'), 'cXJzdHV2d3h5ent8fX4=');
  });

  it ('cannot encode characters beyond U+00FF', function() {
    assert.strictEqual (String.fromCharCode (0x2708), '✈');
    assert.throws (
      function() { btoa ('✈'); },
      function(err) {
        return err instanceof Error &&
               err.name === 'InvalidCharacterError' &&
               err.message === ("'btoa' failed: " +
                                'The string to be encoded contains ' +
                                'characters outside of the Latin1 range.');
      }
    );
  });

  it ('coerces input', function() {
    assert.strictEqual (btoa (42), btoa ('42'));
    assert.strictEqual (btoa (null), btoa ('null'));
    assert.strictEqual (btoa ({x: 1}), btoa ('[object Object]'));
  });

  it ('can decode Base64-encoded input', function() {
    assert.strictEqual (atob (''), '');
    assert.strictEqual (atob ('Zg=='), 'f');
    assert.strictEqual (atob ('Zm8='), 'fo');
    assert.strictEqual (atob ('Zm9v'), 'foo');
    assert.strictEqual (atob ('cXV1eA=='), 'quux');
    assert.strictEqual (atob ('ISIjJCU='), '!"#$%');
    assert.strictEqual (atob ('JicoKSor'), "&'()*+");
    assert.strictEqual (atob ('LC0uLzAxMg=='), ',-./012');
    assert.strictEqual (atob ('MzQ1Njc4OTo='), '3456789:');
    assert.strictEqual (atob ('Ozw9Pj9AQUJD'), ';<=>?@ABC');
    assert.strictEqual (atob ('REVGR0hJSktMTQ=='), 'DEFGHIJKLM');
    assert.strictEqual (atob ('Tk9QUVJTVFVWV1g='), 'NOPQRSTUVWX');
    assert.strictEqual (atob ('WVpbXF1eX2BhYmM='), 'YZ[\\]^_`abc');
    assert.strictEqual (atob ('ZGVmZ2hpamtsbW5vcA=='), 'defghijklmnop');
    assert.strictEqual (atob ('cXJzdHV2d3h5ent8fX4='), 'qrstuvwxyz{|}~');
  });

  it ('cannot decode invalid input', function() {
    assert.throws (
      function() { atob ('a'); },
      function(err) {
        return err instanceof Error &&
               err.name === 'InvalidCharacterError' &&
               err.message === ("'atob' failed: The string to be " +
                                'decoded is not correctly encoded.');
      }
    );
  });

  it ('coerces input', function() {
    assert.strictEqual (atob (42), atob ('42'));
    assert.strictEqual (atob (null), atob ('null'));
  });

  it ('can encode every character in [U+0000, U+00FF]', function() {
    for (var code = 0x0; code <= 0xFF; code += 0x1) {
      var char = String.fromCharCode (code);
      assert.strictEqual (atob (btoa (char)), char);
    }
  });

});
