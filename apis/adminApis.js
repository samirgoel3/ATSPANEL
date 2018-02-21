

const adminApiRoute = require('express').Router();
const databaseUtils = require('../database/databaseUtils');
const tempSocketData = require('../socketutils/TempSocketData');


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
    console.log("unique_no" ,""+req.query.unique_no);
    console.log("injected_data" , ""+req.query.injected_data);
    res.send("ok");
});


adminApiRoute.get('/upsert',(req , res)=>{
        console.log("*****->" , ""+req.query.trial);
    res.send("some data need to shoew here ");
  });

adminApiRoute.get('/getTotalLiveDevices' , (req , res)=>{
    res.send("Total no of connected devices "+tempSocketData.getHahMapObject().size);
});  






var successResponse = (doc)=>{
return {
    result:1,
    response:doc
}
}


var failureResponse = (message)=>{
return {
    resultc :0,
    response:{
        message:message
    }
}
}




module.exports = adminApiRoute;
