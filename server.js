var express = require('express');
var app =  express.createServer();

app.use(express.bodyParser());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', function(req, res){
    res.render('index');

});

app.listen(process.env.PORT || 9292);

var BinaryServer = require('binaryjs').BinaryServer;
var server = BinaryServer({port: 9000});
console.log('listening at ' + 9000);

var client1 = null,
    client2 = null;
var clients = {};

server.on ('connection', function(client) {
  console.log('Received connection from client');
  
  if(clients['client0'] == null)
    client.num = 0;
  else if(clients['client1'] == null)
    client.num = 1;
  else {
    console.log('unused client connection');
    return;
  }
    clients['client' + client.num] = client;
    console.log('processing client ' + client.num);

    client.on('stream', function(stream, meta){
    nclient = clients['client' + ((client.num + 1) % 2)];
    if (nclient == null)
        return;
        outs = nclient.createStream();
        stream.pipe(outs);
        
        stream.on('end', function() {
          outs.end();
        });
    });

    client.on('close', function(){
      clients['client' + client.num]= null;
    });

});
