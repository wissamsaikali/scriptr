/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 function demo (val1, val2){
  return val1 + val2;
}			