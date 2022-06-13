var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

const https = require('https');

const Paytm = require('paytmchecksum');


app.use(express.json()); 
app.use(express.urlencoded());

app.get('/', function(req, res) {
    console.log(req);
    res.send(JSON.stringify({ Hello: 'World' }));
});
app.post('/generateTxnToken', function(request, res) {
    console.log(request.body);

    var paytmParams = {};


    paytmParams.body = {
        /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
        "mid": "GAZUxq11915126795387",

        /* Enter your unique order id */
        "orderId": "1011202",

    };


    console.log(JSON.stringify(paytmParams));



    //
    var paytmChecksum = Paytm.generateSignature(paytmParams, "4kKNjWsEI9RN9skE");
paytmChecksum.then(function(checksum){
	console.log("generateSignature Returns: " + checksum);
    res.send(checksum);
}).catch(function(error){
	console.log(error);
});
    /**
     * Generate checksum by parameters we have in body
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
     */
    
});

app.listen(port, function() {
    console.log(`Example app listening on port !`);
});