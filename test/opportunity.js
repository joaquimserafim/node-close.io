'use strict'
var Lab   = require('lab')
var Code  = require('code')
var nock  = require('nock')

var lab = module.exports.lab = Lab.script()

var describe  = lab.describe
var it        = lab.it
var expect    = Code.expect

var helpers = require('./')

var closeio = helpers.closeio
var uuid    = helpers.uuid

describe('opportunity', function() {
  var leadId
  var opportunityId
  var leadName = 'Hulk' + uuid()

  it('create lead', function(done) {
    closeio.lead
      .create({name: leadName})
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body.id).to.exist()
        leadId = body.id
        expect(info.statusCode).to.equal(200)
        done()
      })
  })

  it('create opportunity', function(done) {
    closeio.opportunity
      .create({
        note: 'i hope this deal closes...',
        confidence: 90,
        lead_id: leadId,
        value: 500,
        label: 'HelloWorld' + uuid(),
        value_period: 'monthly'
      })
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body).to.be.an.object()
        expect(body.id).to.exist()
        expect(body.value).equal(500)
        opportunityId = body.id
        expect(info).to.be.an.object()
        expect(info.statusCode).to.equal(200)
        done()
      })
  })

  it('search opportunity', function(done) {
    closeio.opportunity
      .search({confidence: 90})
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body).to.be.an.object()
        expect(body.data[0].confidence).to.equal(90)
        expect(info).to.be.an.object()
        expect(info.statusCode).to.equal(200)
        done()
      })
  })

  it('fetch a single opportunity', function(done) {
    closeio.opportunity
      .read(opportunityId)
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body).to.be.an.object()
        expect(info.statusCode).to.equal(200)
        done()
      })
  })

  it('update an existing opportunity', function(done) {
    closeio.opportunity
      .update(opportunityId, {note: 'Hello World'})
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body).to.be.an.object()
        expect(info.statusCode).to.equal(200)
        done()
      })
  })

  it('delete an existing opportunity', function(done) {
    closeio.opportunity
      .delete(opportunityId)
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body).to.be.an.object()
        expect(info.statusCode).to.equal(200)
        done()
      })
  })

  it('delete lead', function(done) {
    closeio.lead
      .delete(leadId)
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body).to.be.an.object()
        expect(info.statusCode).to.equal(200)
        done()
      })
  })
})