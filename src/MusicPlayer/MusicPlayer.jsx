import React, { useEffect, useRef, useState } from 'react';
import "./musicPlayer.scss";
import img from "../img.jpg"
import {FaForward,FaBackward,FaPlay} from "react-icons/fa"
import {BsFillPauseCircleFill} from "react-icons/bs"
function MusicPlayer() {
    const audioRef = useRef()
    const [isPlaying,setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1); // 1 represents full volume, 0 represents mute
    const [progress,setProgress] = useState(audioRef?.current?.duration)
    // const [remainingTime, setRemainingTime] = useState(0);
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };
    const handlePlay = () => {
        if(audioRef.current.paused){
            audioRef.current.play()

            setIsPlaying(true)
            
        }else{
            audioRef.current.pause()
            setIsPlaying(false)

        }
    }

    const handleChangeVolume = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    }

    const handleChangeProgress = (e) => {
        const newProgress = parseFloat(e.target.value)
        setCurrentTime(newProgress)
        audioRef.current.currentTime = newProgress
    }
 
    
    useEffect(() => {
        //! Here we assign the currentTime to the state to decrease the value using setInterval
        const updateRemainingTime = () => {
        //   const remaining = audioRef.current.duration - audioRef.current.currentTime;
        //   setRemainingTime(remaining);
          setCurrentTime(audioRef.current.currentTime);
        };
    
        const intervalId = setInterval(updateRemainingTime, 1000);
    
        return () => {
          clearInterval(intervalId);
        };

      }, [isPlaying]);




  return (
    <div className='music'>
        <div className="music-container">
            <img src={img} alt="" />
            <audio ref={audioRef}  >
                <source src={require("../audios/1.mp3")} type="audio/mpeg"/>
            </audio>
            <p>
          {audioRef.current &&
            `Track Duration: ${formatTime(currentTime)} / ${formatTime(
              audioRef.current.duration
            )}`}
        </p>
        {/* ========================= */}
        <div className="progressbar">
            <h3>Track</h3>
            <input
          type='range'
          value={currentTime}
          onChange={handleChangeProgress}
          step='0.01'
          min='0'
          max={progress}
        />
        </div>
        {/* ======================== */}
        <div className="Volume">
            <h3>Volume</h3>
        <input   
        type='range'
          value={volume}
          onChange={handleChangeVolume}
          step='0.01'
          min='0'
          max='1' 
           />
        </div>
      
        {/* <p>Remaining Time: {formatTime(remainingTime)}</p> */}
            <div className="music-arrows">
            <FaBackward/>
            {isPlaying ? (
                <BsFillPauseCircleFill onClick={handlePlay}/>
                ):(
                <FaPlay onClick={handlePlay} />
            )}
            <FaForward/>
            </div>
        </div>
    </div>
  )
}

export default MusicPlayer