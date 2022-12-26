import React from 'react';
import "./ResChannelCard.css";
import { Link } from 'react-router-dom';

const ResChannelCard = (props) => {
    const channel = props.channel.channel;
    return (
        <Link to={`/channel/${channel.channelId}`} className="sr_ch_card">
            <Link to={`/channel/${channel.channelId}`}>
                <img
                    style={{ borderRadius: "10px" }}
                    width="100%"
                    src={channel.thumbnails[0].url} alt="" />
            </Link>
            <div>
                <div>
                    <h3>{channel.title}</h3>
                    <p>{channel.description}</p>
                </div>
                <button>Subscribe</button>
            </div>
        </Link>
    )
}

export default ResChannelCard