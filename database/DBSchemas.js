

  var mongoose = require('mongoose');


  var Main_Devices = mongoose.model('main_devices', {
      unique_no:{type: String, required:true, minLength:1, trim:true},
      package_name:{type: String, required:true, minLength:1, trim:true},
      device_info:{type: String, required:true, minLength:1, trim:true},
      latitude:{type: String, required:true, minLength:1, trim:true},
      longitude:{type: String, required:true, minLength:1, trim:true},
      accuracy:{type: String, required:true, minLength:1, trim:true},
      altitude:{type: String, required:true, minLength:1, trim:true},
      timestamp:{type: String, required:true, minLength:1, trim:true},
      bearing:{type: String, required:true, minLength:1, trim:true},
      speed:{type: String, required:true, minLength:1, trim:true},
      provider:{type: String, required:true, minLength:1, trim:true}
  });

  var Socket_Connection = mongoose.model('socket_connection', {
    socket_id:{type: String, required:true, minLength:1, trim:true},
    unique_no:{type: String, required:true, minLength:1, trim:true},
    timestamp:{type: String, required:true, minLength:1, trim:true},
    connected_status:{type: Boolean, required:true}
});


  module.exports = {
      Main_Devices,
      Socket_Connection
  };