
const socketIO =  require('socket.io');
const tempSocketData = require('./TempSocketData');
const databaseUtils = require('../database/databaseUtils');
const EventBus = require('eventbusjs');
const util = require('util');
var HashMap = require('hashmap');




var adminIO = null ; 
var io = null;
var datetime = null;
var mInjectorIntervals =  new HashMap();


function insideInjector(event){
    databaseUtils.getSocketDetailFromUniqueNo(""+event.target.unique_no).then((doc)=>{
        if(doc==null){
            console.log("Unable to send data on the selected unique no");
        }else{
            console.log("sending data to particular device:"+doc[0].socket_id);
            // console.log("List of connected sockets :"+io.sockets.clients()[0]);
            
            try{
                io.sockets.connected[doc[0].socket_id].emit("app_data", ""+event.target.injector_data);
            }catch(exception){
                console.log("Cought some exception while emiiting event to particular socketid :"+exception)
            }
        }
    } , (err)=>{
        console.log("ERROR in finding the socket_id with respective unique no:"+err);
    });
}

function injectorPusher(event) {
    // insideInjector(event);
  
    mInjectorIntervals.set(""+event.target.unique_no, setInterval(()=>{
        databaseUtils.getSocketDetailFromUniqueNo(""+event.target.unique_no).then((doc)=>{
            if(doc==null){
                console.log("Unable to send data on the selected unique no");
            }else{
                console.log("sending data to particular device:"+doc[0].socket_id);
                // console.log("List of connected sockets :"+io.sockets.clients()[0]);
                
                try{
                    io.sockets.connected[doc[0].socket_id].emit("app_data", ""+ JSON.stringify(event.target , undefined, 2));
                }catch(exception){
                    console.log("Cought some exception while emiiting event to particular socketid :"+exception)
                }
            }
        } , (err)=>{
            console.log("ERROR in finding the socket_id with respective unique no:"+err);
        })
    }, 2500));
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
                "latitude": ""+data.location_data.latitude,
                "longitude": ""+data.location_data.longitude,
                "bearing": ""+data.location_data.bearing,
                "altitude": ""+data.location_data.altitude,
                "accuracy": ""+data.location_data.accuracy,
                "speed": ""+data.location_data.speed,
                "provider": ""+data.location_data.provider,

                "unique_no":""+data.device_data.unique_no,
                "brand":""+data.device_data.brand,
                "model":""+data.device_data.model,
                "connection_strength":""+data.device_data.connection_strength,
                "device_type":""+data.device_data.device_type,
                "fingerprints":""+data.device_data.fingerprints,
                "manufacture":""+data.device_data.manufacture,
                "operating_system":""+data.device_data.operating_system,

                "merchant_key":""+data.app_data.merchant_key,
                "bundle_identifier":""+data.app_data.bundle_identifier,
                "version_name":""+data.app_data.version_name,
                "version_code":""+data.app_data.version_code,
                "permission_phone_call":""+data.app_data.permission_phone_call,
                "permission_phone_location":""+data.app_data.permission_phone_location,
                "permission_phone_read_storage":""+data.app_data.permission_phone_storage,
                "permission_phone_write_storage":""+data.app_data.permission_phone_storage,
                "permission_phone_camera":""+data.app_data.permission_phone_camera,
            }).then((doc)=>{
                io.to('admin_room').emit('admin_data' , ""+JSON.stringify(doc , undefined , 2));
            } , (err)=>{
                io.to('admin_room').emit('admin_data' , "getting some error");
            });
           
            

        });



        socket.on('injector_received',function(msg , ack){
            // need to work over this method therefore commiting from this thread over git
            var data = JSON.parse(msg);
        
            var inj_data_var = {
                "injector_name":""+data.injector_name,
                "injector_type":""+data.injector_type,
                "unique_no": ""+data.unique_no,
                "client_aknowledge":true,
                "injector_data":""+data.injector_data};


                databaseUtils.updateInjector(inj_data_var).then((doc)=>{
                    if(doc == null){
                        console.log("After updating the injector row it is giving us a null doc therefore interval is not cleared");
                    }else{
                        clearInterval(mInjectorIntervals.get(""+data.unique_no));
                        mInjectorIntervals.remove(""+data.unique_no);
                    }
                } , (err)=>{
                    console.log("Error While marking injector as true:"+err);
                });

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



