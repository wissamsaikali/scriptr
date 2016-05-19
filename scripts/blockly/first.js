/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 /*#*beginblockly*#*<xml xmlns="http://www.w3.org/1999/xhtml"><block type="variables_set" id="592" inline="true" x="-658" y="9"><field name="VAR">myList</field><value name="VALUE"><block type="lists_create_empty" id="609"></block></value><next><block type="controls_for" id="873" inline="true"><field name="VAR">i</field><value name="FROM"><block type="math_number" id="874"><field name="NUM">1</field></block></value><value name="TO"><block type="math_number" id="875"><field name="NUM">10</field></block></value><value name="BY"><block type="math_number" id="876"><field name="NUM">1</field></block></value><statement name="DO"><block type="lists_setIndex" id="862" inline="true"><mutation at="true"></mutation><field name="MODE">SET</field><field name="WHERE">FROM_START</field><value name="LIST"><block type="variables_get" id="863"><field name="VAR">myList</field></block></value><value name="AT"><block type="variables_get" id="885"><field name="VAR">i</field></block></value><value name="TO"><block type="variables_get" id="894"><field name="VAR">i</field></block></value><next><block type="scriptr_Console_log" id="917" inline="true"><field name="level">log</field><value name="message"><block type="lists_getIndex" id="956" inline="true"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="957"><field name="VAR">myList</field></block></value><value name="AT"><block type="variables_get" id="964"><field name="VAR">i</field></block></value></block></value><next><block type="scriptr_Console_log" id="1230" inline="true"><field name="level">log</field><value name="message"><block type="procedures_callreturn" id="1235" inline="false"><mutation name="somme"><arg name="x"></arg><arg name="y"></arg></mutation><value name="ARG0"><block type="variables_get" id="1270"><field name="VAR">i</field></block></value><value name="ARG1"><block type="math_number" id="1300"><field name="NUM">2</field></block></value></block></value></block></next></block></next></block></statement></block></next></block><block type="procedures_defreturn" id="989" inline="false" x="-908" y="287"><mutation><arg name="x"></arg><arg name="y"></arg></mutation><field name="NAME">somme</field><statement name="STACK"><block type="variables_set" id="1348" inline="true"><field name="VAR">message</field><value name="VALUE"><block type="text_join" id="1363" inline="false"><mutation items="4"></mutation><value name="ADD0"><block type="text" id="1378"><field name="TEXT">Somme de </field></block></value><value name="ADD1"><block type="variables_get" id="1396"><field name="VAR">x</field></block></value><value name="ADD2"><block type="text" id="1466"><field name="TEXT">+</field></block></value><value name="ADD3"><block type="variables_get" id="1409"><field name="VAR">y</field></block></value></block></value><next><block type="scriptr_Console_log" id="1432" inline="true"><field name="level">log</field><value name="message"><block type="variables_get" id="1445"><field name="VAR">message</field></block></value></block></next></block></statement><value name="RETURN"><block type="math_arithmetic" id="1127" inline="true"><field name="OP">ADD</field><value name="A"><block type="variables_get" id="1196"><field name="VAR">x</field></block></value><value name="B"><block type="variables_get" id="1207"><field name="VAR">y</field></block></value></block></value></block></xml>*#*#*/
var myList;
var x;
var y;
var i;
var message;

function somme(x, y) {
  message = ['Somme de ',x,'+',y].join('');
  (function(){ console.log(message)})();  return x + y;
}


myList = [];
for (i = 1; i <= 10; i++) {
  myList[i - 1] = i;
  (function(){ console.log(myList[i - 1])})();(function(){ console.log(somme(i, 2))})();}
			