'use strict'

var extend  = require('util')._extend
var pick    = require('js-object-pick')
var omit    = require('omit.keys')

//
//
//

var operations = module.exports

operations.search = function search (path, context) {
  return function(params) {
    extend(context._options, {
      uri   : context._uri + path + '/',
      method: 'GET',
      json  : true
    })

    if (params) {
      extend(context._options, {qs: params})
    }

    return context
  }
}

operations.search2 = function search2 (path, context) {
  return function(options) {
    var qs = {}

    Object.keys(pick(options, ['limit', 'skip', 'fields']))
      .forEach(function(opt) {
        qs['_' + opt] = options[opt]
      })

    qs.query = omit(options, ['limit', 'skip', 'fields'])

    extend(context._options, {
      uri   : context._uri + path + '/',
      method: 'GET',
      qs    : qs,
      json  : true
    })

    return context
  }
}

operations.create = function create (path, context) {
  return function(options) {
    extend(context._options, {
      uri   : context._uri + path + '/',
      method: 'POST',
      json  : options
    })

    return context
  }
}

operations.merge = function merge (path, context) {
  return function(options) {
    extend(context._options, {
      uri   : context._uri + path + '/merge/',
      method: 'POST',
      path  : path + '/merge',
      json  : options
    })

    return context
  }
}

operations.read = function read (path, context) {
  return function(id, params) {
    extend(context._options, {
      uri   : context._uri + path + '/' + id + '/',
      method: 'GET',
      json  : true
    })

    if (params) {
      extend(context._options, {qs: params})
    }

    return context
  }
}

operations.update = function update (path, context) {
  return function(id, options) {
    extend(context._options, {
      uri   : context._uri + path + '/' + id + '/',
      method: 'PUT',
      json  : options
    })

    return context
  }
}

operations.delete = function del (path, context) {
  return function(id) {
    extend(context._options, {
      uri   : context._uri + path + '/' + id + '/',
      method: 'DELETE',
      json  : true
    })

    return context
  }
}
