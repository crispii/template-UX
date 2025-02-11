import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox} from 'antd'
import "./instructions.css";

function InstructionsContainer() {

    const [agree, setAgree] = useState(false);
    const [task, setTask] = useState(0);

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
        let path = '/#/Practice';
        window.location.assign(path);
        console.log('moving to practice page')

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
        <h1>Instructions</h1> 


        <div className="text"> 
        <p>How to run a simple suture</p>

        <p><strong>Tools Available:</strong> Scissors, needle holder, forceps, needles, and suture thread.</p>

        <p><strong>Define:</strong></p>
        <ul>
            <li>Number of stitches</li>
            <li>Parallel</li>
            <li>Start and end with instrument tie</li>
        </ul>

        <p>You will complete four trials in two separate sessions.</p>

        <p><strong>Steps:</strong></p> 
            <ol>
                <li> Place your hand in the hand position holders </li>
                <li> You will find the tools on the left (forceps) and right (needle holder, scissors, and needle with thread) </li>
                <li> You will complete X sutures. The video recording will start and end for each one.</li>
                <li> You will be presented with the first questionnaire after the first session.  </li>
                <li> You will complete X more sutures. The video recording will start and end for each one. </li>
            </ol> 
        </div>

        <div className="text"> 
            <Checkbox onChange={checkboxHandler} style={{fontSize:"20px", textAlign: 'left', alignSelf: 'stretch'}}>
                I understand the instructions of the study.
            </Checkbox> 
        </div>

        <div className="text"> 
            <Button disabled={!agree} variant="btn btn-success" onClick={routeChange}>
                Start
            </Button>
        </div>

      </div>
      );
}

export default InstructionsContainer;