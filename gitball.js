exports.status = function(){
  if (this.action == 'created' && 'issue' in this){
    return 'created_issue';
  } else if (this.action == 'opened' && 'issue' in this){
    return 'opend_issue';
  } else if (this.action == 'opened' && 'pull_request' in this){
    return 'opend_pull_request';
  } else {
    return null;
  }
};
