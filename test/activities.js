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

describe('activities', function() {
  var leadId
  var leadName = 'Hulk' + uuid()

  describe('activity', function() {
    it('create lead', function(done) {
      closeio.lead
        .create({name: leadName})
        .done(function(err, body, info) {
          expect(err).to.be.null()
          expect(body.id).to.exist()
          expect(info.statusCode).to.equal(200)
          leadId = body.id
          done()
        })
    })

    it('list or filter all activity types', function(done) {
      closeio.activity
        .search({lead_id: leadId})
        .done(function(err, body, info) {
          expect(err).to.be.null()
          expect(body).to.be.an.object()
          expect(info.statusCode).to.equal(200)
          done()
        })
    })
  })

  describe('note', function() {
    var noteId

    it('create a Note activity', function(done) {
      closeio.activity.note
        .create({
          note: 'Hello World',
          lead_id: leadId
        })
        .done(function(err, body, info) {
          expect(err).to.be.null()
          expect(body).to.be.an.object()
          expect(body.id).to.exist()
          expect(info.statusCode).to.equal(200)
          noteId = body.id
          done()
        })
    })

    it('list or filter all Note activities', function(done) {
      closeio.activity.note
        .search({lead_id: leadId})
        .done(function(err, body, info) {
          expect(err).to.be.null()
          expect(body).to.be.an.object()
          expect(body.data).to.be.an.array()
          expect(info.statusCode).to.equal(200)
          done()
        })
    })

    it('update an existing Note activity', function(done) {
      closeio.activity.note
        .update(noteId, {note: 'hey'})
        .done(function(err, body, info) {
          expect(err).to.be.null()
          expect(body).to.be.an.object()
          expect(info.statusCode).to.equal(200)
          expect(body.note).to.equal('hey')
          done()
        })
    })

    it('delete a Note activity', function(done) {
      closeio.activity.note
        .delete(noteId)
        .done(function(err, body, info) {
          expect(err).to.be.null()
          expect(body).to.be.an.object()
          expect(info.statusCode).to.equal(200)
          done()
        })
    })
  })

  describe('email', function() {
    var emailId

    it('create a email activity', function(done) {
      closeio.activity.email
        .create({
          subject: 'Hello World',
          lead_id: leadId,
          status: 'draft',
          body_text: 'Hello World'
        })
        .done(function(err, body, info) {
          expect(err).to.be.null()
          expect(body).to.be.an.object()
          expect(body.id).to.exist()
          expect(info.statusCode).to.equal(200)
          emailId = body.id
          done()
        })
    })

    it('list or filter all email activities', function(done) {
      closeio.activity.email
        .search({lead_id: leadId})
        .done(function(err, body, info) {
          expect(err).to.be.null()
          expect(body).to.be.an.object()
          expect(body.data).to.be.an.array()
          expect(body.data[0].lead_id).to.equal(leadId)
          expect(info.statusCode).to.equal(200)
          done()
        })
    })

    it('update an existing email activity', function(done) {
      closeio.activity.email
        .update(emailId, {subject: 'hey'})
        .done(function(err, body, info) {
          expect(err).to.be.null()
          expect(body).to.be.an.object()
          expect(info.statusCode).to.equal(200)
          expect(body.subject).to.equal('hey')
          done()
        })
    })

    it('delete a email activity', function(done) {
      closeio.activity.email
        .delete(emailId)
        .done(function(err, body, info) {
          expect(err).to.be.null()
          expect(body).to.be.an.object()
          expect(info.statusCode).to.equal(200)
          done()
        })
    })
  })

  describe('call', function() {
    var callId
    it('log a call activity manually', function(done) {
      closeio.activity.call
        .create({
          lead_id: leadId,
          status: 'completed'
        })
        .done(function(err, body, info) {
          expect(err).to.be.null()
          expect(body).to.be.an.object()
          callId = body.id
          expect(info.statusCode).to.equal(200)
          done()
        })
    })

    it('list or filter all call activities', function(done) {
      closeio.activity.call
        .search({ lead_id: leadId})
        .done(function(err, body, info) {
          expect(err).to.be.null()
          expect(body).to.be.an.object()
          expect(body.data).to.be.an.array()
          expect(info.statusCode).to.equal(200)
          done()
        })
    })

    it('delete a call activity', function(done) {
      closeio.activity.call
        .delete(callId)
        .done(function(err, body, info) {
          expect(err).to.be.null()
          expect(body).to.be.an.object()
          expect(info.statusCode).to.equal(200)
          done()
        })
    })
  })

  describe('lead', function() {
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
})