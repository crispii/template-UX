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
        <p style={{textAlign: 'left'}}>Your task is to execute a simple suture by placing three interrupted instrument-tied sutures on incisions made in a simulated skin pad (define spacing in-between).</p>

        <p style={{textAlign: 'left'}}>You are provided with <strong>three</strong> tools: a needle driver, surgical forceps, and suture scissors. You will also have sutures thread with needle. </p>

        <p style={{textAlign: 'left', marginBottom: '30px'}}><strong>NOTE:</strong> You can use your left or right hand with no tool. </p>

        <p style={{textAlign: 'left'}}>Each interrupted suture involves the following actions:  </p>
            <ol>
                <li> Pass the needle through the material </li>
                <li> Pull the suture </li>
                <li> Perform an instrumental tie </li>
                <li> Lay the knot </li>
                <li> Cut the suture </li>
                <li> Background action </li>
            </ol>

        <p style={{textAlign: 'left', margin: '20px'}}>You will complete a total of <strong>four</strong> sutures across two sessions with a feedback intervention between sessions as follows:</p>
            <ol>
                <li>Start each trial by placing your hands in the designated hand holders </li>
                <li>Locate your tools. Left side: forceps. Right side: needle driver, scissors, and thread. </li>
                <li> Complete two sutures. The researcher will start and stop video recoridng for each suture. Allow the researcher to accommodate the skin pad at the beginning of each trial.  </li>
                <li> Respond to the first questionnaire and take a break.</li>
                <li> Read the feedback description and presentation </li>
                <li> Complete two more sutures. </li>
                <li>Respond the final questionnaires.</li>
            </ol> 
        </div>

        <div className="text"> 
            <Checkbox onChange={checkboxHandler} style={{fontSize:"20px", textAlign: 'left', alignSelf: 'stretch'}}>
                I understand the instructions of the study.
            </Checkbox> 
        </div>

        <div className="text"> 
            <Button disabled={!agree} variant="btn btn-success" onClick={routeChange} style={{margin: "10px"}}>
                Start
            </Button>
        </div>

      </div>
      );
}

export default InstructionsContainer;