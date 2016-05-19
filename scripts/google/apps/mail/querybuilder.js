/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 function QueryBuilder() {
  this.searchQuery = "";
}

QueryBuilder.prototype.query = function() {  
  return this.searchQuery;
};

QueryBuilder.prototype.setQuery = function(queryStr) {  
  
  this.searchQuery = queryStr;
  return this;
};

QueryBuilder.prototype.OR = function(str) {  
  
  if (str) {
    this.searchQuery += " OR " + str;
  }
  
  return this;
};

QueryBuilder.prototype.AND = function(str) {  
  
  if (str) {
    this.searchQuery += " AND " + str;
  }
  
  return this;
};

QueryBuilder.prototype.text = function(text) {
  return text;
};

QueryBuilder.prototype.from = function(from) {
  return "from:" + from;
};

QueryBuilder.prototype.to = function(to) {
  return "to:" + to;
};

QueryBuilder.prototype.subject = function(subject) {
 return "subject:" + subject;
};

QueryBuilder.prototype.hasAttachment = function(subject) {
  return "has:attachment";
};

QueryBuilder.prototype.fileName = function(fileName) {
  return fileName ? "filename:" + fileName : "";
};

QueryBuilder.prototype.inInbox = function() {
  return "in:inbox"
};

QueryBuilder.prototype.inTrash = function() {
  return "in:trash";
};

QueryBuilder.prototype.inSpam = function() {
  return "in:spam";
};

QueryBuilder.prototype.after = function(dateStr) {
  return "after:" + dateStr;
};

QueryBuilder.prototype.before = function(dateStr) {
  return "before:" + dateStr;
};

QueryBuilder.prototype.after = function(dateStr) {
  return "older:" + dateStr;
};

QueryBuilder.prototype.after = function(dateStr) {
  return "newer:" + dateStr;
};

QueryBuilder.prototype.isRead = function() {
  return "is:read";
};

QueryBuilder.prototype.isUnread = function() {
  return "is:unread";
};			