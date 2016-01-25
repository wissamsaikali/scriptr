/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 /*#*SCRIPTR_PLUGIN*#*{"metadata":{"name":"CodeMirrorArbitraryFile","plugindata":{"fileData":"<b>bold w2</b>"},"scriptrdata":[]}}*#*#*/
var content= '<b>bold w2</b>'; var response = apsdb.httpRespond(); response.write(content);response.close();			