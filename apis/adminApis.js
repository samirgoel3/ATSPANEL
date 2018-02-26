

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

adminApiRoute.get('/removeInjectorById' , (req , res)=>{

    databaseUtils.removeSpecificInjector(""+req.query.injector_id).then((doc)=>{
        if(doc != null){
            res.send(successResponse(doc));
        }else{
            res.send(failureResponse("Found no item according to submitted injector_id"));
        }
    } , (err)=>{
        res.send(failureResponse("error:"+err));
    });
});  



adminApiRoute.get('/removeAllInjectors',(req , res)=>{
    databaseUtils.removeAllInjectors().then((doc)=>{
        if(doc == null || doc == undefined || doc.length == 0){
            res.send(failureResponse("It seemes like you have already cleared the table"));
        }else{
            res.send(successResponse(doc));
        }
    } , (err)=>{
        res.send(failureResponse("error:"+err));
    });
});



adminApiRoute.get('/getInjectorByUniqueNo',(req , res)=>{
   
    databaseUtils.getInjectorByParticularUniqueNo("66275224ffff43ba6107").then((doc)=>{
        if(doc == null){
            res.send(failureResponse("It seems this unique_id does not exsist.:"+req.query.unique_no));
        }else{
            res.send(successResponse(doc));
        }
      } , (err)=>{
        res.send(failureResponse("Error:"+err));
      });


});







// to add an injector dor a particular device
var sendEventForInjector = (data)=>{
    EventBus.dispatch("injector_pusher", data );    
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
