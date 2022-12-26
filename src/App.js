import React from 'react';
import Header from "./components/Header/Header";
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ChannelInfo from './pages/ChannelInfo/ChannelInfo';
import VideoPlayerPage from './pages/VideoPlayerPage/VideoPage';
import SearchRes from './pages/SearchRes/SearchRes';
const App = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/feed/:type' element={<Home />} />
        <Route path='/channel/:id' element={<ChannelInfo />} />
        <Route path='/channel/:id/:filter' element={<ChannelInfo />} />
        <Route path='/watch/:id' element={<VideoPlayerPage />} />
        <Route path='/search' element={<SearchRes />} />
      </Routes>
    </>
  )
}
export default App;
