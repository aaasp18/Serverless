const functions = require('firebase-functions');
var request = require('request');
var async = require('async');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.dump = functions.firestore
  .document('fingerprints/{fingerprintID}')
  .onCreate(event => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    var newValue = event.data.data();

    // access a particular field as you would any JS property
    // var name = newValue.name;
    var collection = [];
    var location = newValue['roomId'];
    var group = newValue['locationId'];
    var username = newValue['email'];

    async.forEachOf(newValue['data'], (value, key, callback) => {
        var entry = {};
        entry["group"] = group;
        entry["username"] = username;
        entry["location"] = location;
        entry["time"] = value["timestamp"];
        entry["wifi-fingerprint"] = [];
        for(var index in value["fingerprint"]){
          var obj = value["fingerprint"][index];
          var f = {};
          f["mac"] = obj["bssid"];
          f["rssi"] = obj["level"];
          entry['wifi-fingerprint'].push(f);
        }
        console.log(JSON.stringify(entry));
        var options = {
          url: 'http://maps.goflo.in/learn',
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(entry)
        };
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body);
            callback();
          }else{
            if(error){
              console.log(error);
            }else{
              console.log(response.statusCode);
              console.log(body);
            }
          }
        });
    }, err => {
        if (err) console.error(err.message);

        var calculateOptions = { 
          method: 'GET',
          url: 'http://maps.goflo.in/calculate',
          qs: { group: group }
        };

        request(calculateOptions, function (calculateError, calculateResponse, calculateBody) {
          if (calculateError){
            //throw new Error(calculateError);
            console.error(calculateError);
          }
          console.log(calculateBody);
          event.data.ref.set(
            {
              pushed: true,
              calculateMessage: calculateBody
            }, 
            {merge: true}
          );
        });
    });

    return true; 
    // perform desired operations ...
});