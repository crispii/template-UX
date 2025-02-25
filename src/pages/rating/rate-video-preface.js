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

        <div className="text" style={{ fontSize: "20px" }}> 
            On the next page, you will see two of your recordings and be asked to rate specific skills from the Objective Structured Assessment of Technical Skills (OSATS) global rating scale.
            
        </div>
        <div className="text" style={{ fontSize: "20px" }}> 
            Each skill will be rated on a five-point scale, where lower values indicate a lower level of proficiency and higher values indicate greater proficiency.
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