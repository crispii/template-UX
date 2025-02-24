import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox} from 'antd'
import "./feedback.css";


import VideoPanel from '../../components/videopanel'

function TraditionalFeedbackContainer() {

    const [agree, setAgree] = useState(false);
    const [task, setTask] = useState(0);
    const [proxy1, setProxy1] = useState("");
    const [proxy2, setProxy2] = useState("");
    const [proxy3, setProxy3] = useState("");

    const [videoRef1, setVideoRef1] = useState("");
    const [videoRef2, setVideoRef2] = useState("");
    const [videoRef3, setVideoRef3] = useState("");

    const [display, setDisplay] = useState(false);
    const [timeLeft, setTimeLeft] = useState(4 * 60);
    const baseVideoUrl = "./experts_sutures/";

    const subjectID = localStorage.getItem("user-id");
    const selfVideoName = `participants_clips/${subjectID}_trial1_seg.mp4`;


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
        window.scrollTo(0, 0);
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

            fetch('http://localhost:8080/load_outputs', {
              method: 'POST',
              body: JSON.stringify({
                user_id: localStorage.getItem("user-id"),
                trial_number: 1
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            }).then(response => response.json())
              .then(data => {
                console.log(data)
                setProxy1(data['feedback'][0]['proxy_name'])
                setVideoRef1(data['feedback'][0]['video_ref'])
                console.log(proxy1)
                setProxy2(data['feedback'][1]['proxy_name'])
                setVideoRef2(data['feedback'][1]['video_ref'])
                setProxy3(data['feedback'][2]['proxy_name'])
                setVideoRef3(data['feedback'][2]['video_ref'])
                setDisplay(true);
    
              })
           
    }, []);

    // Timer countdown when display is true
    useEffect(() => {
        let timer;
        if (display && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        }

        // Show alert when timer reaches 0
        if (timeLeft === 0) {
            clearInterval(timer);
            Modal.confirm({
                title: 'Time is up!',
                content: 'You have spent the allocated time on this page. Please continue to the next page.',
                okText: 'Proceed',
                cancelText: 'Stay Here',
                onOk: routeChange
            });
        }

        // Cleanup the timer when component unmounts
        return () => clearInterval(timer);
    }, [display, timeLeft]);

    // Format time (minutes and seconds)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };


    return (
      <div className="container">
        <h1>Feedback Presentation</h1> 

        <div className="text" style={{fontSize: "22px"}}> 
            The video on the left shows a recording of your practice. You can contrast with the video samples from experts.
        </div>

        {/* Display countdown timer */}
        <div style={{ fontSize: "20px", color: "#ff6633", margin: "10px 0" }}>
            Time left to review: {formatTime(timeLeft)}
        </div>

        {display ? 
            <> 
                {/* Example: One instance of VideoPanel */}
                <VideoPanel
                    title="Expert demonstration"
                    singleVideoSrc={selfVideoName}
                    middleVideos={[
                    { src: `${baseVideoUrl}${videoRef1}`},
                    { src: `${baseVideoUrl}${videoRef2}`},
                    { src: `${baseVideoUrl}${videoRef3}`}
                    ]}
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

export default TraditionalFeedbackContainer;