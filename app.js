const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//const fs  = require('fs');

// assign express to variable and that is
var app = express();

/*
var logger = function (req, res, next){
    console.log('Logging ...');
};

app.use(logger);
*/



// bodyParser Middleware for parsing html page
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// View Engine - Middleware for EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

// our static folder definition
app.use(express.static(path.join(__dirname, 'public')));

// node is asynchron and doesn't wait for a function to finish 3

app.get ('/image', (req, res) => {
    let readStream = fs.createReadStream(__dirname + '/public/img/photo.jpg')

    // When the stream is done being read, end the response
    readStream.on('close', () => {
        res.end()
    })

    // Stream chunks to response
    readStream.pipe(res);
    console.log(res);
});

app.get('/', function (req, res) {

    res.render('index.html');
    //res.send('Hello World!');
    //res.json(jsonObj);

})

app.get('/quickstart.html', function (req, res) {

    res.render('quickstart.html');
    //res.send('Hello World!');
    //res.json(jsonObj);

})



// Configure routes
app.use('/', require('./lib/routes'));

//app.use('/vision',require('./test_annotate_remote'));

app.listen(8080, function () {
    console.log("Server started on Port 8080 ... ");

});

module.exports = app;