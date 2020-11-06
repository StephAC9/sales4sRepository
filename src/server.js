const express = require('express')
const axios = require('axios')
const app = express()
const unirest = require("unirest");

require('dotenv').config()

app.use(express.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header,Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  return next();   
});

const authUrl = process.env.VUE_APP_AUTH_URL;
const restUrl = process.env.VUE_APP_REST_URL;
 
app.get('/auth', function (req, res) {
  const body = {
    "grant_type": "client_credentials",
    "client_id": process.env.VUE_APP_CLIENT_ID,
    "client_secret": process.env.VUE_APP_CLIENT_SECRET,
    "scope": "list_and_subscribers_read data_extensions_write journeys_execute journeys_read journeys_write email_read email_write email_send saved_content_read saved_content_write",
    "account_id": process.env.VUE_APP_ACCOUNT_ID
  }

  axios.post(authUrl + "/v2/token", body)
    .then((reponse) => res.json({token: reponse.data}))
    .catch((reponse) => res.json({error: "error :("}))
})

app.post('/post', function(req, res) {
  const token = req.body.token;
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const eventDefinitionKey = "APIEvent-26570a64-c26a-4e65-bf2c-d76f554e36db"
  const journeyBody = {
    "ContactKey": req.body.user.userID,
    "EventDefinitionKey": eventDefinitionKey,
    "Data": {
        "age": req.body.user.age,
        "preference": req.body.user.preference,
        "imageurl": req.body.user.Imageurl,
        "opt_in": req.body.user.opt_in,
        "Email": req.body.user.email,
        "Name": req.body.user.name,
        "userid": req.body.user.userID
    }
  }
  axios.post(restUrl + "/interaction/v1/events", journeyBody, config)
    .then(res => console.log("Journey send status:", res.status))
    .catch((res) => console.log(res))
  res.json();
})

app.post('/checkImage', function(req, res) {
  var request = unirest("GET", "https://api.imagga.com/v2/tags");
  console.log(req.body)
  request.query({
    "image_url": req.body.url,
    "version": "2"
  });
  
  request.headers({
    "accept": "application/json",
    "authorization": "Basic YWNjXzI1OTAxZjg2NjJhMTlkNDpmZDM2MGU0MjM0MmM5Mzk4YmU5YjcxYjc5OGYwYjAxYg=="
  });
  
  let results = ""
  request.end(function (reqResponse) {
    if (reqResponse.error) res.json();
    results = reqResponse.body;
    res.json(results)
  });
})

// app.post('/update', function(req, res) {
//   const dataExtension = "0B84CE02-535F-4427-A096-18DC67477A7B"
//   const token = req.body.token; 
//   console.log(req.body)
//   req.body.user.userID = '111111111111'
//   const bodyParameters = {
//     "items": [{
//       ...req.body.user
//     }]
//   };
//   const config = {
//     headers: { Authorization: `Bearer ${token}` }
//   }
//   axios.post(restUrl + `/data/v1/async/dataextensions/key:${dataExtension}/rows`, bodyParameters, config)
//     .then((res) => console.log(res.status))
//     .catch((res) => console.log(res.status))
//   res.json();
// })
 
app.listen(3000)