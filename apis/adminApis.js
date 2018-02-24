

const adminApiRoute = require('express').Router();
const databaseUtils = require('../database/databaseUtils');
const tempSocketData = require('../socketutils/TempSocketData');
const EventBus = require('eventbusjs');





// this will all devices wether it is connected or not
adminApiRoute.get('/getAllDevices', (req, res) => {

    databaseUtils.fetchFullTable().then((doc)=>{
       if(doc!=null){
           res.send(successResponse(doc));
        }else{
            res.send("N Documents found in database");
        }
  } , (err)=>{
     res.send("error while loading the data ");
  });
});



// this wil all unique number whos connection status is tru ie these are live
adminApiRoute.get('/getAllLiveConnections', (req, res) => {
    databaseUtils.fetchAllUniqueNoWithLiveConnection().then((doc)=>{
       if(doc.length !=0){
           res.send(successResponse(doc));
        }else{
            res.send(failureResponse("No Device are live"));
        }
  } , (err)=>{
     res.send("error while loading the data ");
  });
});




adminApiRoute.get('/addInjector',(req, res)=>{
    // console.log("unique_no" ,""+req.query.unique_no);
    // console.log("injected_data" , ""+req.query.injected_data);

    var inj_data_var = {
        "injector_name":""+req.query.injector_name,
        "injector_type":""+req.query.injector_type,
        "unique_no": ""+req.query.unique_no,
        "client_aknowledge":false,
        "injector_data":""+req.query.injector_data};

    databaseUtils.addInjector(inj_data_var).then((doc)=>{
        if(doc.length != 0 ){
            res.send(successResponse(doc));
            sendEventForInjector(doc);
        }else{
            res.send(failureResponse("No Injector added"));
        }
    }, (err)=>{
        res.send(failureResponse(""+err));
    });
});



adminApiRoute.get('/getAllInjectors', (req, res) => {

    databaseUtils.getAllInjectors().then((doc)=>{
       if(doc!=null){
           res.send(successResponse(doc));
        }else{
            res.send("No Injector found in Injector Table");
        }
  } , (err)=>{
     res.send("error while loading the data ");
  });
});




adminApiRoute.get('/upsert',(req , res)=>{
        console.log("*****->" , ""+req.query.trial);
    res.send("some data need to shoew here ");
  });

adminApiRoute.get('/getTotalLiveDevices' , (req , res)=>{
    res.send("Total no of connected devices "+tempSocketData.getHahMapObject().size);
});  



// to add an injector dor a particular device
var sendEventForInjector = (data)=>{
    EventBus.dispatch("injector_pusher", data );

    
    databaseUtils.getSocketDetailFromUniqueNo(""+data.unique_no).then((doc)=>{
        if(doc==null){
            console.log("Unable to find the socket_id with respective unique no");
        }else{
            data.socket_id = ""+doc[0].socket_id;
            
        }
    } , (err)=>{
        console.log("ERROR in finding the socket_id with respective unique no:"+err);
    });
    
}




var successResponse = (doc)=>{
return {
    result:1,
    response:doc
}
}


var failureResponse = (message)=>{
return {
    result:0,
    response:{
        message:message
    }
}
}




module.exports = adminApiRoute;
