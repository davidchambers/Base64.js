var Base64 = {
  characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  encode: function (string) {
    var
      a, b, b1, b2, b3, b4, c,
      characters = Base64.characters,
      i = 0,
      result = '';

    do {
      a = string.charCodeAt(i++);
      b = string.charCodeAt(i++);
      c = string.charCodeAt(i++);

      a = a ? a : 0;
      b = b ? b : 0;
      c = c ? c : 0;

      b1 = (a >> 2) & 0x3F;
      b2 = ((a & 0x3) << 4) | ((b >> 4) & 0xF);
      b3 = ((b & 0xF) << 2) | ((c >> 6) & 0x3);
      b4 = c & 0x3F;

      if (!b) {
        b3 = b4 = 64;
      } else if (!c) {
        b4 = 64;
      }

      result += Base64.characters.charAt(b1) + Base64.characters.charAt(b2) + Base64.characters.charAt(b3) + Base64.characters.charAt(b4);

    } while (i < string.length);

    return result;
  },

  decode: function (string) {
    var
      a, b, b1, b2, b3, b4, c,
      characters = Base64.characters,
      i = 0,
      result = '';

    do {
      b1 = Base64.characters.indexOf(string.charAt(i++));
      b2 = Base64.characters.indexOf(string.charAt(i++));
      b3 = Base64.characters.indexOf(string.charAt(i++));
      b4 = Base64.characters.indexOf(string.charAt(i++));

      a = ((b1 & 0x3F) << 2) | ((b2 >> 4) & 0x3);
      b = ((b2 & 0xF) << 4) | ((b3 >> 2) & 0xF);
      c = ((b3 & 0x3) << 6) | (b4 & 0x3F);

      result += String.fromCharCode(a) + (b?String.fromCharCode(b):'') + (c?String.fromCharCode(c):'');

    } while (i < string.length);

    return result;
  }
};
