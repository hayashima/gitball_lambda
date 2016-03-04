var assert = require("assert");
var gitball = require('../gitball');

describe('#status', function(){
  var event;
  describe('created issue', function(){
    before(function(){
      event = {action: 'created', issue: 'some errors'};
    });
    it('created_issue', function(){
      assert.equal(gitball.status.call(event), 'created_issue');
    });
  });

  describe('opend issue', function(){
    before(function(){
      event = {action: 'opened', issue: 'some errors'};
    });
    it('opend_issue', function(){
      assert.equal(gitball.status.call(event), 'opend_issue');
    });
  });

  describe('opend pull request', function(){
    before(function(){
      event = {action: 'opened', pull_request: 'fixed errors'};
    });
    it('opend_pull_request', function(){
      assert.equal(gitball.status.call(event), 'opend_pull_request');
    });
  });

  describe('other', function(){
    before(function(){
      event = {};
    });
    it('return null', function(){
      assert.equal(gitball.status.call(event), null);
    });
  });
});
