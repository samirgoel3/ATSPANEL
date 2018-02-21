
  const MongoClient = require('mongodb').MongoClient;
//   const url = "mongodb://localhost:27017";
  const url = "mongodb://heroku_8t6df7pn:bcdc924jbldp2cuubsesn9ol0@ds127132.mlab.com:27132/heroku_8t6df7pn" ;
  const dbName= "TaxiData";




  MongoClient.connect(url, function(err, client) {
      const col = client.db(dbName).collection('FirstCollection');
      col.insert([{name:"Samir Goel", age:27},{name:"Arjun Pandit", age:232}], {w:1}, function(err, result) {
         if(err){
             return console.log("Unable to connect MongoDb Server");
         }
         console.log(JSON.stringify(result.ops , undefined , 2));
      });

      client.close();
  });


  //
  // MongoClient.connect('mongodb://localhost:27017/TaxiData',(err, db)=>{
  //     if(err){
  //         console.log("Unable to connect to MongoDb Server");
  //     }
  //     console.log("Successfully connected to MongoDB Server");
  //
  //
  //     db.collection('TableFirst').insertOne({
  //         text:"some sample data",
  //         value:4532
  //     }, (err , result)=>{
  //         if(err){
  //             return console.log("Unable to insert to do ")
  //         }
  //         console.log(JSON.stringify(result.ops, undefined , 2));
  //     });
  //
  //     db.close();
  //
  // });