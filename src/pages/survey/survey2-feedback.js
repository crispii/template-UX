import {React, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { useParams } from "react-router-dom";
import {
  Form,
  Select,
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

const Survey2FeedbackContainer = () => {
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
                // setTask(Number(data.task_number));
            })
            .catch(error => console.error('Error fetching task data:', error));
    }
  }, []);

  const onFinish = (values) => {
    const userId = localStorage.getItem("user-id");
    console.log('Received values of form: ', values);
    let copySaveArray = values
    setAnswers(values)
    // save data
    let data = {
        q1: values.Q1, 
        q2: values.Q2,
        q3: values.Q3,
        q4: values.Q4,
        q4: values.Q5,
        q4: values.Q6,
    };
    sendData(data)

    let path = '/#/Rating';
    window.location.assign(path);
    window.scrollTo(0, 0);
    
  };
  // also connect with the backend to randomize the task 
  const sendData = (obj) => {

    let feedback;

    if (localStorage.getItem("task") == 1) {
      feedback = "_traditional"
    }
    else {
      feedback = "_AI"
    }

    fetch('http://localhost:8080/surveyData', {
      method: 'POST',
      body: JSON.stringify({
        user_id: localStorage.getItem("user-id"),
        folder: 'intervention' + feedback,
        type: 'feedback',
        content: obj,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json())
      .then(message => {
        console.log(message)
      
      })
  } 



  return (
    <div className="container"> 
      <Form {...formItemLayout} layout='vertical'
        name="validate_other"
        onFinish={onFinish}
        initialValues={{
        }}
      >

        <div className="title"> Questionnaire Part 2</div>

        <div className="text" style={{fontSize: "20px"}}> 
            Please provide responses on a scale from 1 to 5 to the following questions considering the feedback you were presented with and your suturing experience during <b>Session 2</b>.  
        </div>

        <Form.Item 
            name="Q1" 
            label = {
                <p style={{fontSize: "20px"}}> 1. The feedback I received was helpful.</p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group>
                <Radio value="1" style={{fontSize: "18px", marginLeft: "25px"}}>Strongly Disagree</Radio>
                <Radio value="2" style={{fontSize: "18px", marginLeft: "25px"}}>Disagree</Radio>
                <Radio value="3" style={{fontSize: "18px", marginLeft: "25px"}}>Neutral</Radio>
                <Radio value="4" style={{fontSize: "18px", marginLeft: "25px"}}>Agree</Radio>
                <Radio value="5" style={{fontSize: "18px", marginLeft: "25px"}}>Strongly Agree</Radio>
            </Radio.Group>
        </Form.Item>
        

        <Form.Item 
            name="Q2" 
            label = {
                <p style={{fontSize: "20px"}}> 2. The feedback I received was beneficial to my performance.</p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group>
                <Radio value="1" style={{fontSize: "18px", marginLeft: "25px"}}>Strongly Disagree</Radio>
                <Radio value="2" style={{fontSize: "18px", marginLeft: "25px"}}>Disagree</Radio>
                <Radio value="3" style={{fontSize: "18px", marginLeft: "25px"}}>Neutral</Radio>
                <Radio value="4" style={{fontSize: "18px", marginLeft: "25px"}}>Agree</Radio>
                <Radio value="5" style={{fontSize: "18px", marginLeft: "25px"}}>Strongly Agree</Radio>
            </Radio.Group>
        </Form.Item>

        <Form.Item 
            name="Q3" 
            label = {
                <p style={{fontSize: "20px"}}> 3. I understood how to integrate the feedback I received into the hands-on tasks.</p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group>
              <Radio value="1" style={{fontSize: "18px", marginLeft: "25px"}}>Strongly Disagree</Radio>
                <Radio value="2" style={{fontSize: "18px", marginLeft: "25px"}}>Disagree</Radio>
                <Radio value="3" style={{fontSize: "18px", marginLeft: "25px"}}>Neutral</Radio>
                <Radio value="4" style={{fontSize: "18px", marginLeft: "25px"}}>Agree</Radio>
                <Radio value="5" style={{fontSize: "18px", marginLeft: "25px"}}>Strongly Agree</Radio>
            </Radio.Group>
        </Form.Item>

        <Form.Item 
            name="Q4" 
            label = {
                <p style={{fontSize: "20px"}}> 4. Between the first and second session today, I knew how to improve my performance in the task.</p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group>
              <Radio value="1" style={{fontSize: "18px", marginLeft: "25px"}}>Strongly Disagree</Radio>
                <Radio value="2" style={{fontSize: "18px", marginLeft: "25px"}}>Disagree</Radio>
                <Radio value="3" style={{fontSize: "18px", marginLeft: "25px"}}>Neutral</Radio>
                <Radio value="4" style={{fontSize: "18px", marginLeft: "25px"}}>Agree</Radio>
                <Radio value="5" style={{fontSize: "18px", marginLeft: "25px"}}>Strongly Agree</Radio>
            </Radio.Group>
        </Form.Item>

        <Form.Item 
            name="Q5" 
            label = {
                <p style={{fontSize: "20px"}}> 5. I would like to have this type of training as part of my program.</p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group>
              <Radio value="1" style={{fontSize: "18px", marginLeft: "25px"}}>Strongly Disagree</Radio>
                <Radio value="2" style={{fontSize: "18px", marginLeft: "25px"}}>Disagree</Radio>
                <Radio value="3" style={{fontSize: "18px", marginLeft: "25px"}}>Neutral</Radio>
                <Radio value="4" style={{fontSize: "18px", marginLeft: "25px"}}>Agree</Radio>
                <Radio value="5" style={{fontSize: "18px", marginLeft: "25px"}}>Strongly Agree</Radio>
            </Radio.Group>
        </Form.Item>

        <Form.Item 
            name="Q6" 
            label = {
                <p style={{fontSize: "20px"}}> 6. I would recommend this opportunity for other students. </p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group>
              <Radio value="1" style={{fontSize: "18px", marginLeft: "25px"}}>Strongly Disagree</Radio>
                <Radio value="2" style={{fontSize: "18px", marginLeft: "25px"}}>Disagree</Radio>
                <Radio value="3" style={{fontSize: "18px", marginLeft: "25px"}}>Neutral</Radio>
                <Radio value="4" style={{fontSize: "18px", marginLeft: "25px"}}>Agree</Radio>
                <Radio value="5" style={{fontSize: "18px", marginLeft: "25px"}}>Strongly Agree</Radio>
            </Radio.Group>
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
export default Survey2FeedbackContainer;