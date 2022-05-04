import React from 'react'

const Songs = ({ song }) => {
  return (
    <a
    href={song.link}
    className="ui blue card"
    >
    <div className="content">
      <div className="header">{song.title}</div>
      <div className="meta">
       <span className="category">
         <h4>{song.artist}</h4>
       </span>
      </div>
    </div>
    <div className="pics">
      <div>
       <img
        className="ui image"
        src={song.image}
        alt="song image"
        style={{ borderRadius: "50px" }}
       />
      </div>
    </div>  

    </a>
  )
}

export default Songs;
