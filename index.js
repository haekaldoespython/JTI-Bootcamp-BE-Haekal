const express = require('express'); //buat receive semua request dari client (ini dibantu sama express ini)
//ini sebelumnya kita udah download package dari npm
// ini kita panggil functionnya untuk ngehandle client request
// ini kita declare kalo kita mau pake module express
const bodyParser = require('body-parser'); 
//body parser untuk ngebaca request dari client kita
//sama ini juga module

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors"); //ini untuk security
app.use(cors({ origin: "*"}));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}))

const apiV1 = require('./api/v1/routing');
app.use('/api/v1', apiV1); //ngepoint ke folder api/v1

//get hostname
let hostname;
if (process.env.VCAP_APPLICATION){
    const vcap = JSON.parse(process.env.VCAP_APPLICATION);
    hostname = 'https://' + vcap.application_uris[0];
} else {
    hostname = `http://localhost:${port}`;
}

app.listen(port, function() {
    console.log('Listening at port 3000');
})

module.exports = app;