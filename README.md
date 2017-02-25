# Base64.js

[![CDNJS](https://img.shields.io/cdnjs/v/Base64.svg)](https://cdnjs.com/libraries/Base64)

≈ 500 byte* polyfill for browsers which don't provide [`window.btoa`][1] and
[`window.atob`][2].

Base64.js stems from a [gist][3] by [yahiko][4].

### Running the test suite

    make setup
    make test

\* Minified and gzipped. Run `make bytes` to verify.


[1]: https://developer.mozilla.org/en/DOM/window.btoa
[2]: https://developer.mozilla.org/en/DOM/window.atob
[3]: https://gist.github.com/229984
[4]: https://github.com/yahiko
