import React from 'react'
import axios from "axios"
require("dotenv").config()

const App = () => {

    const client_id = 'CLIENT_ID'; // Your client id
    const client_secret = 'CLIENT_SECRET'; // Your secret
    
    // your application requests authorization
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };
    
    axios.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
    
        // use the access token to access the Spotify Web API
        const token = body.access_token;
        const options = {
          url: 'https://api.spotify.com/v1/users/jmperezperez',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        axios.get(options, function(error, response, body) {
          console.log(body);
        });
      }
    });


  return (
    <div>
      Hey
    </div>
  )
}

export default App;