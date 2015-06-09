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

describe('lead', function() {
  var leadId
  var leadName = 'Hulk' + uuid()

  it('create lead', function(done) {
    closeio.lead
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

  it('search lead linit by 1', function(done) {
    closeio.lead
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

  it('get lead', function(done) {
    closeio.lead
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

  it('update lead', function(done) {
    closeio.lead
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

  it('merge two leads', function(done) {
    closeio.lead
      .create({name: 'HEY'})
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body).to.be.an.object()
        expect(info.statusCode).to.equal(200)

        closeio.lead
          .merge({source: body.id, destination: leadId})
          .done(function(err, body, info) {
            expect(err).to.be.null()
            expect(body).to.be.an.object()
            expect(body.status).to.equal('ok')
            expect(info.statusCode).to.equal(200)
            done()
          })
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