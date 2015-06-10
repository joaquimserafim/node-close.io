'use strict'

var apiKey = '5e8e1f87af05071b01cc4fc9f6f766fea5a48cd198c0c5c7f0c50694'

var helpers = module.exports

helpers.uuid = function uuid () {
  return (~~(Math.random() * 1e9)).toString(36)
}

helpers.closeio = require('../')(apiKey)
