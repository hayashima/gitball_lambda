module.exports =
  is_open_comment: ->
    @.action == 'created' || @.action == 'opened'
