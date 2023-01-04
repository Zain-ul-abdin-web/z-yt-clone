import React, { useEffect, useState } from 'react';
import "./VideoPage.css";
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { useGetChannelInfoQuery, useGetRelatedVideosInfoQuery, useGetVideoInfoQuery } from '../../redux/feature/services';
import RelatedVideoCard from '../../components/RelatedVideoCard/RelatedVideoCard';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNavbar } from '../../redux/youtubeSlice';

const VideoPlayerPage = () => {
  const [comshow, setComshow] = useState(false);
  const barShow = useSelector(store => store.youtubeSlice.toggleNavbar.barShow);
  const dispatch = useDispatch();
  let imgStyle = {
    width: "40px",
    height: "40px",
    objectFit: "cover",
    borderRadius: "100px"
  }
  let { id } = useParams();
  let { data, isFetching} = useGetVideoInfoQuery(id);
  let { data: channelInfo } = useGetChannelInfoQuery(data?.videoDetails.channelId, { skip: data ? false : true });
  let { data: relatedVideos } = useGetRelatedVideosInfoQuery(data?.videoDetails.videoId, { skip: data ? false : true });
  const [videoDetails, setVideoDetails] = useState();
  const [rlVideos, setRlVideos] = useState();
  const [chInfo, setCnInfo] = useState();
  useEffect(() => {
    setVideoDetails("");
    setRlVideos("");
    setCnInfo("")
    if (id === data?.videoDetails.videoId) {
      setVideoDetails(data?.videoDetails);
      setRlVideos(relatedVideos);
      setCnInfo(channelInfo)
    }
  }, [id, data, channelInfo, relatedVideos]);
  useEffect(() => {
    if (barShow === true) {
      dispatch(toggleNavbar(false))
    }
  },[])
  return (
    <div className='page_container video_page'>
      <div>
        <div className="video_info">
          <ReactPlayer url={`https://www.youtube.com/embed/${id}`} controls className="iframe_container" />
          <h3 className="video_title">{videoDetails?.title}</h3>
          {
            videoDetails && chInfo ?
              <div className="video_info_bar">
                <div className="channel_info">
                  <Link to={`/channel/${videoDetails?.channelId}`}>
                    <img style={imgStyle} src={chInfo?.avatar.thumbnails[0].url} alt="" />
                  </Link>
                  <div>
                    <h4 style={{ fontSize: "18px" }}>
                      <Link to={`/channel/${videoDetails?.channelId}`}>{chInfo?.title}</Link>
                    </h4>
                    <p style={{ fontSize: "13px", color: "#aaa" }}>{chInfo?.subscriberCountText}</p>
                  </div>
                  <button>subscribe</button>
                </div>
                <div className="video_rating">
                  <div onClick={() => {
                    document.execCommand("copy")
                  }} onCopy={(e) => {
                    e.preventDefault();
                    e.clipboardData.setData("text/plain", window.location.href);
                  }}>Copy Link</div>
                </div>
              </div> : ""
          }
          <div className="discription">
            {
              videoDetails ?
                <>
                  <h5>{videoDetails?.viewCount} views</h5>
                  <p className={comshow?"active":""}>{videoDetails?.shortDescription}</p>
                  <span onClick={()=>setComshow(!comshow)}>show {comshow?"less":"more"}</span>
                </> :
                ""
            }
          </div>
        </div>
        <div className="related_video">
          {
            isFetching ?
              <div className='fetching'>Loading <span>....</span></div> :
              rlVideos ?
              rlVideos.contents.map((video, i) => {
                  return <RelatedVideoCard video={video} key={i} />
                }) :
                <div className='error'>something went wrong</div>
                

          }
        </div>
      </div>
    </div>
  )
}

export default VideoPlayerPage