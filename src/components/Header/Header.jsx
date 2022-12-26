import React from 'react';
import "./Header.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { BsFillMicFill, BsBell } from "react-icons/bs";
import { RiVideoAddLine } from "react-icons/ri";
import youtube_logo from "../../images/youtube_logo.png";
import { toggleNavbar } from '../../redux/youtubeSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchNavigate = (e) => {
    e.preventDefault();
    const value = e.target[0].value;
    if (value != "") {
      navigate(`/search?query=${value}`)
    }
  }
  const searchIconClick = () => {
    const value = document.getElementById("search").value;
    if (value != "") {
      navigate(`/search?query=${value}`)
    }
  }
  return (
    <div className="header">
      <div className="header_left">
        <div className="toggle_icon" onClick={() => dispatch(toggleNavbar())}>
          <RxHamburgerMenu />
        </div>
        <div className="youtube_icon">
          <Link to="/">
            <img src={youtube_logo} alt="YOUTUBE_CLONE" />
            <span className="country">PK</span>
          </Link>
        </div>
      </div>
      <div className="header_middle">
        <div className="header_search">
          <form onSubmit={searchNavigate}>
            <input id='search' type="text" placeholder='Search here' />
          </form>
          <CiSearch onClick={searchIconClick} />
        </div>
        <div className="mic_search">
          <BsFillMicFill />
        </div>
      </div>
      <div className="header_right">
        <div className="user">
          <RiVideoAddLine />
        </div>
        <div className="user">
          <BsBell />
        </div>
        <div className="user">
        </div>
      </div>
    </div>
  )
}

export default Header;