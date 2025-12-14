import React, { useEffect, useState } from 'react'
import {YOUTUBE_VIDEO_API} from "../utils/constants"
import VideoCards from './video-cards'
import { Link } from 'react-router-dom'
import ShimmerList from './ShimmerList'

const VideoContainer = () => {

const [videos,setVideos]=useState([])

  useEffect(()=>{
     getVideos()
  },[])

  const getVideos = async()=>{
      const responce = await fetch(YOUTUBE_VIDEO_API)
      const result = await responce.json()
      console.log(result.items);
      setVideos(result.items)
  }

  return (
    <div className="grid gap-4 
            max-w-[300px] mx-auto 
            sm:max-w-full sm:justify-center 
            sm:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
     {videos.length === 0 
      ? <ShimmerList/>
      : videos.map(obj=>(<div key={obj.id}  > <Link to={"/watch?v="+obj.id} ><VideoCards  info={obj} /></Link>  </div>)
       )
    }
    </div>
  )
}

export default VideoContainer