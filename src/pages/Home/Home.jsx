import React from 'react';
import HomeVideoCard from '../../components/HomeVideoCard/HomeVideoCard';
import "./Home.css";
import { useGetTrendingVideosQuery } from '../../redux/feature/services';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  let toggleNav = useSelector((store) => store.youtubeSlice.toggleNavbar);
  let homeStyles = {};
  if (!toggleNav.barShow) {
    homeStyles = {
      width: "100%",
      left: "0"
    }
  }
  const params = useParams();
  let type = "";
  if (params.type) {
    if (params.type == "music") {
      type = "mu"
    } else if (params.type == "movies") {
      type = "mo"
    } else if (params.type == "gaming") {
      type = "g"
    }
  }
  let fetching = (
    <div className="fetching">
      Loading<span>....</span>
    </div>
  )
  const { data, isFetching, error } = useGetTrendingVideosQuery(type ? type : "n");
  return (
    <>
      <div className='home page_container' style={homeStyles}>
        <div className="top_topics" style={homeStyles}>
          <span>All</span>
          <span>Comedy</span>
          <span>Javascript</span>
          <span>Cake</span>
        </div>
        {
          isFetching ?
            fetching
            :
            error ?
            <div className='error'>something went wrong</div>
              :
              <div className="all_videos_wrapper">
                {
                  data.contents.map((video, i) => {
                    return <HomeVideoCard video={video} key={i} />
                  })
                }
              </div>
        }
      </div>
    </>
  )
}

export default Home

