{btoa, atob} = require '../base64'

describe 'Base64.js', ->

  it 'can encode ASCII input', ->
    btoa('').should_be('')
    btoa('f').should_be('Zg==')
    btoa('fo').should_be('Zm8=')
    btoa('foo').should_be('Zm9v')
    btoa('quux').should_be('cXV1eA==')
    btoa('!"#$%').should_be('ISIjJCU=')
    btoa("&'()*+").should_be('JicoKSor')
    btoa(',-./012').should_be('LC0uLzAxMg==')
    btoa('3456789:').should_be('MzQ1Njc4OTo=')
    btoa(';<=>?@ABC').should_be('Ozw9Pj9AQUJD')
    btoa('DEFGHIJKLM').should_be('REVGR0hJSktMTQ==')
    btoa('NOPQRSTUVWX').should_be('Tk9QUVJTVFVWV1g=')
    btoa('YZ[\\]^_`abc').should_be('WVpbXF1eX2BhYmM=')
    btoa('defghijklmnop').should_be('ZGVmZ2hpamtsbW5vcA==')
    btoa('qrstuvwxyz{|}~').should_be('cXJzdHV2d3h5ent8fX4=')

  it 'cannot encode non-ASCII input', ->
    expect(-> btoa '✈').toThrow()

  it 'can decode Base64-encoded input', ->
    atob('').should_be('')
    atob('Zg==').should_be('f')
    atob('Zm8=').should_be('fo')
    atob('Zm9v').should_be('foo')
    atob('cXV1eA==').should_be('quux')
    atob('ISIjJCU=').should_be('!"#$%')
    atob('JicoKSor').should_be("&'()*+")
    atob('LC0uLzAxMg==').should_be(',-./012')
    atob('MzQ1Njc4OTo=').should_be('3456789:')
    atob('Ozw9Pj9AQUJD').should_be(';<=>?@ABC')
    atob('REVGR0hJSktMTQ==').should_be('DEFGHIJKLM')
    atob('Tk9QUVJTVFVWV1g=').should_be('NOPQRSTUVWX')
    atob('WVpbXF1eX2BhYmM=').should_be('YZ[\\]^_`abc')
    atob('ZGVmZ2hpamtsbW5vcA==').should_be('defghijklmnop')
    atob('cXJzdHV2d3h5ent8fX4=').should_be('qrstuvwxyz{|}~')

  it 'cannot decode invalid input', ->
    expect(-> atob 'a').toThrow()
