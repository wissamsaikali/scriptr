/** Script ACLs do not delete 
 read=nobody 
write=nobody
execute=authenticated 
  **/ 
 
 var pubsub = require("pubsub");

function BaseDevice(dto) {
  
  if (dto) {
   
    this.client = dto.client;
  	this.id = dto.id;
  }
}

BaseDevice.prototype._publishChange = function() {
  
  this._createChannel();
  pubsub.publish(this.CHANNEL_NAME, {deviceId:this.id, data: this.getData()});
};

BaseDevice.prototype._createChannel = function() {
  
  var response = pubsub.getChannel(this.CHANNEL_NAME);
  if (response.metadata.status == "failure") {
    var response = pubsub.createChannel(this.CHANNEL_NAME, {subscribeACL: "anonymous", publishACL: "anonymous"});
    console.log(JSON.stringify(response));
  }
};

BaseDevice.prototype._persist = function() {
  var log = require("log");log.setLevel("debug");log.debug("PERSIST");
  storage.global.generic.virtual[this.id] = JSON.parse(JSON.stringify(this));
   var log = require("log");log.debug("END PERSIST");
};

BaseDevice.prototype._generateId = function(prefix) {
  
  var s = "1234567890abcdefghijklmnopqrstuvwxyz";
  var id = prefix;
  for (var i = 0; i < 10; i++) {
    id += s[Math.round(Math.random() * (s.length - 1))];
  }
  
  return id;
};			