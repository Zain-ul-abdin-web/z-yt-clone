import React, { useEffect, useState } from 'react';
import "./SearchRes.css"
import { useSelector } from 'react-redux';
import { RiFilter3Line } from "react-icons/ri"
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useSearchQuery } from '../../redux/feature/services';
import ResVideoCard from '../../components/ResVideoCard/ResVideoCard';
import ResChannelCard from '../../components/ResChannelCard/ResChannelCard';
class Filter_features {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}
const SearchRes = () => {
  const [allParams, setAllParams] = useState({
    upload_date: "",
    type: "",
    duration: "",
    features: "",
    sort: ""
  });
  let [searchParams, setSearchParams] = useSearchParams();
  let setparams = (e, filterParam) => {
    if (allParams[filterParam] == e.target.id) {
      setAllParams({ ...allParams, [filterParam]: "" });
      document.getElementById(e.target.id).style.color = "#aaa";
    } else {
      let listColor = document.getElementById(allParams[filterParam]);
      if (listColor)
        listColor.style.color = "#aaa";
      setAllParams({ ...allParams, [filterParam]: e.target.id });
      document.getElementById(e.target.id).style.color = "white";
    }
  }
  useEffect(() => {
    let paramObj = {};
    let a = Object.entries(allParams).filter(val => val[1] != "");
    for (let e of a) {
      paramObj[e[0]] = e[1]
    }
    setSearchParams({
      query: searchParams.get("query"),
      ...paramObj
    })
  }, [allParams])
  let toggleNav = useSelector((store) => store.youtubeSlice.toggleNavbar);
  let homeStyles = {};
  if (!toggleNav.barShow) {
    homeStyles = {
      width: "100%",
      left: "0"
    }
  }
  const { data, isFetching, error } = useSearchQuery(
    searchParams.get("query") ? searchParams.get("query") : "",
    searchParams.get("upload_date") ? searchParams.get("upload_date") : "",
    searchParams.get("type") ? searchParams.get("type") : "",
    searchParams.get("duration") ? searchParams.get("duration") : "",
    searchParams.get("features") ? searchParams.get("features") : "",
    searchParams.get("sort") ? searchParams.get("sort") : "",
  );
  let filters = (title, filterArr, filterParam) => {
    return <>
      <h4>{title}</h4>
      <ul>
        {
          filterArr.map((list, i) => {
            return <li onClick={(e) => setparams(e, filterParam)} id={list.id} key={i}>{list.title}</li>
          })
        }
      </ul>
    </>
  }
  return (
    <div className='page_container search_page' style={homeStyles}>
      <div className="filter_search">
        <div className="filter_head">
          <div onClick={() => {
            document.querySelector(".filters").classList.toggle("active")
          }}>
            <RiFilter3Line />
            <span>Filters</span>
          </div>
        </div>
        <div className="filters">
          <div className="up_date">
            {
              filters("UPLOAD DATE",
                [
                  new Filter_features("l", "Last hours"),
                  new Filter_features("t", "Today"),
                  new Filter_features("w", "This week"),
                  new Filter_features("m", "This wonth"),
                  new Filter_features("y", "This year")
                ],
                "upload_date")
            }
          </div>
          <div className="type">
            {
              filters("TYPE",
                [
                  new Filter_features("v", "Video"),
                  new Filter_features("c", "Channel"),
                  new Filter_features("p", "Plalist")
                ],
                "type")
            }
          </div>
          <div className="duration">
            {
              filters("DURATION", [
                new Filter_features("s", "Short"),
                new Filter_features("l", "Long")
              ],
                "duration")
            }
          </div>
          <div className="features">
            {
              filters("FEATURES", [
                new Filter_features("li", "Live"),
                new Filter_features("hd", "HD"),
                new Filter_features("3", "360"),
                new Filter_features("4", "4K")
              ],
                "feature")
            }
          </div>
          <div className="sort_by">
            {
              filters("SORT BY", [
                new Filter_features("r", "Relevance"),
                new Filter_features("u", "Upload date"),
                new Filter_features("v", "View count"),
                new Filter_features("ra", "Rating")
              ],
                "sort")
            }
          </div>
        </div>
      </div>
      <div className="res_display">
        {
          isFetching ?
            <div className='fetching'>Loading <span>....</span></div>
          :
          error?
          <div className='error'>something went wrong</div>
          :
          data.contents?.map((data, ind) => {
            return !data.channel?<ResVideoCard video={data} key={ind} />:
        <ResChannelCard channel={data} />
          })
        }
      </div>
    </div>
  )
}

export default SearchRes