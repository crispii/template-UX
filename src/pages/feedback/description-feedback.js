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
    console.log(localStorage.getItem("task"))

    if (localStorage.getItem("task") == 1) {
        console.log('assigning traditional')
        feedback = "traditional"
      }
    else {
        console.log('assigning intervention')
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
        // sendData(1) // for now, only for trial1. Initially
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
        sendData(1);
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
                <p style={{textAlign: 'left', margin: '20px', fontSize:"22px"}}>We have processed your first sutures and now you will receive this feedback in the following sequence:</p>
                

                <p style={{textAlign: 'left', margin: '20px', fontSize:"22px"}}><b>First feedback presentation</b></p>
                <ol className="fb-text">
                    <li style={{fontSize:"22px"}}>We will show you specific feedback based on your performance in the initial trials</li>
                    <li style={{fontSize:"22px"}}>Take 4 minutes to review and understand the feedback provided</li>
                    <li style={{fontSize:"22px"}}>Complete one practice trial incorporating what you learned</li>

                </ol> 
                <p style={{textAlign: 'left', margin: '20px', fontSize:"22px"}}><b>Second feedback presentation</b></p>
                <ol className="fb-text">
                    <li style={{fontSize:"22px"}}>We will show you the same feedback again to reinforce the key points. The time you can spend is limited as well.</li>
                    <li style={{fontSize:"22px"}}>This repetition helps ensure thorough understanding of the feedback</li>
                    <li style={{fontSize:"22px"}}>Complete a final trial applying the feedback</li>
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
            <div className="text"> 
                <p style={{textAlign: 'left', width:"80%", fontSize:"22px"}}>
                 In this type of feedback, you will see a recording of your execution of a suture side by side with video examples from experts. 
                
                These expert videos demonstrate how the task can be performed effectively.
                
                Observing the expert demonstrations can help you reflect on how to adjust your own performance. 
                
                Use these examples as a reference when you attempt the task again. You may pause, replay, move forward, or go back in the videos as many times as needed.
                </p>
            </div>

        </>
        :
        <>
            <div className="text"> 
            <p style={{textAlign: 'left', width:"80%", fontSize:"22px"}}> In this type of feedback, you will see a recording of your execution of a suture side by side with video examples from experts.
            You will receive clear guidance on what aspects of your performance to adjust and how to make those changes by examining the expert demonstrations. 
            This structured feedback is designed to support your understanding and help you apply the suggested improvements in your next attempt.
            You may pause, replay, move forward, or go back in the videos as many times as needed.
            </p>


            <p style={{textAlign: 'left', width:"80%", fontSize:"22px"}}>Familiarize yourself with the concepts before you get the feedback: </p>
                <ol style={{textAlign: 'left', width:"80%", fontSize:"22px"}}>
                    <li> <b>Hand orientation</b> indicates the degree of <b>hand pronation</b>, with higher values representing full pronation (palm down), values near zero when the hand faces sideways, and lower values for full supination (palm up). 
                        Orientation is calculated using the metacarpophalangeal joints of the index and pinky fingers.</li>
                        
                    <li> <b>Distance</b> refers to the gap between the tips of the <b>thumb</b> and <b>index</b> finger, whether holding a tool or with an empty hand. </li>
                </ol> 

            </div>
        </>
        }


        <div className="text"> 
            <Checkbox onChange={checkboxHandler} style={{fontSize:"20px", textAlign: 'left', alignSelf: 'stretch'}}>
            I understand the feedback I will receive.
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