require('rootpath')();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use('/public', require('./route/public.route'));


app.all('*', (req, res) => {
    res.status(404).send('404! Page not found ');
});

// app.use(function (req, res, next) {
//       res.status(404).send("404! Page not found ")
// })

const port = 4001;
const server = app.listen(port,   () => {
    console.log('Server listening on port ' + port);
    console.log(process.version);
}).on('error', function(err){
    console.log('on error handler');   
    console.log(err);
});