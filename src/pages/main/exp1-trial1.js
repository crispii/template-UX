import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox} from 'antd'
import "./main.css";

function Exp1Trial1Container() {

    const [agree, setAgree] = useState(false);
    const [task, setTask] = useState(0);

    const checkboxHandler = () => {
        setAgree(!agree);
    }

    const routeChange = () =>{ 
        console.log('asking the backend to process video')
        sendData()
        let path = '/#/Exp1Trial2';
        window.location.assign(path);

    }

    const sendData = () => {
        fetch('http://localhost:8080/process_videos', {
          method: 'POST',
          body: JSON.stringify({
            user_id: localStorage.getItem("user-id"),
            trial: '1'
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(response => response.json())
          .then(message => {
            console.log(message)
            
            // getLastestTodos();
          })
      } 

    return (
      <div className="container">
        <h1>Experiment 1: Trial 1</h1> 

        <div className="text"> 
            You will now be conducting Trial 1. (Enter instructions for how to do this) After this trial, you will be prompted to conduct Trial 2 on the next page.
        </div>

        <div className="text"> 
            <Checkbox onChange={checkboxHandler} style={{fontSize:"20px", textAlign: 'left', alignSelf: 'stretch'}}>
                I have finished Trial 1, move to Trial 2.
            </Checkbox> 
        </div>

        <div className="text"> 
            <Button disabled={!agree} variant="btn btn-success" onClick={routeChange}>
                Next
            </Button>
        </div>

      </div>
      );
}

export default Exp1Trial1Container;