(function (global) {
  "use strict";

  var a64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  var a256 = "";
  var r64 = [];
  var i = -1;
  while (++i < 256) {
    a256 += String.fromCharCode(i);
  }
  var counter = 63;
  i = -1;
  while (counter >= 0) {
    var c = String.fromCharCode(++i);
    r64[i] = a64.indexOf(c);
    if (r64[i] !== -1) {
      --counter;
    }
  }

  function code(s, discard, alpha, beta, w1, w2) {
    var buffer = 0;
    var i = -1;
    var length = s.length;
    var result = '';
    var bitsInBuffer = 0;
    while (++i < length) {
      var c = s.charCodeAt(i);
      c = (alpha === null ? (c < 256 ? c : -1) : (c < alpha.length ? alpha[c] : -1));
      if (c === -1) {
        throw new RangeError();
      }
      buffer = (buffer << w1) + c;
      bitsInBuffer += w1;
      while (bitsInBuffer >= w2) {
        bitsInBuffer -= w2;
        var tmp = buffer >> bitsInBuffer;
        result += beta.charAt(tmp);
        buffer ^= tmp << bitsInBuffer;
      }
    }
    if (!discard && bitsInBuffer > 0) {
      result += beta.charAt(buffer << (w2 - bitsInBuffer));
    }
    return result;
  }

  global.btoa = function (s) {
    s = String(s);
    s = code(s, false, null, a64, 8, 6);
    return s + "====".slice((s.length % 4) || 4);
  };

  global.atob = function (s) {
    s = String(s);
    var length = s.length;
    var k = -1;
    var result = "";
    var i = 0;
    while (++k < length + 1) {
      if (k === length || s.charAt(k) === "=") {
        var p = s.slice(i, k);
        i = k + 1;
        if (p.length % 4 === 1) {
          throw new RangeError();
        }
        result += code(p, true, r64, a256, 6, 8);
      }
    }
    return result;
  };

}(this));
