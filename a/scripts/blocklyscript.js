/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 /*#*beginblockly*#*<xml xmlns="http://www.w3.org/1999/xhtml"><block type="scriptr_return" id="19" inline="false" x="91" y="103"><value name="return"><block type="scriptr_publish" id="38" inline="true"><value name="message"><block type="text" id="39"><field name="TEXT">hey</field></block></value><value name="channel"><block type="text" id="40"><field name="TEXT">you</field></block></value></block></value></block></xml>*#*#*/
return publish ('you', 'hey',false)			