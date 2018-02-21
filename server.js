
  const path = require('path');
  const http = require('http');
  const express = require('express');
  const adminApiRoute =  require('./apis/adminApis');
  const port = process.env.PORT || 3000;

  const socketUtils = require('./socketutils/SocketUtil');
  const databaseUtils = require('./database/databaseUtils');
  var hbs = require('hbs');
  hbs.registerPartials(__dirname + '/views/partials');


  const publicPath = path.join(__dirname , '../public');
  var app = express();
  app.use(express.static(publicPath));
  app.use('/', adminApiRoute);

  
  app.set('view engine', 'hbs');
  app.get('/',(req, res)=>{
      databaseUtils.fetchFullTable().then((doc)=>{
          var data = {"result":0,
        "response":doc};
          res.render('main.hbs' , data);
        } , (err)=>{
           res.send("error while loading the data ");
        });
  });
  app.get('/about',(req, res)=>{
    res.render('about.hbs', {pageTitle:'About About', currentYear :new Date().getFullYear()});
  });
  app.get('/devicepage',(req, res)=>{
      res.render('devicepage.hbs', {pageTitle:'About About', currentYear :new Date().getFullYear()});
  });
  app.get('/devicemap',(req, res)=>{
      res.render('devicemap.hbs', {pageTitle:'About About', currentYear :new Date().getFullYear()});
  });



  




  var server = http.createServer(app);


  server.listen(port, process.env.IP || "0.0.0.0", function(){
      console.log("**** Server is Up Now ****" , "PORT:"+port);
      socketUtils.createSocketWithServer(server);
  });