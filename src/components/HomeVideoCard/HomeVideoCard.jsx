import React from 'react'
import "./HomeVideoCard.css"
import { useGetChannelInfoQuery } from '../../redux/feature/services';
import { Link } from 'react-router-dom';
const HomeVideoCard = (props) => {
    const video = props.video.video;
    const {data , isFetching , error} = useGetChannelInfoQuery(video.channelId,{
        skip:props.channel?true:false
    });
    const imgStyle = {
        height: "fit-content",
        display: props.channel?'none':"block"
    }
    let card = (img)=>{
        return (
            <Link to={`/watch/${video.videoId}`} className="home_video_card">
                <div className="thumbnail">
                    <img src={video.thumbnails[0].url} alt="" />
                    <span>{video.lengthText}</span>
                </div>
                <div className="video_info">
                    <Link to={`/channel/${video.channelId}`} style={imgStyle}>
                        <img src={img} alt="" />
                    </Link>
                    <div className="info">
                        <h4>{video.title}</h4>
                        <p>
                            <Link to={`/channel/${video.channelId}`}>{video.channelName}</Link>
                        </p>
                        <p>
                            <span>{video.viewCountText} . </span>
                            <span>{video.publishedTimeText}</span>
                        </p>
                    </div>
                </div>
            </Link>
        )
    }
    if(props.channel){
        return card();
    }
    if(!isFetching && !error){
        return card(data.avatar.thumbnails[0].url);
    }
}

export default HomeVideoCard;