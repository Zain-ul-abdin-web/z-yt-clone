import React from 'react';
import { Link } from 'react-router-dom';
import "./RelatedVideoCard.css";

const RelatedVideoCard = (props) => {
    const video = props.video.video;
  return (
    <Link to={`/watch/${video.videoId}`} className='r_video_card'>
        <img src={video.thumbnails[0].url} alt=""/>
        <div>
            <h3>{video.title}</h3>
            <p id='mg'>
                <Link to={`/channel/${video.channelId}`}>{video.channelName}</Link>
            </p>
            <p>{video.viewCountText} {video.publishedTimeText}</p>
        </div>
    </Link>
  )
}

export default RelatedVideoCard