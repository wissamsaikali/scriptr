/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 /*#*SCRIPTR_PLUGIN*#*{"metadata":{"name":"CodeMirrorArbitraryFile","plugindata":{"fileData":"<html>\n hello\n</html>"},"scriptrdata":[]}}*#*#*/
var content= '<html>\n\
 hello\n\
</html>';  response.write(content);response.close();			