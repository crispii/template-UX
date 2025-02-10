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
        .then((response) => response.json())
        .then((data) => {
          console.log("Received from backend:", data);
          setServerUserId(data.user_id); // Save user_id from the backend response
          localStorage.setItem("user-id", data['user_id']);
          console.log(localStorage.getItem('user-id'));
          let path = '/#/Instructions';
          window.location.assign(path);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError("Failed to send data to the server.");
        });
    };

// create a new user here 
  // useEffect(() => {
  //     fetch('http://localhost:8080/start_main')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data)
  //       // send user id as well
  //       setTmpUser(data['user_id'])
  //     });
  // }, []);   

//   useEffect(() => {
//     fetch('http://localhost:8080/start_main', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json; charset=UTF-8',
//       },
//       body: JSON.stringify({ user_id: userId }),  // Ensure userId is defined or retrieved here
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       setTmpUser(data['user_id']);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       setError('Failed to send data to the server.');
//     });
//  }, []);  // Ensure that userId is available or passed correctly
    

  // Handle input change
  const handleInputChange = (e) => {
    setUserId(e.target.value);
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
                    <span> Enter your given ID:</span>
            </div >
            <input
                type="text"
                value={userId}
                onChange={handleInputChange}
            />

            <Button onClick={routeChange} style={{marginLeft:"20px"}}>
                Continue
            </Button>
        </div>
      </div>
      );
    }


export default StartContainer;