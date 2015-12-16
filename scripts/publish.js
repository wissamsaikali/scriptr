/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 /*#*beginblockly*#*<xml xmlns="http://www.w3.org/1999/xhtml"><block type="scriptr_return" id="31" inline="false" x="164" y="82"><value name="return"><block type="scriptr_publish" id="48" inline="true"><value name="message"><block type="text" id="49"><field name="TEXT">test</field></block></value><value name="channel"><block type="text" id="50"><field name="TEXT">ttt</field></block></value></block></value></block></xml>*#*#*/
return publish ('ttt', 'test',false)			