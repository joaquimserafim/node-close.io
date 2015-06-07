'use strict'

var Lab   = require('lab')
var Code  = require('code')
var nock  = require('nock')

var lab = module.exports.lab = Lab.script()

var describe  = lab.describe
var it        = lab.it
var before    = lab.before
var expect    = Code.expect

var apiKey = '5e8e1f87af05071b01cc4fc9f6f766fea5a48cd198c0c5c7f0c50694'

var helpers = module.exports

helpers.uuid = function uuid () {
  return (~~(Math.random() * 1e9)).toString(36)
}

helpers.closeio = require('../')(apiKey)
