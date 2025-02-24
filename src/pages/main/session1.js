import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox, Input, Radio} from 'antd'
import "antd/dist/antd.css";
import "./main.css";

import PredictionContainer from '../../components/predictionContainer'

function Session1Container() {
    const [task, setTask] = useState(0);
    const [tmpUser, setTmpUser] = useState(0);
    const [trialCount, setTrialCount] = useState(0);
    const [taskTime, setTaskTime] = useState((Date.now() + 1000 * 1000));

    const [currentTime, setCurrentTime] = useState(0);
    const [moveToSurvey, setMoveToSurvey] = useState(false);


    let totalTrials = 2;
    const baseImgUrl = "./";

    const nextChange = () =>{
        setTrialCount(prevCount => {
            const newCount = prevCount + 1;
            if (newCount < 2) {
                // only process the first trial
                console.log('asking the backend to process video')
                sendData(newCount)
            }
    
            if (newCount >= totalTrials) {
                console.log('done with trials for Session 1');
                let path = '/#/Survey';
                window.location.assign(path);
            } else {
                // reinitialize variables
                setTaskTime(Date.now());
            }
    
            return newCount; // Ensure the state updates correctly
        });
        
    }

    const sendData = (num) => {
        fetch('http://localhost:8080/process_videos', {
          method: 'POST',
          body: JSON.stringify({
            user_id: localStorage.getItem("user-id"),
            trial_number: num
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(response => response.json())
          .then(data => {
            console.log(data)
            if (data.success) {
                // Store job ID for later - need to differentiate job_trial1 and job_trial2
                localStorage.setItem(`jobId_trial${num}`, data.job_id);

              }
          })
          .catch(error => {
            console.error('Error starting process:', error.message);
          });
      } 


    // testing communication with backend
    useEffect(() => {
        fetch('http://0.0.0.0:8080/time').then(res => 
        res.json()).then(data => {
            setCurrentTime(data.time);
            console.log(data.time)
        });
        }, []);

    // // create a new user here 
    // useEffect(() => {
    //     fetch('http://localhost:8080/start_main', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json; charset=UTF-8',
    //         },
    //         body: JSON.stringify({ user_id: 'user-id' }),  // Use actual user_id here
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //         console.log(data['task_number']);
    //         setTask(data['task_number']);
    //         // send user id as well
    //         setTmpUser(data['user_id'])
    //     });
    // }, []);
    

    // // initialize image
    // useEffect(() => {
    //     console.log('getting images')
    //     fetch('http://localhost:8080/imageInfo')
    //     .then(response => response.json())
    //     .then(data => {
    //         setTaskTime(Date.now())
    //     });
    // }, []);



    return (
            <div className="container">
            <div className="title" style={{ fontSize: "50px" }}>Session 1</div>
            

            <div className="text" style={{ fontSize: "40px" }}>
                <span> Trial {trialCount + 1}</span>
            </div>    
                

            <div className="text"> 
                <Button variant="btn btn-success"  onClick={nextChange}>
                    Next
                </Button>
            </div>

            {(moveToSurvey) && 
            <div className="text" style={{ fontSize: "40px" }}> 
                <t> You have completed the two trials. </t>
                
            </div>
            }

            </div>

       
       
      );
}

export default Session1Container;