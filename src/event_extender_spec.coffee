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

  describe "issue/pull_requestの番号を取得 number_of_comment", ->
    beforeEach ->
      @obj = number_of_comment: event_extender.number_of_comment

    describe "issueの場合", ->
      beforeEach ->
        @obj.issue = number: 123
      it '番号が取得できること', ->
        expect(@obj.number_of_comment()).toBe(123)

    describe "pull_requestの場合", ->
      beforeEach ->
        @obj.pull_request = number: 123
      it '番号が取得できること', ->
        expect(@obj.number_of_comment()).toBe(123)

    describe "その他の場合", ->
      beforeEach ->
        @obj.other = number: 123
      it 'nullが取得できること', ->
        expect(@obj.number_of_comment()).toBe(null)
