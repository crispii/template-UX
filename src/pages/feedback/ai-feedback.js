import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox} from 'antd'
import "./feedback.css";


import VideoPanel from '../../components/videopanel'

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
                console.log(data['result_sample']);
                setProxy1(data['feedback'][0]['proxy_name'])
                setVideoRef1(data['feedback'][0]['video_ref'])
                console.log(proxy1)
                setProxy2(data['feedback'][1]['proxy_name'])
                setVideoRef2(data['feedback'][1]['video_ref'])
                setDisplay(true);
    
              })
           
    }, []);

    return (
      <div className="container">
        <h1>Feedback Presentation</h1> 

        <div className="text"> 
            (This is AI feedback.)
        </div>

        {display ? 
            <> 
                {/* Example: One instance of VideoPanel */}
                <VideoPanel
                    title="Expert demonstration and explanation"
                    singleVideoSrc="/video1.mp4"
                    middleVideos={[
                    { src: videoRef1, caption: proxy1},
                    { src: videoRef2, caption: proxy2}
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

export default AIFeedbackContainer;