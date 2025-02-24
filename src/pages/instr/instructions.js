import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox} from 'antd'
import "./instructions.css";

function InstructionsContainer() {

    const [agree, setAgree] = useState(false);
    const [task, setTask] = useState(0);
    const [clicked, setClicked] = useState(false);

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

    const instructions = [
        { step: "Pass the needle through the material", details: "You will start by passing the needle through two opposing pieces of material. During this step, the dominant hand holds the needle driver and the non-dominant hand uses the forceps to extract the needle from the material." },
        { step: "Pull the suture", details: "The non-dominant hand pulls the suture either using the forceps or empty." },
        { step: "Perform one surgeon knot and two finishing knots.", details: "The dominant hand has the needle driver, and the non-dominant hand may hold the forceps or be empty."},
        { step: "Cut the suture", details: "The suture is cut using the scissors which are held in the dominant hand. " }
    ];

    // const [expandedIndex, setExpandedIndex] = useState(null);

    // const toggleReadMore = (index) => {
    //     setExpandedIndex(expandedIndex === index ? null : index);
    // };

    const [expandedIndices, setExpandedIndices] = useState([]);

    // Toggle Read More for each item
    const toggleReadMore = (index) => {
        setExpandedIndices((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index) // Collapse if already expanded
                : [...prev, index]               // Expand if not expanded
        );
    };


    const continueChange = () =>{
        setClicked(true);
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
        <p style={{textAlign: 'left', fontSize:"22px"}}>Your task is to execute simple sutures. You will place <strong>four interrupted instrument-tied</strong> sutures on incisions made in a simulated skin pad.</p>


        {!clicked ?
            <>
            <p style={{textAlign: 'left', fontSize:"22px"}}>You are provided with <strong>three</strong> tools: a needle driver, surgical forceps, and suture scissors. You will also have sutures thread with needle. </p>
            <p style={{textAlign: 'left', fontSize:"22px"}}>You will complete a total of <strong>four trials</strong> across <strong>two sessions</strong> with a feedback intervention between sessions.
            You will always place the sutures in the same quadrant orientation and the first suture will be at the end of the incision furthest from you (see image below):
             </p>

            <div className="image-frame">
                <img 
                    className="image-inner"
                    src='pad.jpeg'
                />
            </div>

            <p style={{textAlign: 'left', fontSize:"22px"}}>Overall steps:</p>

                <ol>
                    <li style={{fontSize:"22px"}}> Locate your tools. Left side: forceps. Right side: needle driver, scissors, and thread. To hold the needle driver, slightly insert the thumb through one of the handles, not a palm grasp.</li>
                    <li style={{fontSize:"22px"}}> Start each trial by placing your hands in the designated hand holders. </li>
                    <li style={{fontSize:"22px"}}> Complete two trials. The researcher will start and stop video recording for each suture. Allow the researcher to accommodate the skin pad at the beginning of each trial.  </li>
                    <li style={{fontSize:"22px"}}> Respond to the first questionnaire and take a break.</li>
                    <li style={{fontSize:"22px"}}> Read the feedback description and presentation. </li>
                    <li style={{fontSize:"22px"}}> Complete two more trials. </li>
                    <li style={{fontSize:"22px"}}> Respond the final questionnaires.</li>
                </ol> 
            <div className="text"> 
            <Button variant="btn btn-success" onClick={continueChange} style={{margin: "10px"}}>
                Continue
            </Button>
            </div>
            

            </>
        :
            <>
            <p style={{textAlign: 'left', fontSize:"22px"}}>Before you start, here is a reminder of the steps involved when placing an interrupted suture:  </p>
            <ol>
                {instructions.map((item, index) => (
                    <React.Fragment key={index}>
                        <li style={{ marginBottom: "10px", fontSize:"22px" }}>
                            {item.step}{" "}
                            <button
                                onClick={() => toggleReadMore(index)}
                                style={{ marginLeft: "10px", cursor: "pointer", padding: "3px 8px" }}
                            >
                                {expandedIndices.includes(index) ? "Read Less" : "Read More"}
                            </button>
                            {expandedIndices.includes(index) && (
                                <p style={{ marginTop: "5px", color: "#555", width:"70%"}}>{item.details}</p>
                            )}
                        </li>
                    </React.Fragment>
                ))}
            </ol>


            <p style={{textAlign: 'left', marginBottom: '30px', fontSize:'22px'}}><strong>NOTE:</strong> You can use your left or right hand with no tool. </p>
            
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
            </>

        }

        </div>

      </div>
      );
}

export default InstructionsContainer;