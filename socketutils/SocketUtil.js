
const socketIO =  require('socket.io');
const tempSocketData = require('./TempSocketData');
const databaseUtils = require('../database/databaseUtils');
const EventBus = require('eventbusjs');
const util = require('util')


var adminIO = null ; 
var io = null;
var datetime = null;


function injectorPusher(event) {

    console.log("##### Socket_id:"+event.target.socket_id);
    console.log("##### Unique_No:"+event.target.unique_no);
    console.log("##### Data to inject:"+event.target.injector_data);
    io.sockets.connected[event.target.socket_id].emit("app_data", "Howdy, User 1!");
  }
  EventBus.addEventListener("injector_pusher", injectorPusher);



  function createSocketWithServer(server){
    getSocketIO(server).on('connection', function (socket) {

        socket.on('update_connection', function(data , ack){
            var parsed_data = JSON.parse(data);
            ack('received');
            databaseUtils.addSocketConnection({
                "socket_id":""+socket.id,
                "unique_no":""+parsed_data.unique_no,
                "timestamp": ""+getDate(),
                "connected_status":true});
        });

        socket.on('disconnect', function () {

            databaseUtils.disconnectSocketConnection({
                
                "socket_id":""+socket.id,
                "timestamp": ""+getDate(),
                "connected_status":false})
        });

        socket.on('connect_admin', function(msg , ack){
            ack('received');
            socket.join('admin_room');

        });


        socket.on('app_data', function(msg, ack){

            var data = JSON.parse(msg);
            var date = ""+new Date();
            ack('received');
            databaseUtils.saveorUpdateDataToDeviceTable({
                "unique_no":""+data.device_data.unique_no,
                "package_name":""+data.app_data.bundle_identifier,
                "device_info":""+data.device_data.manufacture+","+data.device_data.model,
                "altitude": ""+data.location_data.altitude,
                "latitude": ""+data.location_data.latitude,
                "bearing": ""+data.location_data.bearing,
                "timestamp": ""+getDate(),
                "speed": ""+data.location_data.speed,
                "accuracy": ""+data.location_data.accuracy,
                "longitude": ""+data.location_data.longitude,
                "provider": ""+data.location_data.provider
            });
           

            io.to('admin_room').emit('admin_data' , ""+msg);

        });

    });
}





  //////////// INNER FUNCTIONS //////////
  function getDateVariable(){
    if(datetime == null){
        datetime = new Date();
        return datetime ;
    }else {
        return datetime ;
    }
}


  function getSocketIO(server){
    if(io == null){
         io = socketIO(server);
        return io ;
    }else {
        return io ;
    }
}


function getDate(){
    var date = ""+new Date();
    return ""+date.replace("GMT+0530 (IST)" , "");

}





module.exports ={
    createSocketWithServer,
};



