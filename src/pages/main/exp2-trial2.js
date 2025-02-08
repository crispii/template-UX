import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox} from 'antd'
import "./main.css";

function Exp2Trial2Container() {

    const [agree, setAgree] = useState(false);
    const [task, setTask] = useState(0);

    const checkboxHandler = () => {
        setAgree(!agree);
    }

    const routeChange = () =>{ 
        let path = '/#/Survey';
        window.location.assign(path);

    }

    return (
      <div className="container">
        <h1>Experiment 2: Trial 2</h1> 

        <div className="text"> 
            You will now be conducting Trial 2 for exp 2. (Enter instructions for how to do this)
        </div>

        <div className="text"> 
            <Checkbox onChange={checkboxHandler} style={{fontSize:"20px", textAlign: 'left', alignSelf: 'stretch'}}>
                I have finished trial 2, move to cognitive load questionnaire.
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

export default Exp2Trial2Container;