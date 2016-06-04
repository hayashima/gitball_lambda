yaml = require('js-yaml');
fs   = require('fs');
url_util = require('url');

var github = require('octonode');
var setting = yaml.safeLoad(fs.readFileSync('github.yml'));

exports.handler = function(event, context) {
  // Getting '_ball' label lists.
  var ball_tags = function(){
    if ((event.action == 'created' || event.action == 'opened') === false){
      return [];
    }
    if (event.action == 'created' && 'issue' in event){
      return create_tags_from_message(event.comment.body); //add issue and pullreq comment.
    } else if (event.action == 'opened' && 'issue' in event){
      return create_tags_from_message(event.issue.body); //create issue.
    } else if (event.action == 'opened' && 'pull_request' in event){
      return create_tags_from_message(event.pull_request.body); //create pullreq.
    } else {
      return [];
    }
  };

  // Getting issue number
  var number = function(){
    if ((event.action == 'created' || event.action == 'opened') === false){
      return null;
    }
    if ('issue' in event){
      return event.issue.number;
    } else if ('pull_request' in event){
      return event.pull_request.number;
    } else {
      return null;
    }
  };

  // create tags from message.
  var create_tags_from_message = function(message){
    var list = message.match(/@[a-z0-9_-]+/ig);
    if (list === null){
      return [];
    }
    return list.map(function(v){
      return v.replace(/@/,'') + '_ball';
    });
  };

  var repos = function(){
    var url = null;
    if ('issue' in event){
      url = event.issue.url;
    } else if ('pull_request' in event){
      url = event.pull_request.url;
    }
    if (url === null){
      return null;
    }
    var list = url_util.parse(url).path.split('/');
    return list[2] + '/' + list[3];
  };

  var update = function(tags, num){
    var client = github.client(setting.token);
    var ghissue = client.issue(repos(), num);
    var obj = function(err, data){
      var existing_labels = data.labels.map(function(v){ return v.name; });
      existing_labels.forEach(function(v){
        if (v.match(/_ball$/i) === null){
          tags.push(v);
        }
      });
      ghissue.update(
        {'labels': tags},
        function(){
          context.succeed('complete!');
        }
      );
    };
    ghissue.info(obj);
  };

  var num = number();
  if (num === null){
    context.succeed('not updated.');
    return null;
  }
  var tags = ball_tags();
  if (tags.length === 0){
    context.succeed('not updated.');
    return null;
  }
  update(tags, num);
};
