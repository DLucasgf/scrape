var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

//var mongoConn = "mongodb://eriu:123456@ds153400.mlab.com:53400/eriu";
//var db;

/*function connect(callback) {
    // Use connect method to connect to the Server 
    MongoClient.connect(mongoConn, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        callback(db);
    });
}*/

function close () {
    db.close();
}

module.exports = {
    /*mongoConn : function() {
        return "mongodb://eriu:123456@ds153400.mlab.com:53400/eriu"
    },*/

   /* connect : function(callback) {
    // Use connect method to connect to the Server 
    MongoClient.connect(mongoConn, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        callback(db);
    });
},*/
connect : function(callback) {
    // Use connect method to connect to the Server 
    var mongoConn = "mongodb://eriu:123456@ds153400.mlab.com:53400/eriu";
    MongoClient.connect(mongoConn, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        callback(db);
    });
},
    
    insertDocuments : function(json, callback) {
        console.log("Insert");
        //var db;

        //this.connect((db) => {
            var mongoConn = "mongodb://eriu:123456@ds153400.mlab.com:53400/eriu";
        MongoClient.connect(mongoConn, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");
       
            console.log("connect db");
            //callback(db);

            //console.log("Insert");
            console.log(db);
            // Get the documents collection 
            var collection = db.collection('documents');
            // Insert some documents 
            collection.insertMany(
                json,
                function(err, result) {
                    assert.equal(err, null);
                    //assert.equal(3, result.result.n);
                    //assert.equal(3, result.ops.length);
                    console.log("Inserted 3 documents into the document collection");
                    callback(db);
            })
        });
        
    }
};