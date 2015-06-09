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

describe('contact', function() {
  var leadId
  var contactId
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

  it('create contact', function(done) {
    closeio.contact
      .create({
        name: leadName,
        lead_id: leadId,
        phones: [{phone: '9045551234', type: 'mobile'}],
        emails: [{email: 'john@example.com', type: 'office'}]
      })
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body).to.be.an.object()
        expect(body.id).to.exist()
        expect(body.phones[0].phone).to.equal('+19045551234')
        expect(body.phones[0].type).to.equal('mobile')
        expect(body.emails[0].email).to.equal('john@example.com')
        expect(body.emails[0].type).to.equal('office')
        contactId = body.id
        expect(info).to.be.an.object()
        expect(info.statusCode).to.equal(200)
        done()
      })
  })

  it('list contacts', function(done) {
    closeio.contact
      .search()
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body).to.be.an.object()
        expect(info.statusCode).to.equal(200)
        done()
      })
  })

  it('fetch a single contact', function(done) {
    closeio.contact
      .read(contactId)
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body).to.be.an.object()
        expect(info.statusCode).to.equal(200)
        done()
      })
  })

  it('update an existing contact', function(done) {
    closeio.contact
      .update(contactId, {
        emails: [{
          email: 'john@beach.io',
          type: 'beach'
        }]
      })
      .done(function(err, body, info) {
        expect(err).to.be.null()
        expect(body).to.be.an.object()
        expect(info.statusCode).to.equal(200)
        expect(body.emails[0].email).to.equal('john@beach.io')
        expect(body.emails[0].type).to.equal('beach')
        done()
      })
  })

  it('delete an existing contact', function(done) {
    closeio.contact
      .delete(contactId)
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