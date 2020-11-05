const express = require('express')
const axios = require('axios')
const app = express()
require('dotenv').config()

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//   res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header,Authorization");
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }
//   return next();   
// });

 
app.get('/', function (req, res) {
  getBearer()
  res.json()
})

function getBearer(){
  const restUrl = process.env.VUE_APP_REST_URL
  const authUrl = process.env.VUE_APP_AUTH_URL

  const body = {
    "grant_type": "client_credentials",
    "client_id": process.env.VUE_APP_CLIENT_ID,
    "client_secret": process.env.VUE_APP_CLIENT_SECRET,
    "scope": "data_extensions_write journeys_execute journeys_read journeys_write email_read email_write email_send saved_content_read saved_content_write",
    "account_id": process.env.VUE_APP_ACCOUNT_ID
  }

  axios.post(authUrl + "/v2/token", body).then((res) => console.log(res))
}
 
app.listen(3000)


/*
    const restUrl = process.env.VUE_APP_REST_URL
      const dataExtension = "B0B5F4DA-CAB7-4C30-89CA-110A36B5F468"
      const token = "eyJhbGciOiJIUzI1NiIsImtpZCI6IjEiLCJ2ZXIiOiIxIiwidHlwIjoiSldUIn0.eyJhY2Nlc3NfdG9rZW4iOiI3ak50VUd3THI4UnZkRWNvYXF0allINnEiLCJjbGllbnRfaWQiOiJzZ3JiNXFtZzlseGR0eTJuaHBocWZoaXoiLCJlaWQiOjcyNzUyODMsInN0YWNrX2tleSI6IlM3IiwicGxhdGZvcm1fdmVyc2lvbiI6MiwiY2xpZW50X3R5cGUiOiJTZXJ2ZXJUb1NlcnZlciJ9.IjCrRtsNSHPiZwIsdp0StfKaCuh-2cjrVnPZmuQlEoc.Rhx6LKEwrkh8FvdgMd96RrOmWK3qjlYZ2XVdhpwrQmDaO9ejx-oQ517kbRQowlYP00LxV_Uh4bjFYFMr0iesUdSXhvUH1n_JlXFPBiBC8BcfTbNZOepruVkf3maW5BQ2OBxAkTtgCP3DKMGE0duXg288DIV0UhjqK82c6PgYMrBdGM0EAV_bvkW";
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      const bodyParameters = {
        "Name": "Bubbz from Vue",
        "Email Address": "Testing@woot.se"
      };
      axios.post(restUrl + `/data/v1/async/dataextensions/key:${dataExtension}/rows`, bodyParameters, config)
      .then(console.log).catch(console.log)

*/