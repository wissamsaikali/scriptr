/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 var clientModule = require("google/client");
var config = require("oauth2/config");

var FOLDER_TYPE = "application/vnd.google-apps.folder";

function Drive(dto) {
  
  this.username = dto.username;
  this.client = new clientModule.Client(dto);
}

/**
 *
 */
Drive.prototype.saveFile = function(file, fileMetadata, update, params) {
  
  if (!file || !fileMetadata) {
    
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "Drive.uploadFile : you need to provide a file and corresponding metadata"
    };
  }
  
  if (!fileMetadata.title) {
    
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "Drive.uploadFile : you need to provide a title for the file in the fileMetadata parameter"
    };
  }
  
  if (!fileMetadata.mimeType) {
  	fileMetadata.mimeType = file.contentType;  
  }
  
  // first send metadata 
  var fileObj = this.saveMetadata({fileMetadata:fileMetadata});
  //console.log(JSON.stringify(fileData));
  params =  params ? params : {};
  params.uploadType = "media";
  var url = "https://www.googleapis.com/upload/drive/v2/files/" + fileObj.id + "?";
  for (var param in params) {
    url += param + "=" +  params[param] + "&";
  }
  
  url = url.substring(0, url.length -1);
  var request = {
    
    url :  url,
    method : "PUT",
    headers : {
      "Content-Type": file.contentType
    },
    bodyString: file.content
  };
 
  return this.client.callApi(request); 
};

/**
 * {fileMetadata, params, update}
 */
Drive.prototype.saveMetadata = function(dto) {
  
  var url = "https://www.googleapis.com/drive/v2/files/";
  if (dto.update && (!dto.params || !dto.params.id)) {
      
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "Drive.saveMetadata : you need to provide the file's id when updating its metadata"
    };
  }
  
  url += dto.update && dto.params.id ? dto.params.id : "";
  var request = {
    
    url :  url,
    method : dto.update ? "PUT": "POST",
    headers: {
      "Content-Type":"application/json"
    },
    bodyString: JSON.stringify(dto.fileMetadata)
  };
 
  return this.client.callApi(request);   
};

/**
 * 
 * @param {Object} param {
 *	{String} pathToFolder: the path to the folder to start listing from
 *	{String} pageToken: the token that identifies the result page (in case listing returns more results than the max)
 * 	{Numeric} maxResults: the maximum folder objects to return (optional, defaults to 1000)
 * 	{String} mimeType:  // one of "file", "folder" or specific mime type
 */
Drive.prototype.listContentInFolder = function(params) {
  
  var queryParams = {};
  if (params && params.pageToken) {
    queryParams.pageToken = params.pageToken;
  }
  
  if (params && params.maxResults) {
    queryParams.maxResults = params.maxResults;
  }
  
  if (params.pathToFolder) {
    
    var folder = this.getFolderByPath(params.pathToFolder);
    queryParams.q = "'" + folder.id + "' in  parents";
  }
  
  var typeCondition = "";
  if (params.mimeType) {
  
    typeCondition = params.mimeType == "folder" ?  "mimeType = '" +  FOLDER_TYPE + "'" : 
    	(params.mimeType == "file" ? "mimeType != '" +  FOLDER_TYPE + "'" : "mimeType = '" +  params.mimeType + "'");
    queryParams.q += " and " + typeCondition;
  }
 
  var query = {
    
     url : config.apiUrl + "/drive/v2/files",
     method : "GET",
     params: queryParams
  };
   
  var result = this.client.callApi(query); 
  var response = {
    "items": result.items
  }
  
  if (result.nextPageToken) {
    response.nextPageToken = result.nextPageToken;
  }
  
  return response;
};

/**
 * Get a specific folder by id
 */
Drive.prototype.getFolderById = function(id) {
  
  if (!id ) {
    
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "Drive.getFolder : id cannot be null or empty"
    };
  }
  
  return this._getItemById(id, "mimeType = '" +  FOLDER_TYPE + "'");
};

/**
 *
 */
Drive.prototype.getFolderByPath = function(path) {  
  
  if (!path) {
    
      throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "Drive.getFolderByPath : path cannot be null or empty"
    };
  }
  
  return this._getItemByPath(path, "mimeType = '" + FOLDER_TYPE + "'");
};

/**
 *
 */
Drive.prototype.getFileByPath = function(path, mimeType) {  
  
  if (!path) {
    
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "Drive.getFileByPath : path cannot be null or empty"
    };
  }
  
  var typeCondition = "";
  if (mimeType) {
    typeCondition = "mimeType = '" +  mimeType + "'";
  }else {
    typeCondition = "mimeType != '" +  FOLDER_TYPE + "'";
  }
  
  // first get the parent folder of the file
  var pathToFile = path.substring(0, path.lastIndexOf("/"));
  var fileName = path.substring(path.lastIndexOf("/") + 1);
  var parentFolder = this._getItemByPath(pathToFile, "mimeType = '" + FOLDER_TYPE + "'");
  var file = this._findItemByParentAndTitle(parentFolder.id, fileName, typeCondition);
  return file;
};

/**
 *
 */
Drive.prototype._getItemById = function(id, typeCondition) {
  
  var queryParams = {};
  queryParams.q = typeCondition + " and id='" +  id + "'";
  var query = {
    
     url : config.apiUrl + "/drive/v2/files",
     method : "GET",
     params: queryParams
  };
  
  var result = this.client.callApi(query); 
  return result;
};

/**
 *
 */
Drive.prototype._getItemByPath = function(path, typeCondition) {
  
  var items = path.split("/");
  var targetItem = null;
  var parent = null;
  for (var i = 0; i < items.length;  i++) {
    
    targetItem = this._findItemByParentAndTitle(parent, items[i], typeCondition);
    parent = targetItem.id;
  }
  
  return targetItem;
};

/**
 *
 */
Drive.prototype._findItemByParentAndTitle = function(parent, title, typeCondition) {
  
  var queryParams = {};
  queryParams.q = typeCondition + " and title ='" +  title + "'";
  if (parent) {
    queryParams.q += " and '" +  parent + "' in parents";
  }else {
    queryParams.q += " and 'root' in parents";
  }
  console.log(queryParams.q);
  var query = {
    
     url : config.apiUrl + "/drive/v2/files",
     method : "GET",
     params: queryParams
  };
  
  var result = this.client.callApi(query); 
  if (!result.items[0]) {
    
     throw {
      "errorCode": "Item_Not_Found",
      "errorDetail": "Could not find the following item '" + title +  "' with parent id '" + parent + "'"
    };
  }
  
  return result.items[0];  
};   				   				   				   				   				   							