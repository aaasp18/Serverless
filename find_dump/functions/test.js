var a = { location: 'Hv1T5aYoP9K9BPRlN2mI',
  group: 'LyMhbpX2bkDZBZ1VmjU3',
  username: 'aaasp18@gmail.com',
  'wifi-fingerprint': 
   [ { mac: '74:da:da:b8:9e:d6', rssi: -57 },
     { mac: '10:62:eb:78:2a:90', rssi: -79 },
     { mac: '98:0c:a5:64:c9:f4', rssi: -81 },
     { mac: 'c0:ff:d4:b1:84:a6', rssi: -82 },
     { mac: '0c:d2:b5:84:9c:bb', rssi: -85 } ],
  time: 1520346481781 }

var request = require('request');
var options = {
	uri: 'http://maps.goflo.in/learn',
	method: 'POST',
	json: a
};
request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }else{
    if(error){
      console.log(error);
    }else{
      console.log(response.statusCode);
      console.log(body);
    }
  }
});