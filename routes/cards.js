var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var database = require('../config/database');

var dbhost = database.url;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cards/index', { title: 'Express' });
});

module.exports = router;

router.get('/search', function(req, res){
   var name = req.name;
   var cardsArray = [];


   MongoClient.connect(dbhost, function(err, db) {
        var db=db.db(database.database);
        if(!err) {
      console.log("Cardname: "+name);
            console.log("We are connected");
            var cardsCollection = db.collection('cards');

            cardsCollection.find({"name": name}).toArray(function(err, cardDocs) {

        console.log("Printing docs from Array")
                cardDocs.forEach(function(card) {
                    console.log("Doc from Array ");
                    console.log(JSON.stringify(card));
                    cardsArray.push(card);

                });
                response = {
                    "cards": cardsArray

                };
                console.log(response);
                res.end(JSON.stringify(response));
                
            });
        }else{
            console.log("error:" +err);
            res.end("error: "+err);
        }
    });
})
