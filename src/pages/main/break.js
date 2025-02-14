import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox} from 'antd'
import "./main.css";

function BreakContainer() {

    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [task, setTask] = useState(0);
    const [timeLeft, setTimeLeft] = useState(120);

    const checkboxHandler = () => {
        setIsButtonEnabled(!isButtonEnabled);
    }

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000); // Decrease time by 1 second
            return () => clearTimeout(timer); // Cleanup on unmount
        } else {
            setIsButtonEnabled(true); // Enable button when timer reaches 0
        }
    }, [timeLeft]);

    const routeChange = () =>{ 
        // if (task % 2 === 0) {
        //     let path = '/#/Main2'; 
        //     window.location.assign(path);
        // } else {
        //     let path = '/#/Main1'; 
        //     window.location.assign(path);
        // }
        let path = '/#/Survey';
        window.location.assign(path);

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


    return (
      <div className="container">
        <h1 className="title" style={{ fontSize: "50px" }}>Break Time</h1> 

        <div className="text" style={{ fontSize: "30px" }}> 
            Wait 2 minutes before moving onto the next page. The timer will show when the next page has been unlocked.
        </div>

        <h2 className="text" style={{ fontSize: "50px" }}>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</h2>

        <div className="text" style={{ fontSize: "40px" }}> 
            <Button disabled={!isButtonEnabled} variant="btn btn-success" onClick={routeChange}>
                Next
            </Button>
        </div>

      </div>
      );
}

export default BreakContainer;