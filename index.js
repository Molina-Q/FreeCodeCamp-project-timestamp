// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

/***** route structure *****/ 
// route_path: '/api/:date'
// actual_request_URL: '/api/2015-12-25'
// actual_request_URL: '/api/1451001600000'
// req.params: {date: 1451001600000} 
// req.params: {date: 2015-12-25} 
/***************************/
app.route('/api/:date?')
  .get(function (req, res, next) {
    givenDate = req.params.date;
    errorEmpty = false;
    givenDateInt = parseInt(req.params.date);

    if(!req.params.date) {
      //if(typeof givenDate  === "undefined") {
      errorEmpty = true;
    }

    if (errorEmpty) { // case where the given date is empty
      dateNow = new Date();

      unixString = Date.parse(dateNow);
      unixTime = parseInt(unixString);

      utcTime = new Date(dateNow).toUTCString();

      objectSent = {unix: unixTime, utc: utcTime};

    } 
    
    else if (new Date(parseInt(givenDate)).toString() === "Invalid Date" ) { // case where the given date is empty
      objectSent = {error: "Invalid Date"};
    } 

    else if (givenDate.includes('-')) { // case where the given date is 2015-12-12
      objDate = new Date(givenDate);

      unixString = Date.parse(objDate);
      unixTime = parseInt(unixString);

      utcTime = objDate.toUTCString();

      objectSent = {unix: unixTime, utc: utcTime};


    } else { // case where the given date is 1616608200

      unixTime = parseInt(givenDate);

      objDate = new Date(unixTime);

      utcTime = objDate.toUTCString();

      objectSent = {unix: unixTime, utc: utcTime};

    }
    console.log( new Date(parseInt(givenDate)).toString() );
    
    next();
  }, function(req, res) {
    res.send(objectSent);
  })

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
