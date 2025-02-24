import React from "react";
import "./video.css";


const VideoPanel = ({ title, singleVideoSrc, middleVideos = [] }) => {

    const action = "adjust"; // Example action from another variable

    const proxyMapping = {
        'KPDistanceProxy': 'thumb-to-index distance',
        'HandOrientationProxy': 'hand orientation',
        'KPVelocityProxy' : 'hand velocity'
      };

    const proxyMeaning = {
        'HandOrientationProxy': 'Higher values correspond to full pronation (palm down), values near zero when the hand faces sideways, and lower values for full supination (palm up).',
        'KPDistance': 'Higher values correspond to a larger gap between the tips of the thumb and index. '
    }

    const formatCaption = (caption) => {

        if (!caption) return ""; 

        const [proxyPart, gesturePart, messagePart] = caption.split('/');
        
        if (!proxyPart || !gesturePart || !messagePart) return caption; // Fallback if structure is unexpected

        const rawProxyName = proxyPart.split('_')[0]; // Extract proxy name
        const proxyName = proxyMapping[rawProxyName] || rawProxyName;
        const hand = proxyPart.split('_')[1];
        const proxyMessage = proxyMeaning[rawProxyName] || "";
        const gesture = gesturePart.replaceAll('_', ' ').toLowerCase(); // Make gesture readable
        const message = messagePart.replaceAll('_', ' ').toLowerCase(); // Make message readable

        return (
            <>
                During <strong>{gesture}</strong>, your <strong> {hand} {proxyName}</strong> had <strong>{message}</strong> average values than experts. {proxyMessage}
            </>
        )
    };

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
              <p className="video-caption">{formatCaption(video.caption)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default VideoPanel;