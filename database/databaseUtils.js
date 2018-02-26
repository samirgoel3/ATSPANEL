
  const {MongoClient} = require('./mongoClient');
  const {Main_Devices} = require('./DBSchemas');
  const {Socket_Connection} = require('./DBSchemas');
  const {injector} = require('./DBSchemas');



  // main_device table methods
  var createNewRowInDatabase = (data) =>{
      return new Main_Devices(data).save().then((doc)=>{
             return doc ;
      }, (err)=>{
          return err ; 
      });
  }

  var fetchFullTable = () =>{
      return Main_Devices.find().then((doc)=>{
          return doc ; 
      }, (err)=>{
          return err ; 
      });
  }

  var saveorUpdateDataToDeviceTable = (data)=>{
      return  Main_Devices.findOneAndUpdate({"unique_no":""+data.unique_no}, data).then((doc)=>{
          if(doc == null){
              return createNewRowInDatabase(data);
          }else{
            return doc ; 
          }
      }, (err)=>{
          return err ; 
      });
  }



 





  // socket connection methods 
  var createNewRowinSocketConnectionTable = (data)=>{
    new Socket_Connection(data).save().then((doc)=>{
        console.log("New Devices added in socket connection table" , JSON.stringify(doc, undefined, 2));
     }, (err)=>{
        console.log("ERROR In Adding device in adding socket_connection table" , err);
    });
  }

  var addSocketConnection=(data)=>{
      console.log("Updating uniqueno"+data.unique_no+"with socket_id:"+data.socket_id);
    Socket_Connection.findOneAndUpdate({"unique_no":""+data.unique_no}, data).then((doc)=>{
        if(doc == null){
            createNewRowinSocketConnectionTable(data);
        }else{
          console.log("ROW UPDATED in socket connection table :"+doc);
        }
    }, (err)=>{
        console.log("ERROR ROW UPDATE socket_connection table:"+err);
    });
  }

  var disconnectSocketConnection=(data)=>{
    Socket_Connection.findOneAndUpdate({"socket_id":""+data.socket_id},data).then((doc)=>{
        if(doc == null){
            console.log("Found no row to update in socket_connection table");
        }else{
          console.log("ROW UPDATED in socket connection table :"+doc);
        }
    }, (err)=>{
        console.log("ERROR ROW UPDATE socket_connection table:"+err);
    });
  }

  var updateSocketConnection = (data)=>{
    Socket_Connection.findOneAndUpdate({"unique_no":""+data.unique_no}, data).then((doc)=>{
        if(doc == null){
            console.log("Found no row to update in socket connection");
        }else{
          console.log("ROW UPDATED in Socket_connection collection"+doc);
        }
    }, (err)=>{
        console.log("ERROR ROW UPDATE:  socket_connection collection "+err);
    });
  }

  var fetchAllUniqueNoWithLiveConnection = () =>{
    return Socket_Connection.find({"connected_status":true}).then((doc)=>{
        return doc ; 
    }, (err)=>{
        return err ; 
    });
}
  
  var getSocketDetailFromUniqueNo = (unique_no)=>{
    return Socket_Connection.find({"unique_no":unique_no}).then((doc)=>{
        if(doc.length != 0 ){return doc;}else{return null;}
    }, (err)=>{
        return err ; 
    });
  }







  //inject table methods 
  var addInjector=(data)=>{
    return new injector(data).save().then((doc)=>{
        console.log("New Injector added in Injector Table" , JSON.stringify(doc, undefined, 2));
        return doc ; 
     }, (err)=>{
        console.log("ERROR In Adding injector in adding injector table" , err);
        return err ;
    });
  }

  var getAllInjectors=()=>{
    return injector.find().then((doc)=>{
        return doc ; 
    }, (err)=>{
        return err ; 
    });
  }

  var removeSpecificInjector = (id)=>{  // this method will return null in promise if there is no data according to specific id
    return injector.findByIdAndRemove(id).then((doc)=>{
        return doc ; 
    } , (err)=>{
          return err;
    });
  }

  var removeAllInjectors = ()=>{

    return injector.remove({}).then((doc)=>{
        return doc ; 
    } ,(err)=>{
        return err ; 
    });
  }

  var updateInjector = (data)=>{
   return injector.findOneAndUpdate({"unique_no":""+data.unique_no}, data).then((doc)=>{
        if(doc == null){
            // console.log("Found no row to update in socket connection");
            return null ; 
        }else{
        //   console.log("ROW UPDATED in Socket_connection collection"+doc);
          return doc ; 
        }
    }, (err)=>{
        // console.log("ERROR ROW UPDATE:  socket_connection collection "+err);
        return err ; 
    });
  }


  module.exports = {
       createNewRowInDatabase,
       fetchFullTable,
       saveorUpdateDataToDeviceTable,
       addSocketConnection,
       disconnectSocketConnection,
       updateSocketConnection,
       fetchAllUniqueNoWithLiveConnection,
       addInjector,
       getSocketDetailFromUniqueNo,
       getAllInjectors,
       removeSpecificInjector,
       removeAllInjectors,
       updateInjector
  };