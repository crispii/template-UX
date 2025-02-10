import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox, Input, Radio} from 'antd'
import "antd/dist/antd.css";
import "./main.css";

import PredictionContainer from '../../components/predictionContainer'

function Session1Container() {
    const [text, setText] = useState("");
    const [task, setTask] = useState(0);
    const [choice, setChoice] = useState(0);
    const [tmpUser, setTmpUser] = useState(0);
    const [trialCount, setTrialCount] = useState(0);
    const [taskTime, setTaskTime] = useState((Date.now() + 1000 * 1000));

    const [currentTime, setCurrentTime] = useState(0);
    const [moveToSurvey, setMoveToSurvey] = useState(false);


    let totalTrials = 2;
    const baseImgUrl = "./";

    const nextChange = () =>{
            let count = trialCount + 1;
            setTrialCount(count)
            if (count >= totalTrials) {
                console.log('done with trials for session 1')
                let path = '/#/Survey';
                window.location.assign(path);
            } else {
                // reinitialize variables
                setTaskTime(Date.now())
            }
        
    }

    const sendData = (obj) => {
        fetch('http://localhost:8080/responsesData', {
          method: 'POST',
          body: JSON.stringify(obj),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(response => response.json())
          .then(message => {
            console.log(message)
          })
      } 
    // testing communication with backend
    useEffect(() => {
        fetch('http://0.0.0.0:8080/time').then(res => 
        res.json()).then(data => {
            setCurrentTime(data.time);
            console.log(data.time)
        });
        }, []);

    // create a new user here 
    useEffect(() => {
        fetch('http://localhost:8080/setup_main')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data['task_number']);
            setTask(data['task_number']);
            // send user id as well
            setTmpUser(data['user_id'])
        });
    }, []);
    

    // initialize image
    useEffect(() => {
        console.log('getting images')
        fetch('http://localhost:8080/imageInfo')
        .then(response => response.json())
        .then(data => {
            setTaskTime(Date.now())
        });
    }, []);



    return (
            <div className="container">
            <div className="title">Session 1</div>
            

            <div className="text">
                <t> Trial {trialCount + 1}</t>
            </div>    
                

            <div className="text"> 
                <Button variant="btn btn-success"  onClick={nextChange}>
                    Next
                </Button>
            </div>

            {(moveToSurvey) && 
            <div className="text"> 
                <t> You have completed the three trials. </t>
                
            </div>
            }

            </div>

       
       
      );
}

export default Session1Container;