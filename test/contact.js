'use strict'
var Lab   = require('lab')
var Code  = require('code')
var nock  = require('nock')

var lab = module.exports.lab = Lab.script()

var describe  = lab.describe
var it        = lab.it
var before    = lab.before
var expect    = Code.expect

var helpers = require('./')

var closeio = helpers.closeio
var uuid    = helpers.uuid

describe('contact', function() {

  it('create contact', function(done) {
    closeio.contact
      .create({name: leadName})
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body).to.be.an.object()
        expect(body.id).to.exist()
        leadId = body.id
        expect(info).to.be.an.object()
        expect(info.statusCode).to.equal(200)
        done()
      })
  })

  it('search contact linit by 1', function(done) {
    closeio.contact
      .search({limit: 1})
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body).to.be.an.object()
        expect(body.data.length).to.equal(1)
        expect(info).to.be.an.object()
        expect(info.statusCode).to.equal(200)
        done()
      })
  })

  it('get contact', function(done) {
    closeio.contact
      .read(leadId)
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body).to.be.an.object()
        expect(body.display_name).to.equal(leadName)
        expect(body.id).to.equal(leadId)
        expect(info).to.be.an.object()
        expect(info.statusCode).to.equal(200)
        done()
      })
  })

  it('update contact', function(done) {
    closeio.contact
      .update(leadId, {description: 'Hello World'})
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body).to.be.an.object()
        expect(body.display_name).to.equal(leadName)
        expect(body.id).to.equal(leadId)
        expect(body.description).to.equal('Hello World')
        expect(info).to.be.an.object()
        expect(info.statusCode).to.equal(200)
        done()
      })
  })

  it('delete contact', function(done) {
    closeio.contact
      .read(leadId)
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body).to.be.an.object()
        expect(body.id).to.equal(leadId)
        expect(info.statusCode).to.equal(200)
        done()
      })
  })
})