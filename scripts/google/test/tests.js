/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 var driveModule = require("google/drive/driveModule");

var drive = new driveModule.Drive({"username":"karim"});
var data = {};
try {
  
 
  /*if (allFiles.nextPageToken) {
    data.allFilesSecondPage = drive.listFiles({maxResults:1, pageToken:allFiles.nextPageToken});
  }
  */
  
  // list all folder contained in a specific folder
  //var allFoldersInFolder = drive.listContentInFolder({pathToFolder:"demos", mimeType:"folder"});
  //data.allFoldersInFolder = allFoldersInFolder;
  
  // list all files contained in a specific folder
  //var allFilesInFolder = drive.listContentInFolder({pathToFolder:"demos", mimeType:"file"});
  //data.allFilesInFolder = allFilesInFolder;
  
  // list all content (files or folders) of a specific folder
  //var allContentInFolder = drive.listContentInFolder({pathToFolder:"demos/scriptr demos"});
  //data.allContentInFolder = allContentInFolder; 
  
  // get folder data using folder's path from root
  //var myFolder = drive.getFolderByPath("demos/scriptr demos");
  //data.myFolder = myFolder;
  
  // get file data using file's path from root
  //var myFile = drive.getFileByPath("demos/scriptr demos/scriptr.io.pdf");
  //data.myFile = myFile;
  
  // upload a file to google drive (you need to pass a file as a parameter of this script
  // and this parameter has to be called 'file' in our test
  if (request.files) {
  
  	var filesList = request.files.file;
  	if (filesList && filesList.length > 0) {
      
      var fileToUpload = filesList[0];
      data.uploadResult = drive.saveFile(fileToUpload, {"title":fileToUpload.fileName});
    }
  }
  
  return data;
}catch(exception) {
  return exception;
}   				   				   				   							