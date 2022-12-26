import React from 'react';
import "./ChannelAbout.css"

const ChannelAbout = ({data}) => {
  return (
    <div className='channel_about'>
        <div className="about_description">
            <h3>Description</h3>
            <p>{data.description}</p>
            <div className="moreInfo" style={{overflow: "auto",marginTop:"20px",color:"#aaa"}}>
              <h4 style={{width: "30%",float:"left"}}>Contry</h4>
              <p style={{width: "70%",float:"left"}}>{data.country}</p>
            </div>
        </div>
        <div className="stats">
            <h3>stats</h3>
            <p>{data.viewCountText}</p>
            <p>Joined {data.joinedDateText}</p>
        </div>
    </div>
  )
}

export default ChannelAbout