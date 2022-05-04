
import axios from 'axios';
import Songs from './Songs';
import React, { useEffect, useState } from 'react'
import { Buffer } from 'buffer';


const client_id = process.env.REACT_APP_CLIENT_ID; // Your client id
const client_secret = process.env.REACT_APP_CLIENT_SECRET; // Your secret

const SearchBar = () => {
  
  const [term, setTerm] = useState("");
  const [songResults, setSongResults] = useState([]);
  const [token, setToken] = useState("")  
  
  //console.log(client_id)

    // your application requests authorization

   useEffect(() => { 
    axios('https://accounts.spotify.com/api/token',{
      headers: {
        'Authorization': 'Basic ' +  (new Buffer.from( client_id + ':' + client_secret ).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      data: "grant_type=client_credentials",
      method: "POST"
     })
     .then(res => {
       console.log(res)
       setToken(res.data.access_token);
     }).then(res => { 
         axios("https://api.spotify.com/v1/search", {
           method: "GET",
           headers: {
               "Authorization": `Bearer ${token}`,
           },
           params: {
               q: term,
               type: "track"
           }
       }) 
      
       .then (response => {
           if (!term) return setSongResults([])
           if (!token) return

           console.log(response)
           setSongResults(response.data.tracks.items.map((song) => {
            const smallestImage = song.album.images.reduce((smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
            }, song.album.images[0]);
            return{
                image: smallestImage.url,
                title: song.name,
                link: song.external_urls.spotify,
                id: song.id,
                artist: song.artists[0].name,
            }
          }))
        })
    
    })
    if (!term) {
        return () => {
            return null;
        };
    }
    }, [term]) 

  return (
    <div>
      <form className="ui form">
        <div className="field">
         <input
          className="ui input"
          type="text"
          placeholder="search for song/artist"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
         />
        </div>
      </form>
      <div className="ui cards" style={{ marginTop: "10px", justifyContent: "center" }}>
        {songResults.map((song) => {
            return <Songs song={song} key={song.id} />
        })}
      </div>
    </div>
  )
}

export default SearchBar;
