import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox} from 'antd'
import "./main.css";

function PracticeContainer() {

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
        let path = '/#/Session1';
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
        <h1 className="title" style={{ fontSize: "50px" }}>Practice Trial</h1> 

        <div className="text" style={{ fontSize: "40px" }}> 
            Use this time to practice using the tools for suturing. Once you finish, your sutures will be monitored and recorded in the next page.
        </div>

        <div className="text"> 
            <Checkbox onChange={checkboxHandler} style={{fontSize:"20px", textAlign: 'left', alignSelf: 'stretch'}}>
                I am finished practicing.
            </Checkbox> 
        </div>

        <div className="text"> 
            <Button disabled={!agree} variant="btn btn-success" onClick={routeChange}>
                Start Trials
            </Button>
        </div>

      </div>
      );
}

export default PracticeContainer;