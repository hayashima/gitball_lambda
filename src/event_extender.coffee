module.exports =
  # 有効なコメントであるかのチェック
  is_open_comment: ->
    @.action == 'created' || @.action == 'opened'

  # issue/pull_request番号の取得
  number_of_comment: ->
    if 'issue' of @
      @.issue.number
    else if 'pull_request' of @
      @.pull_request.number
    else
      null
