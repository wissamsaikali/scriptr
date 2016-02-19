/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 if (request.temperature>-8) {
     sendMail("manager@freezers.com", 
        "Freezer 1", "It's getting hot in here", 
        "Do something!")
} 
else { 
     if (request.temperature>storage.lastTemp) 
        sendMail("manager@freezers.com", 
           "Freezer 1", "My temperature is rising", 
           "just FYI")
}
storage.lastTemp = request.temperature			