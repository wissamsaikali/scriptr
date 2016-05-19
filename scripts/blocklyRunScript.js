/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 /*#*beginblockly*#*<xml xmlns="http://www.w3.org/1999/xhtml"><block type="variables_set" id="1" inline="true" x="-455" y="21"><field name="VAR">testtt</field><value name="VALUE"><block type="text" id="6"><field name="TEXT">we are here</field></block></value><next><block type="scriptr_return" id="3" inline="false"><value name="return"><block type="scriptr_callscript" id="4" inline="false"><field name="method">demo</field><field name="script">demo_</field><value name="parameters"><block type="lists_create_with" id="5" inline="false"><mutation items="2"></mutation><value name="ADD0"><block type="text" id="8"><field name="TEXT">here</field></block></value><value name="ADD1"><block type="lists_create_with" id="7" inline="false"><mutation items="3"></mutation><value name="ADD1"><block type="variables_get" id="40"><field name="VAR">testtt</field></block></value><value name="ADD2"><block type="logic_compare" id="10" inline="true"><field name="OP">EQ</field><value name="A"><block type="text" id="11"><field name="TEXT"></field></block></value><value name="B"><block type="text" id="12"><field name="TEXT"></field></block></value></block></value></block></value></block></value></block></value></block></next></block></xml>*#*#*/
var testtt;


testtt = 'we are here';
return require("demo_").demo('here', [null, testtt, '' == ''])			