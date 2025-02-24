import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox} from 'antd'
import "./feedback.css";

function AIPrefaceContainer() {

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
        let path = '/#/FeedbackA';
        window.location.assign(path);
        console.log('moving to AI feedback page')

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
        <h1>Feedback Preface</h1> 

        <div className="text"> 
            (AI feedback description here)
        </div>

        
        <p style={{textAlign: 'left', margin: '20px'}}>You will receive this feedback in the following sequence:</p>
            First feedback presentation
            <ol>
                <li>We will show you specific feedback based on your performance in the initial trials</li>
                <li>Take time to review and understand the feedback provided</li>
                <li>Complete one practice trial incorporating what you learned</li>

            </ol> 
            Second feedback presentation
            <ol>
                <li>We will show you the same feedback again to reinforce the key points</li>
                <li>This repetition helps ensure thorough understanding of the feedback</li>
                <li>Complete a final trial applying the feedback</li>
            </ol>



        <div className="text"> 
            <Checkbox onChange={checkboxHandler} style={{fontSize:"20px", textAlign: 'left', alignSelf: 'stretch'}}>
            I understand that I will be receiving feedback for my performance.
            </Checkbox> 
        </div>

        <div className="text"> 
            <Button disabled={!agree} variant="btn btn-success" onClick={routeChange}>
                See feedback
            </Button>
        </div>

      </div>
      );
}

export default AIPrefaceContainer;