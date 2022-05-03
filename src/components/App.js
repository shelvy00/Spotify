import React from 'react';
import axios from "axios";
import { useEffect } from "react"
import { Buffer } from "buffer";

//require("dotenv").config()

const App = () => {

    const client_id = process.env.CLIENT_ID; // Your client id
    const client_secret = process.env.CLIENT_SECRET; // Your secret 
    
    console.log(client_id)

    // your application requests authorization

    useEffect(() => { 

    axios.post('https://accounts.spotify.com/api/token',{
      headers: {
        'Authorization': 'Basic ' +  (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    })
     .then(tokenResponse => {
       console.log(tokenResponse)
     });
    }, [])

       // use the access token to access the Spotify Web API

    
  return (
    <div>
      Hey
    </div>
  )
}

export default App;
