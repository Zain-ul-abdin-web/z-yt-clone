import React from 'react';
import "./Navbar.css";
import {RxHamburgerMenu} from "react-icons/rx";
import {AiFillHome} from "react-icons/ai";
import {CiYoutube} from "react-icons/ci";
import {MdOutlineSubscriptions , MdOndemandVideo} from "react-icons/md";
import {ImFire} from "react-icons/im";
import {SiYoutubegaming} from "react-icons/si"
import {BsMusicNote} from "react-icons/bs"
import youtube_logo from "../../images/youtube_logo.png"
import { Link } from 'react-router-dom';
import { toggleNavbar } from '../../redux/youtubeSlice';
import {useSelector } from 'react-redux';

const Navbar = () => {
    let toggleNav = useSelector((store)=>store.youtubeSlice.toggleNavbar);
    let navStyles = {};
    if(!toggleNav.barShow){
        navStyles ={
        width: "0",
        overflow: "hidden"
      }
    }
  return (
    <div className='navbar' style={navStyles}>
        <div className="nav_menu_container">
            <ul>
                <li>
                    <Link to="/">
                        <AiFillHome/>
                        <h3>Home</h3>
                    </Link>
                </li>
                <li>
                    <Link to="">
                        <CiYoutube/>
                        <h3>Shorts</h3>
                    </Link>
                </li>
                <li>
                    <Link to="">
                        <MdOutlineSubscriptions/>
                        <h3>Subscription</h3>
                    </Link>
                </li>
            </ul>
            <hr />
            <ul>
                <li>
                    <Link to="/">
                        <ImFire/>
                        <h3>Trending</h3>
                    </Link>
                </li>
                <li>
                    <Link to="/feed/music">
                        <BsMusicNote/>
                        <h3>Music</h3>
                    </Link>
                </li>
                <li>
                    <Link to="/feed/gaming">
                        <SiYoutubegaming/>
                        <h3>Gaming</h3>
                    </Link>
                </li>
                <li>
                    <Link to="/feed/movies">
                        <MdOndemandVideo/>
                        <h3>Movies</h3>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar