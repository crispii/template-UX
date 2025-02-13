import {React, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { useParams } from "react-router-dom";
import {
  Form,
  Select,
  Slider,
  // Radio,
  // Input,
  Button,
  Radio,
} from 'antd';
import './survey.css'
const { Option } = Select;



const formItemLayout = {
    labelCol: {
        span: 22,
        offset:1
    },
    wrapperCol: {
        span: 30,
        offset:1
    },
};

const SurveyContainer = () => {
  const [form] = Form.useForm();
  const [answers, setAnswers] = useState({});
  const [task, setTask] = useState(0);

  // Fetch task number from backend
  useEffect(() => {
    const userId = localStorage.getItem("user-id");
    
    if (userId) {
        fetch(`http://localhost:8080/setup?user_id=${userId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched Task:', data);
                setTask(Number(data.task_number)); // Set the task from the backend response
            })
            .catch(error => console.error('Error fetching task data:', error));
    }
  }, []);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    let copySaveArray = values
    setAnswers(values)
    // save data
    let data = {
        q1: values.Q1, 
        q2: values.Q2,
        q3: values.Q3,
        q4: values.Q4,
        q5: values.Q5,
    };
    sendData(data)
    // Navigate based on task
    if (task !== null) { // Ensure task is not null before navigation
      console.log('Task Number:', task); // Debug the task number
      let path = task % 2 === 0 ? '/#/FeedbackA-Preface' : '/#/FeedbackB-Preface';
      window.location.assign(path);
    }
  };
  const sendData = (obj) => {
    fetch('http://localhost:8080/surveyData', {
      method: 'POST',
      body: JSON.stringify({
        user_id: localStorage.getItem("user-id"),
        folder: 'baseline',
        type: 'cogLoad',
        content: obj,
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
      <Form {...formItemLayout} layout='vertical'
        name="validate_other"
        onFinish={onFinish}
        initialValues={{
          Q1: 1,
          Q2: 1,
          Q3: 1,
          Q4: 1,
          Q5: 1
        }}
      >

        <div className="title"> Questionnaire</div>

        <div className="text"> 
          Please indicate your answer on a scale from 1 to 10 according to your suturing experience during Session 1.  
        </div>
       
        <Form.Item 
          name="Q1" 
          label={<p style={{ fontSize: "20px" }}>1. How mentally demanding was the task?</p>}
          rules={[{ required: true }]}
        >
          <Slider 
              min={1} 
              max={10} 
              marks={{
                  1: "Very low",
                  10: "Very high",
                  ...Object.fromEntries([...Array(8)].map((_, i) => [i + 2, " "])) 
              }} 
              step={1} 
              style={{ width: "60%", margin: "0 auto" }}
              tooltip={{ formatter: (value) => value }} // Hides tooltip to keep it clean

          />
      </Form.Item>
        
      <Form.Item 
          name="Q2" 
          label={<p style={{ fontSize: "20px" }}>2. How physically demanding was the task?</p>}
          rules={[{ required: true }]}
        >
          <Slider 
              min={1} 
              max={10} 
              marks={{
                  1: "Very low",
                  10: "Very high",
                  ...Object.fromEntries([...Array(8)].map((_, i) => [i + 2, " "])) 
              }} 
              step={1} 
              style={{ width: "60%", margin: "0 auto" }}
              tooltip={{ formatter: (value) => value }} // Hides tooltip to keep it clean
          />
      </Form.Item>

      <Form.Item 
          name="Q3" 
          label={<p style={{ fontSize: "20px" }}>3. How successful were you in accomplishing what you were asked to do?</p>}
          rules={[{ required: true }]}
        >
          <Slider 
              min={1} 
              max={10} 
              marks={{
                  1: "Very low",
                  10: "Very high",
                  ...Object.fromEntries([...Array(8)].map((_, i) => [i + 2, " "])) 
              }} 
              step={1} 
              style={{ width: "60%", margin: "0 auto" }}
              tooltip={{ formatter: (value) => value }} // Hides tooltip to keep it clean
          />
      </Form.Item>

      <Form.Item 
          name="Q4" 
          label={<p style={{ fontSize: "20px" }}>4. How hard did you have to work to accomplish your level of performance?</p>}
          rules={[{ required: true }]}
        >
          <Slider 
              min={1} 
              max={10} 
              marks={{
                  1: "Very low",
                  10: "Very high",
                  ...Object.fromEntries([...Array(8)].map((_, i) => [i + 2, " "])) 
              }} 
              step={1} 
              style={{ width: "60%", margin: "0 auto" }}
              tooltip={{ formatter: (value) => value }} // Hides tooltip to keep it clean
          />
      </Form.Item>


      <Form.Item 
          name="Q5" 
          label={<p style={{ fontSize: "20px" }}>5. How insecure, discouraged, irritated, stressed, and annoyed were you?</p>}
          rules={[{ required: true }]}
        >
          <Slider 
              min={1} 
              max={10} 
              marks={{
                  1: "Very low",
                  10: "Very high",
                  ...Object.fromEntries([...Array(8)].map((_, i) => [i + 2, " "])) 
              }} 
              step={1} 
              style={{ width: "60%", margin: "0 auto" }}
              tooltip={{ formatter: (value) => value }} // Hides tooltip to keep it clean
          />
      </Form.Item>


         <Form.Item >
         
        <Button type="primary" htmlType="submit">
        Submit
        </Button>
        </Form.Item>
      </Form>
      
    </div>
  );
};
export default SurveyContainer;