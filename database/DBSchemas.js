

  var mongoose = require('mongoose');


  var Main_Devices = mongoose.model('main_devices', {
      //locational data
    latitude:{type: String, required:true, minLength:1, trim:true},
    longitude:{type: String, required:true, minLength:1, trim:true},
    bearing:{type: String, required:true, minLength:1, trim:true},
    altitude:{type: String, required:true, minLength:1, trim:true},
    accuracy:{type: String, required:true, minLength:1, trim:true},
    speed:{type: String, required:true, minLength:1, trim:true},
    provider:{type: String, required:true, minLength:1, trim:true},
      // device data
    unique_no:{type: String, required:true, minLength:1, trim:true},
    brand:{type: String, required:true, minLength:1, trim:true},
    model:{type: String, required:true, minLength:1, trim:true},
    connection_strength:{type: String, required:true, minLength:1, trim:true},
    device_type:{type: String, required:true, minLength:1, trim:true},
    fingerprints:{type: String, required:true, minLength:1, trim:true},
    manufacture:{type: String, required:true, minLength:1, trim:true},
    operating_system:{type: String, required:true, minLength:1, trim:true},
      //app data
     merchant_key:{type: String, required:true, minLength:1, trim:true},
     bundle_identifier:{type: String, required:true, minLength:1, trim:true},
     version_name:{type: String, required:true, minLength:1, trim:true},
     version_code:{type: String, required:true, minLength:1, trim:true},
     permission_phone_call:{type: String, required:true, minLength:1, trim:true},
     permission_phone_location:{type: String, required:true, minLength:1, trim:true},
     permission_phone_read_storage:{type: String, required:true, minLength:1, trim:true},
     permission_phone_write_storage:{type: String, required:true, minLength:1, trim:true},
     permission_phone_camera:{type: String, required:true, minLength:1, trim:true},
     app_running_status:{type: String, required:true, minLength:1, trim:true}
  });

  var Socket_Connection = mongoose.model('socket_connection', {
    socket_id:{type: String, required:true, minLength:1, trim:true},
    unique_no:{type: String, required:true, minLength:1, trim:true},
    timestamp:{type: String, required:true, minLength:1, trim:true},
    connected_status:{type: Boolean, required:true}
});


var injector = mongoose.model('injector', {
    injector_name:{type: String, required:true, minLength:1, trim:true},
    injector_type:{type: String, required:true, minLength:1, trim:true},
    unique_no:{type: String, required:true, minLength:1, trim:true},
    client_aknowledge:{type: Boolean, required:true},
    injector_data:{type: JSON, required:true, minLength:1}
});



  module.exports = {
      Main_Devices,
      Socket_Connection,
      injector
  };