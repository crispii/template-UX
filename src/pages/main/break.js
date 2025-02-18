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
        const userId = localStorage.getItem("user-id");
    
        if (userId) {
            fetch(`http://localhost:8080/setup?user_id=${userId}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched Task:', data);
                    setTask(Number(data.task_number)); // Set the task from the backend response
                })
                .catch(error => console.error('Error fetching task data:', error));
        }

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
        
        if (task !== null) { // Ensure task is not null before navigation
            console.log('Task Number:', task); // Debug the task number
            let path = task % 2 === 0 ? '/#/FeedbackA-Preface' : '/#/FeedbackB-Preface';
            window.location.assign(path);
          }

        // let path = '/#/Survey';
        // window.location.assign(path);

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
            You have completed Session 1 and will have a 2 minute break before starting Session 2. Please wait.
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