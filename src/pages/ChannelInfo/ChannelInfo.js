import React from 'react';
import HomeVideoCard from '../../components/HomeVideoCard/HomeVideoCard';
import "./ChannelInfo.css";
import { useGetChannelInfoQuery , useGetChannelContentQuery } from '../../redux/feature/services';
import { Link, useParams } from 'react-router-dom';
import {GoVerified} from "react-icons/go"
import { useSelector } from 'react-redux';
import ChannelAbout from '../../components/ChannelAbout/ChannelAbout';

const ChannelInfo = () => {
    let toggleNav = useSelector((store)=>store.youtubeSlice.toggleNavbar);
    let homeStyles = {};
    if(!toggleNav.barShow){
      homeStyles ={
        width: "100%",
        left: "0"
      }
    }
    const {id,filter} = useParams();
    const {data , isFetching , error} = useGetChannelInfoQuery(id);
    const {data:content , isFetching :isFetchingContent , error :contentError} = useGetChannelContentQuery(id);
    let name;
    if(data&&content){
        name = data.vanityChannelUrl
    }
  return (
    <div className='channel page_container' style={homeStyles}>
        {
            isFetching && isFetchingContent ?
            <div className="fetching">
                Loading <span>....</span>
            </div>:
            !(data && content)?
            <div className="error">Something went wrong</div>
            :
            (data && content)?(
            <>
                <div className="channel_banner_img">
                <img src={data.avatar.thumbnails[0].url} style={{objectFit:"contain"}} alt="" />
                </div>
                <div className="channelInfo">
                    <img src={data.avatar.thumbnails[0].url} alt="" />
                    <div className="info">
                        <h3>{data.title} <span style={{
                            fontSize:"15px",
                            display:data.verified?"inline":"none"
                            }}>
                        <GoVerified/>
                        </span></h3>
                        <p>{name.slice(23)}</p>
                        <p>{data.subscriberCountText}</p>
                    </div>
                    <div className="subscribe_btn">
                        <button>Subscribe</button>
                    </div>
                </div>
                <div className="channel_menu">
                    <Link to={`/channel/${id}`}>Home</Link>
                    <Link to={`/channel/${id}/about`}>About</Link>
                </div>
                {
                    filter?
                    <ChannelAbout data={data}/>
                    :(<div className="all_videos_wrapper" style={{padding:"30px 20px"}}>
                            {
                                content.contents.map((video,i)=>{
                                return <HomeVideoCard channel video={video} key={i}/> 
                                })
                            }
                    </div>)
                }
            </>):""
        }
    </div>
  )
}

export default ChannelInfo