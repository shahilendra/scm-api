const express = require("express");
const app = express();
const path = require('path');
const config = require("./config");
const port = config.port;
const isTestSetup = config.isTestSetup;

const bodyParser = require('body-parser');
const dir = path.join(__dirname, 'assets/images');
const cors = require('cors');
const email = require('./smtp-mail');
app.use(cors({
  'allowedHeaders': ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-access-token'],
  'exposedHeaders': ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-access-token'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

if(isTestSetup) {
	require('./config/setup');
	//email.testEmail();
}
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(require('./request-log'));
app.use('/api/v1/resources', express.static(dir));

app.use('/api', require('./routes')); // tested

app.listen(port, () => {
    console.log("Server listening on port " + port);
});