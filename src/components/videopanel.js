import React from "react";
import "./video.css";


const VideoPanel = ({ title, singleVideoSrc, middleVideos = [] }) => {
    return (
      <div className="video-panel">
        {/* Left Column: Single Video with Title */}
        <div className="left-column">
          <h2 className="column-title">Your video</h2>
          <video className="single-video" controls>
            <source src={singleVideoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
  
        {/* Middle Column: Three Video + Text Pairs */}
        <div className="middle-column">
          <h2 className="middle-title">{title}</h2>
          {middleVideos.map((video, index) => (
            <div key={index} className="video-text-pair">
              {/* Video on the left, text on the right */}
              <video className="middle-video" controls loop>
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="video-caption">{video.caption}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default VideoPanel;