const express = require('express')
const axios = require('axios')
const app = express()
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
    "scope": "data_extensions_write journeys_execute journeys_read journeys_write email_read email_write email_send saved_content_read saved_content_write",
    "account_id": process.env.VUE_APP_ACCOUNT_ID
  }

  axios.post(authUrl + "/v2/token", body)
    .then((reponse) => res.json({token: reponse.data}))
    .catch((reponse) => res.json({error: "error :("}))
})

app.post('/post', function(req, res) {
  const dataExtension = "Sales4sSubscribers-DE"
  const token = req.body.token; //"eyJhbGciOiJIUzI1NiIsImtpZCI6IjEiLCJ2ZXIiOiIxIiwidHlwIjoiSldUIn0.eyJhY2Nlc3NfdG9rZW4iOiI3QXhPakpKbUVvMnVxVnk0cEdCSTVKVEQiLCJjbGllbnRfaWQiOiJzZ3JiNXFtZzlseGR0eTJuaHBocWZoaXoiLCJlaWQiOjcyNzUyODMsInN0YWNrX2tleSI6IlM3IiwicGxhdGZvcm1fdmVyc2lvbiI6MiwiY2xpZW50X3R5cGUiOiJTZXJ2ZXJUb1NlcnZlciJ9.KnKFkzmVX38yDbw0l0OZQRixyCbtthrXRTt4g0WHzFA.poVoj6tmIWChUARoinGdvNGEnk5QqE5hdMwXL0k619qTGTSFoZoE05JZyGxD1VqALgmrSRaCc_02BxveTvEWZngp1HA8Fxo2f8q79-DiHZ5ylgE_jo7EEaU2T5l_JYWgQmHzGgHpQxbvdMpLxnwdVOl8bLfw19jqZMPLBsiAt1lFGrR_7gOdiFP";
  console.log(req.body)
  const bodyParameters = {
    "items": [
      req.body.user
    ]
  };
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  axios.post(restUrl + `/data/v1/async/dataextensions/key:${dataExtension}/rows`, bodyParameters, config)
    .then((res) => console.log(res.status))
    .catch((res) => console.log(res.status))
  res.json();
})
 
app.listen(3000)