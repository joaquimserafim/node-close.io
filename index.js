'use strict'

var request   = require('request')
var pick      = require('js-object-pick')
var isObject  = require('is-js-object')
var extend    = require('util')._extend
var inherits  = require('util').inherits
var debug     = require('debug')('node-close.io')

var operations = require('./lib/operations')

//
//
//

module.exports = function(apiKey) {
  return new Closeio(apiKey)
}

function Closeio (apiKey) {
  this._uri = 'https://app.close.io/api/v1/'
  this._options = {
    auth: {user: apiKey, pass: ''},
    jar : false
  }
  Closeio.init.call(this, apiKey)
}

Closeio.init = function init (apiKey) {
  var self = this

  self.lead = {
    create: operations.create('lead', self),
    search: operations.search2('lead', self),
    read  : operations.read('lead', self),
    merge : operations.merge('lead', self),
    update: operations.update('lead', self),
    delete: operations.delete('lead', self)
  }

  self.contact = {
    create: operations.create('contact', self),
    search: operations.search('contact', self),
    read  : operations.read('contact', self),
    update: operations.update('contact', self),
    delete: operations.delete('contact', self)
  }

  self.activity = {
    search: operations.search('activity', self),
    note: {
      create: operations.create('activity/note', self),
      search: operations.search('activity/note', self),
      update: operations.update('activity/note', self),
      delete: operations.delete('activity/note', self)
    },
    email: {
      create: operations.create('activity/email', self),
      search: operations.search('activity/email', self),
      update: operations.update('activity/email', self),
      delete: operations.delete('activity/email', self)
    },
    call: {
      search: operations.search('activity/call', self),
      delete: operations.delete('activity/call', self)
    }
  }

  self.opportunity = {
    create: operations.create('opportunity', self),
    search: operations.search('opportunity', self),
    read  : operations.read('opportunity', self),
    update: operations.update('opportunity', self),
    delete: operations.delete('opportunity', self)
  }

  self.task = {
    create: operations.create('task', self),
    search: operations.search('task', self),
    read  : operations.read('task', self),
    update: operations.update('task', self),
    delete: operations.delete('task', self)
  }

  self.user = {
    read  : operations.read('user', self),
    update: operations.update('user', self)
  }

  self.organization = {
    read  : operations.read('organization', self),
    update: operations.update('organization', self)
  }

  self.report = {
    read: operations.read('report', self)
  }

  self.emailTemplate = {
    create: operations.create('email_template', self),
    search: operations.search('email_template', self),
    read  : operations.read('email_template', self),
    update: operations.update('email_template', self),
    delete: operations.delete('email_template', self)
  }

  self.savedSearch = {
    create: operations.create('saved_search', self),
    search: operations.search('saved_search', self),
    read  : operations.read('saved_search', self),
    update: operations.update('saved_search', self),
    delete: operations.delete('saved_search', self)
  }

  self.status = {
    create: operations.create('status/lead', self),
    list  : operations.search('status/lead', self),
    read  : operations.read('status/lead', self),
    update: operations.update('status/lead', self),
    delete: operations.delete('status/lead', self)
  }

  self.opportunity = {
    create: operations.create('status/opportunity', self),
    list  : operations.search('status/opportunity', self),
    read  : operations.read('status/opportunity', self),
    update: operations.update('status/opportunity', self),
    delete: operations.delete('status/opportunity', self)
  }
}

Closeio.prototype.done = function done (cb) {
  makeRequest(this._options, cb)
}

//
//
//

function makeRequest(options, cb) {debugger
  debug('request: %j', options);

  request(options, requestCb);

  function requestCb(err, res, body) {debugger
    var respInfo = {};

    if (isObject(res)) {
      respInfo = extend(
        pick(res.headers, [
          'date',
          'content-type',
          'content-length'
          ]
        ),
        pick(res, 'statusCode')
      );
    }

    debug('request: %j, %j, %j', err, respInfo, body);

    if (err) {
      cb(err, body, respInfo);
    } else {
      if (res.statusCode === 200) {
        cb(null, body, respInfo);
      } else {
        if (!isObject(body)) {
          body = {message: ''};
        }
        err = new Error(body.message);
        cb(err, body, respInfo);
      }
    }
  }
}