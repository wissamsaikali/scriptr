/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 /*#*beginblockly*#*<xml xmlns="http://www.w3.org/1999/xhtml"><block type="scriptr_return" id="1" inline="false" x="106" y="153"><value name="return"><block type="math_arithmetic" id="2" inline="true"><field name="OP">MINUS</field><value name="A"><block type="math_number" id="3"><field name="NUM">5</field></block></value><value name="B"><block type="math_number" id="4"><field name="NUM">4</field></block></value></block></value></block></xml>*#*#*/
return 5 - 4			