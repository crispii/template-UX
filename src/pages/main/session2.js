import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox, Input, Radio} from 'antd'
import "antd/dist/antd.css";
import "./main.css";

function Session2Container() {
    const [trialCount, setTrialCount] = useState(() => {
        return Number(localStorage.getItem("trialCount")) || 0;
    });
    const [taskTime, setTaskTime] = useState((Date.now() + 1000 * 1000));
    const task = localStorage.getItem("task");

    const [currentTime, setCurrentTime] = useState(0);
    const [moveToSurvey, setMoveToSurvey] = useState(false);


    // let totalTrials = 2;

    useEffect(() => {
        localStorage.setItem("trialCount", trialCount);
    }, [trialCount]);

    const nextChange = () => {
        if (trialCount == 0) {
            setTrialCount(trialCount + 1);
            let path = task % 2 === 0 ? '/#/FeedbackA' : '/#/FeedbackB';
            window.location.assign(path);
        } else {
            console.log("Done with trials for session 2");
            // localStorage.removeItem("trialCount"); // Clear storage after completion
            // localStorage.removeItem("task"); // Clear storage after completion
            let path = '/#/Survey2';
            window.location.assign(path);
        } 
    };


    // testing communication with backend
    useEffect(() => {
        fetch('http://0.0.0.0:8080/time').then(res => 
        res.json()).then(data => {
            setCurrentTime(data.time);
            console.log(data.time)
        });
        }, []);

    return (
            <div className="container">
            <div className="title" style={{ fontSize: "50px" }}>Session 2</div>
            

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

export default Session2Container;