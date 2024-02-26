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
  .get(function (req, res) {
    let dateString = req.params.date;
    let dateObject = new Date(dateString);

    let errorEmpty = false;

    if(!req.params.date) {
      errorEmpty = true; 
    }

    if (errorEmpty) { // case where the given date is empty
      dateNow = new Date();
      unixString = Date.parse(dateNow);

      res.json({ unix: parseInt(unixString), utc: dateNow.toUTCString()});

    } else if (/\d{5,}/.test(dateString)) { // case where the given date is this format 1616608200
      let unixTime = parseInt(dateString);

      res.json({ unix: unixTime, utc: new Date(unixTime).toUTCString()});

    } else if (dateObject.toString() === "Invalid Date" ) { // case where the given date is not valid
      res.json({ error: "Invalid Date" });

    } else { // case where the given date is this format 2015-12-12
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString()});

    } 

  })

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});