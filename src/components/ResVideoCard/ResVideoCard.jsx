import React from 'react';
import { Link } from 'react-router-dom';
import "./ResVideoCard.css"

const ResVideoCard = (props) => {
    if(props.video.playlist)
    return "";
    const video = props.video.video;
    let imgStyle = {
        width: "25px",
        height: "25px",
        objectFit: "cover",
        borderRadius: "100px"
    }
    const thumbnail = video.thumbnails[0].url;
    return (
        <Link to={`/watch/${video.videoId}`} className="sr_card">
            <Link to={`/watch/${video.videoId}`}>
                <img
                    style={{ borderRadius: "10px" }}
                    width="100%"
                    src={thumbnail} alt="" />
            </Link>
            <div className="video_info">
                <h3>{video.title}</h3>
                <p>{video.viewCountText} . {video?.publishedTimeText}</p>
                <div>
                    <Link to={`/channel/${video?.channelId}`}>
                        <img style={imgStyle} src="https://yt3.ggpht.com/fOpPiNsAzXm4WCfGmpmqrrngH5yO_x8gLGSVjQbexBkv79gmsV0KmbdWkmR6mmpWaAbzS0UGww=s68-c-k-c0x00ffffff-no-rj" alt="" />
                        <span>{video?.channelName}</span>
                    </Link>
                </div>
                <p>{video?.description}</p>
            </div>
        </Link>
    )
}

export default ResVideoCard;