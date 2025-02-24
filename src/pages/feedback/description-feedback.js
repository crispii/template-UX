import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox} from 'antd'
import "./feedback.css";

function PrefaceContainer() {

    const [agree, setAgree] = useState(false);
    const [task, setTask] = useState(0);
    const [enableDescription, setEnableDescription] = useState(false);

    const checkboxHandler = () => {
        setAgree(!agree);
    }

    let feedback;

    if (localStorage.getItem("task") == 1) {
        feedback = "traditional"
      }
    else {
    feedback = "AI"
    }

    const routeChange = () =>{ 
        // if (task % 2 === 0) {
        //     let path = '/#/Main2'; 
        //     window.location.assign(path);
        // } else {
        //     let path = '/#/Main1'; 
        //     window.location.assign(path);
        // }
        sendData(1) // for now, only for trial1
        if (feedback === "traditional"){
            let path = '/#/FeedbackB';
            window.location.assign(path);
            window.scrollTo(0, 0);

        } else{
            let path = '/#/FeedbackA';
            window.location.assign(path);
            window.scrollTo(0, 0);

        }
        console.log('moving to the feedback page')
    }

    const showDescription = () => {
        setEnableDescription(true);
    }

    const sendData = (num) => {
        fetch('http://localhost:8080/process_proxies', {
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
          })
          .catch(error => {
            console.error('Error running proxies:', error.message);
          });
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
        <h1>Feedback Description</h1> 
        {!enableDescription ?
            <>
               <div className="text"> 
                <p style={{textAlign: 'left', margin: '20px'}}>You will receive this feedback in the following sequence:</p>
                

                <p style={{textAlign: 'left', margin: '20px'}}>First feedback presentation</p>
                <ol>
                    <li>We will show you specific feedback based on your performance in the initial trials</li>
                    <li>Take time to review and understand the feedback provided</li>
                    <li>Complete one practice trial incorporating what you learned</li>

                </ol> 
                <p style={{textAlign: 'left', margin: '20px'}}>Second feedback presentation</p>
                <ol>
                    <li>We will show you the same feedback again to reinforce the key points</li>
                    <li>This repetition helps ensure thorough understanding of the feedback</li>
                    <li>Complete a final trial applying the feedback</li>
                </ol>
              </div>


            <div className="text"> 
                <Button variant="btn btn-success" onClick={showDescription}>
                    Read more
                </Button>
            </div>

        </>
        : 
        <>
        { feedback ==="traditional" ? 
        <>
            <p> Only video feedback explanation</p>
        </>
        :
        <>
            <p> Video with guidance explanation</p>
        </>
        }


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

        </>

        }

      </div>
      );
}

export default PrefaceContainer;