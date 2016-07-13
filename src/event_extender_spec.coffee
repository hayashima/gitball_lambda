event_extender = require("./event_extender")

describe "event_extender", ->
  describe "書き込み条件の確認 is_open_comment", ->
    beforeEach ->
      @obj = is_open_comment: event_extender.is_open_comment

    describe "obj.actionがcreatedの場合", ->
      beforeEach ->
        @obj.action = 'created'
      it 'trueになること', ->
        expect(@obj.is_open_comment()).toBe(true)

    describe "obj.actionがopendの場合", ->
      beforeEach ->
        @obj.action = 'opened'
      it 'trueになること', ->
        expect(@obj.is_open_comment()).toBe(true)

    describe "obj.actionがdeletedの場合", ->
      beforeEach ->
        @obj.action = 'deleted'
      it 'falseになること', ->
        expect(@obj.is_open_comment()).toBe(false)
