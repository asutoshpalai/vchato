var express = require('express');
var app =  express.createServer();

app.use(express.bodyParser());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', function(req, res){
    res.render('index');

});

app.listen(9292);

var BinaryServer = require('binaryjs').BinaryServer;
var server = BinaryServer({port: 9000});
console.log('listening at ' + 9000);

var client1 = null,
    client2 = null;

server.on ('connection', function(client) {
  console.log('Received connection from client');
  
  if(client1 == null){
    client.num  = 1;
    client1 = client;
    console.log('processing client ' + client.num);

    client.on('stream', function(stream, meta){
      if (client2 == null)
        return;
        nclient = client2;
        outs = nclient.createStream();
        outs.pipe(stream);
        
        stream.on('end', function() {
          outs.end();
        });
    });

    client.on('close', function(){
      client1 = null;
    });

  }
  else if(client2 == null) {
    client.num  = 2;
    client2 = client;
    console.log('processing client ' + client.num);

    client.on('stream', function(stream, meta){
      if (client1 == null)
        return;
        nclient = client1;
        outs = nclient.createStream();
        outs.pipe(stream);
        
        stream.on('end', function() {
          outs.end();
        });

    });

    client.on('close', function(){
      client2 = null;
    });

  }
  else {
    console.log("unused client connecion");
  }
});
