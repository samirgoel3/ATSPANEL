

  const example = require('./databaseUtils');

//   example.saveorUpdateDataToDeviceTable({
//     "unique_no":"YUYW786876",
//     "package_name":"com.apporio.taxi",
//     "altitude": "0.0",
//     "latitude": "28.4170444",
//     "bearing": "345.0",
//     "timestamp": "1518089027232",
//     "speed": "13.8ee9",
//     "accuracy": "3ee7.623",
//     "longitude": "77.0403631",
//     "provider": "fused"
// });

// example.removeSocketConnection("2aebEgDUhrCOiY8HAAAC");

// example.getSocketDetailFromUniqueNo("6627522443ba6107").then((doc)=>{
//   console.log(doc);
// } , (err)=>{
//   console.log(err);
// });


// example.removeSpecificInjector("5a916bc89b89130014a55b3f");

// example.removeSpecificInjector("5a93a0653df48700145c68f8").then((doc)=>{
//   console.log("REMOVED:"+doc);
// } , (err)=>{
//   console.log("ERROR in REMOVING:"+err);
// });

// example.removeAllInjectors().then((doc)=>{
//   console.log("REMOVED DATA:"+doc.length);
// } , (err)=>{
//   console.log("ERROR REMOVED:"+err);
// });

  // example.getInjectorByParticularUniqueNo("66275224ffff43ba6107").then((doc)=>{
  //   console.log("@@@@@@@@@@"+doc);
  // } , (err)=>{
  //   console.log("@@@@@@@@@@@@"+err);
  // });

  // example.getAllUnacknowledgedInjectors().then((doc)=>{
  //   console.log("@@@@@@@@@@:"+JSON.stringify(doc, undefined , 2));
  // } , (err)=>{
  //   console.log("########:"+err);
  // });


  example.viewInjectorById("5a95318dcf917400147f5f5968ff").then((doc)=>{
    console.log("Finding one by ID:"+doc);
  } , (err)=>{
    console.log("Error:"+err);
  });


//  example.fetchFullTable();
