import React, { Component,useState, useEffect } from "react";
import {Button, Modal} from 'antd'
// import { useHistory} from "react-router";

import "./start.css";

function StartContainer() {
    // let history = useHistory();
    const [userId, setUserId] = useState("");
    const [serverUserId, setServerUserId] = useState(null); // Store backend response
    const [agree, setAgree] = useState(false);
    const [tmpUser, setTmpUser] = useState(0);
    const [error, setError] = useState(""); // For error handling
    const checkboxHandler = () => {
      setAgree(!agree);
    }
  
    const routeChange = () =>{ 
      if (!userId) {
        setError("Please enter a valid user ID.");
        return; // Do not proceed if userId is empty
      }
      fetch("http://localhost:8080/start_main", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ user_id: userId }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(errorData.error || "An error occurred");
            });
          }
          return response.json();
        })
        .then(message => {
          console.log(message)
          let path = '/#/Instructions';
          window.location.assign(path);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(error.message);
        });
    };

  // Handle input change
  const handleInputChange = (e) => {
    setUserId(e.target.value);
    localStorage.setItem('user-id', e.target.value)
  };


    return (
      <div className="Home">
        <div className="lander">
            <h1>Introduction</h1>
            <p> Welcome to our study! </p>

            <div className="instr" style={{ marginLeft: "125px" }}>
                    <span> Enter your given ID:</span>
            </div >
            <input
                type="text"
                value={userId}
                onChange={handleInputChange}
            />
            
            {error && <div className="error">{error}</div>} {/* Display error message */}

            <Button onClick={routeChange} style={{marginLeft:"20px"}}>
                Continue
            </Button>
        </div>
      </div>
      );
    }


export default StartContainer;