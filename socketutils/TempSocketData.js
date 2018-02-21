

 const hashMap = require('hashmap');
 var socket_temp_hash = null;


 function addSocket(socket_id , timestamp){
     getHahMapObject().set(""+socket_id , ""+timestamp);
     console.log("New Device in TempSocketData :"+socket_id);
     printSocketHashSize();
 }

 function removeSocket(socket_id){
     getHahMapObject().remove(""+socket_id);
     console.log("Device remove from TempSocketData :"+socket_id);
     printSocketHashSize();
 }

 function getHahMapObject(){
     if(socket_temp_hash == null){
         socket_temp_hash =  new hashMap();
         return socket_temp_hash ;
     }else {
         return socket_temp_hash ;
     }
 }






/////// INNER FUNCTION ////////////
 function printSocketHashSize() {
     console.log("Total connected devices--->" , ""+getHahMapObject().size);
 }






 module.exports = {
     addSocket,
     removeSocket,
     printSocketHashSize,
     getHahMapObject
 };