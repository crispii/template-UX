import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox} from 'antd'
import "./feedback.css";


// Reusable VideoPanel Component
const VideoPanel = ({ videoSrc1, text1, videoSrc2, text2 }) => {
    return (
      <div className="video-panel">
        <div className="video-container">
          <video className="video" controls>
            <source src={videoSrc1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="video-text">{text1}</p>
        </div>
  
        <div className="video-container">
          <video className="video" controls>
            <source src={videoSrc2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="video-text">{text2}</p>
        </div>
      </div>
    );
  };

function AIFeedbackContainer() {

    const [agree, setAgree] = useState(false);
    const [task, setTask] = useState(0);
    const [proxy1, setProxy1] = useState("");
    const [proxy2, setProxy2] = useState("");
    const [proxy3, setProxy3] = useState("");

    const [videoRef1, setVideoRef1] = useState("");
    const [videoRef2, setVideoRef2] = useState("");
    const [videoRef3, setVideoRef3] = useState("");

    const [display, setDisplay] = useState(false);


    const checkboxHandler = () => {
        setAgree(!agree);
    }

    const routeChange = () =>{ 
        // if (task % 2 === 0) {
        //     let path = '/#/Main2'; 
        //     window.location.assign(path);
        // } else {
        //     let path = '/#/Main1'; 
        //     window.location.assign(path);
        // }
        let path = '/#/Session2';
        window.location.assign(path);
        console.log('moving to session 2 page')

    }

    // connect with the backend to randomize the task 
    // useEffect(() => {
    //     fetch('http://localhost:8080/setup')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //         console.log(data['task_number']);
    //         setTask(data['task_number']);
    //         // send user id as well
    //         localStorage.setItem('user-id', data['user_id']);
    //         console.log(localStorage)
    //     });
    // }, []);

    useEffect(() => {
        fetch('http://localhost:8080/load_outputs')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data['result_sample']);
            setProxy1(data['feedback'][0]['proxy_name'])
            setVideoRef1(data['feedback'][0]['video_ref'])
            console.log(videoRef1)
            setProxy2(data['feedback'][1]['proxy_name'])
            setVideoRef2(data['feedback'][1]['video_ref'])
            setDisplay(true);

        });
    }, []);

    return (
      <div className="container">
        <h1>AI Feedback</h1> 

        <div className="text"> 
            (This is AI feedback.) The next 2 pages will have 2 more trials to complete. 
        </div>

        {display ? 
            <> 
                {/* Column Titles */}
                <div className="video-titles">
                    <h3 className="video-title">Your video</h3>
                    <h3 className="video-title">Expert Video</h3>
                </div>

                {/* Add Three VideoPanels */}
                <div className="video-text"> 
                    Proxy description here. {proxy1}
                </div>
                
                <VideoPanel
                    videoSrc1="/video1.mp4"
                    videoSrc2={videoRef1}
                />

                <div className="video-text"> 
                    Proxy description here. {proxy2}
                </div>
                <VideoPanel
                    videoSrc1="/video1.mp4"
                    videoSrc2={videoRef2}
                />


                <div className="text"> 
                    <Checkbox onChange={checkboxHandler} style={{fontSize:"20px", textAlign: 'left', alignSelf: 'stretch'}}>
                    I am done viewing the feedback.
                    </Checkbox> 
                </div>

                <div className="text"> 
                    <Button disabled={!agree} variant="btn btn-success" onClick={routeChange}>
                        Next
                    </Button>
                </div>

            </>
        : 
            <> 
            Loading ...
            </>
        }


      </div>
      );
}

export default AIFeedbackContainer;