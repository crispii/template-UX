import React, { Component, useState, useEffect } from "react";
import {Button, Modal, Checkbox} from 'antd'
import "./rating.css";

function RateVideoPrefaceContainer() {

    const [agree, setAgree] = useState(false);
    const [task, setTask] = useState(0);

    const checkboxHandler = () => {
        setAgree(!agree);
    }

    const routeChange = () =>{ 
        let path = '/#/RateVideo';
        window.location.assign(path);

    }

    return (
      <div className="container">
        <h1>Rate Video Preface</h1> 

        <div className="text"> 
                On the next page, you will be shown a video and asked to rate certain skills.
        </div>

        <div className="text"> 
            <Checkbox onChange={checkboxHandler} style={{fontSize:"20px", textAlign: 'left', alignSelf: 'stretch'}}>
                I understand the instructions.
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

export default RateVideoPrefaceContainer;