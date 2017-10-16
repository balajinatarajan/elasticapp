console.log('hello');
var elasticsearch = require('elasticsearch');
var index_name = 'events';
//evaluates another js
require('./data.js')();

//console.log(json.length);
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info'
});

function deleteIndex(){
    //delete index
    client.indices.delete({
        index: index_name,
        ignore: [404]
    }).then(function(body){
        //since we ignore 404, promise is resolved even if the index never existed
        console.log('index deleted or never existed');
    },function(error){
        //oh, no!
    });
}

function createIndex(){
    client.indices.create({
        index: index_name,
        ignore: [404]
    }).then(function(body){
        //since we ignore 404, promise is resolved even if the index never existed
        console.log('index created');
    },function(error){
        //oh, no!
        console.log('index NOT created');
    });
}

function bulkImport(){
    var body = [];
    for(var i = 0; i < json.length; i++){
        var record = { index:  { _index: index_name, _type: "event", _id: (i+1+'') } };
        body.push(record);
        body.push(json[i]);
    }
    console.log(body[0]);
    client.bulk({
        body: body
    }, function(err,res){
        console.log('Error importing data : ' + err + ', response hits: ' + res.hits);
    });
}

//createIndex();
//deleteIndex();
bulkImport();



