import axios from 'axios';
import React, { useEffect } from 'react'
import { Buffer } from 'buffer';

const SearchBar = () => {
  
  const client_id = process.env.REACT_APP_CLIENT_ID; // Your client id
  const client_secret = process.env.REACT_APP_CLIENT_SECRET; // Your secret 
  
  
  console.log(client_id)

    // your application requests authorization

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

  return (
    <div>
      SearchBar
    </div>
  )
}

export default SearchBar;
