/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 /*#*beginblockly*#*<xml xmlns="http://www.w3.org/1999/xhtml"><block type="scriptr_return" id="40" inline="false" x="89" y="56"><value name="return"><block type="scriptr_push_notification_to_group" id="19" inline="true"><value name="message"><block type="text" id="20"><field name="TEXT">a</field></block></value><value name="groupId"><block type="text" id="21"><field name="TEXT">a</field></block></value></block></value></block></xml>*#*#*/
return pushToGroup('a', 'a')			