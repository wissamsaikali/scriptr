/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var config = require("google/oauth2/config");
var queryBuilder = require("google/apps/mail/querybuilder");

/**
 * Wrapper of the Gmail APIs
 * @class Gmail
 * @constructor
 * @param {Object} [dto]
 * @param {Object} [dto.client] : instance of HttpClient
 * @param {String} [dto.email] : email address that owns the mailbox to connect to
 */
function Gmail(dto) {
  
  if (!dto || !dto.client) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "Gmail. dto and dto.client cannot be null or empty"
    };
  }
  
  if (!dto.email) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "Gmail. dto.email cannot be null or empty"
    };
  }
  
  this.email = dto.email;
  this.client = dto.client;
}

/**
 * @method listMessages
 * @param {Object} filer : optiona. Instance of querybuilder.QueryBuilder
 * @return {Array} array of {id, threadId} objects
 */
Gmail.prototype.listMessages = function(filter) {
  
  var url = config.gmailApiUrl + "/" + config.gmailApiVers + "/users/" + encodeURIComponent(this.email) + "/messages";
  var requestParams = {
    url: url,
    method: "GET"
  };
  
  if (filter) {
    requestParams.params = {
      q:filter.query()
    };
  }
  
  return this.client.callApi(requestParams).messages;
};

/**
 * @method getMessage
 * @param {Object} [dto]
 * @param {String} [dto.id] : the identifier of the message
 * @param {String} [dto.format] : optional. One of "full", "metadata", "minimal", "raw" (See Gmail.format)
 * @param {Boolean} [dto.markAsRead] : optional, if true, will remove the "unread" label from the message
 * @return {Object}
 *  -- If format was "minimal", returned object is : 
 * {
 *	 {String} "id", // the message id
 *   {String}"threadId", // the id of the thread the message belong to
 *   {Array}"labelIds", // the list of labels associated to the message
 *	 {String} "snippet", // excerpt of the content of the message
 *	 {String} "historyId
 *	 {Numeric} "internalDate",// timestamp
 *	 {Numeric}"sizeEstimate": 669
 *	}
 * -- If format was "raw", same as "minimal" + "raw" field (the nmessage as a base64url encoded string)
 * -- If format was "full", returned object is same as "minimal" +  
 *  "payload" : {
 * 	{String} "mimeType",
 *	{String} "filename" : name of the attached file if any (empty string otherwise)
 *	{Array} "headers" : array { {String} name, {String} value}
 * 	{Object} "body" { {Numeric} size, {String} data // base64 encoded content of the body},
 * 	{Array} "parts" : message parts, when part is 
 *		{ {String} partId, {String} mimeType, {String} filename, {Array} headers, {Object} body}
 * }
 * -- If format was "metadata", returned object is same as "full" but payload only contains "headers" and "mimetype"
 */
Gmail.prototype.getMessage = function(dto) {
  
  if (!dto || !dto.id) {
    
    throw {
      
      errorCode: "Invalid_Parameter",
      errorDetail: "Gmail.getMessage : dto.id cannot null or empty"
    };
  }
  
  var url = config.gmailApiUrl + "/" + config.gmailApiVers + "/users/" + encodeURIComponent(this.email) + "/messages/" +  dto.id;
  var requestParams = {
    url: url,
    method: "GET"
  };
  
  if (dto.format) {
    
    requestParams.params = {
      format: dto.format
    };
  }
  
  var msg = this.client.callApi(requestParams);
  if (dto.markAsRead) {
    this.modifyMessage({id:dto.id, removeLabelIds: this.label.unread});
  }
  
  return msg;
};

/**
 * @method modifyMessage
 * @param {Object} [dto]
 * @param {String} [dto.id] the identifier of the message
 * @param {Array} [dto.addLabelIds] // array of string wheren string are label ids to associate to the message
 * @param {Array} [dto.removeLabelIds] // array of string wheren string are label ids to dissociate from the message
 */
Gmail.prototype.modifyMessage = function(dto) {
  
  var url = config.gmailApiUrl + "/" + config.gmailApiVers + "/users/" + encodeURIComponent(this.email) + 
      				"/messages/" +  dto.id + "/modify";
  var requestParams = {
    url: url,
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  };
  
  if (dto.addLabelsIds || dto.removeLabelIds) {
    
    requestParams.params = {};
    if (dto.addLabelsIds){
      requestParams.params["addLabelsIds"] = [].concat(dto.addLabelsIds);
    }
    
    if (dto.removeLabelIds){
      requestParams.params["removeLabelIds"] = [].concat(dto.removeLabelIds);
    }
  }
  
  return this.client.callApi(requestParams);
};

/**
 * @method createFilter
 * @return {Object} instance google/mail/querybuilder.QueryBuilder to use as a filter in listMessages
 */
Gmail.prototype.createFilter = function() {
  return new queryBuilder.QueryBuilder();
};

/**
 * Possible formats to use when getting a message
 * @property format
 * @static
 */
Gmail.prototype.format = {
  
  full: "full",
  metadata: "metadata",
  minimal: "minimal",
  raw: "raw"
};

/**
 * Standard labels to associate to messages
 * @property label
 * @static
 */
Gmail.prototype.label = {
  
  unread: "UNREAD",
  inbox: "INBOX",
  important: "IMPORTANT",
  sent: "SENT"
};			