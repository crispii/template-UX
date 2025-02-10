import React, { Component,useState, useEffect } from "react";
import {Button, Modal} from 'antd'
// import { useHistory} from "react-router";

import "./start.css";

function StartContainer() {
    // let history = useHistory();
    const [text, setText] = useState("");
    const [agree, setAgree] = useState(false);
    const [tmpUser, setTmpUser] = useState(0);
    const checkboxHandler = () => {
      setAgree(!agree);
    }
  
    const routeChange = () =>{ 
      if (text=="") {
        alert("Please make sure to complete all the fields!");
      } else {
        let data = {}
        console.log(data)
        sendData(data)
        let path = '/#/Instructions'; 
        // history.push(path);
        window.location.assign(path);
        console.log('moving to instructions page')
      }
    }

// create a new user here 
  useEffect(() => {
      fetch('http://localhost:8080/setup_main')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // send user id as well
        setTmpUser(data['user_id'])
      });
  }, []);   
    

  const onChangeInput = e => {
      setText(e.target.value);
  };

  const sendData = (obj) => {
    fetch('http://localhost:8080/responsesData', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
      .then(message => {
        console.log(message)
      })
  } 

    return (
      <div className="Home">
        <div className="lander">
            <h1>Introduction</h1>
            <p> Welcome to our study! </p>

            <div className="instr" style={{ marginLeft: "125px" }}>
                    <t> Enter your given ID:</t>
            </div >
            <input
                type="text"
                value={text}
                onChange={onChangeInput}
            />

            <Button onClick={routeChange} style={{marginLeft:"20px"}}>
                Continue
            </Button>
        </div>
      </div>
      );
}

export default StartContainer;