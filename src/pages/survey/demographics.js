import {React, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { useParams } from "react-router-dom";
import {
  Form,
  Select,
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

const DemographicsContainer = () => {
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
        user_id: localStorage.getItem("user-id"),
        q1: values.Q1, 
        q2: values.Q2,
    };
    sendData(data)

    let path = '/#/End';
    window.location.assign(path);
    
  };
  // also connect with the backend to randomize the task 
  const sendData = (obj) => {
    fetch('http://localhost:8080/surveyData', {
      method: 'POST',
      body: JSON.stringify(obj),
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
        }}
      >

        <div className="title"> Demographics Survey</div>

        <Form.Item 
            name="Q1" 
            label = {
                <p style={{fontSize: "20px"}}> 1. What is your age range?</p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group>
                <Radio value="1" style={{fontSize: "18px"}}>1</Radio>
                <Radio value="2" style={{fontSize: "18px"}}>2</Radio>
                <Radio value="3" style={{fontSize: "18px"}}>3</Radio>
                <Radio value="4" style={{fontSize: "18px"}}>4</Radio>
                <Radio value="5" style={{fontSize: "18px"}}>5</Radio>
            </Radio.Group>
        </Form.Item>
        

        <Form.Item 
            name="Q2" 
            label = {
                <p style={{fontSize: "20px"}}> 2. What is your job? </p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group>
                <Radio value="1" style={{fontSize: "18px"}}>doctor</Radio>
                <Radio value="2" style={{fontSize: "18px"}}>student</Radio>
                <Radio value="3" style={{fontSize: "18px"}}>1</Radio>
                <Radio value="4" style={{fontSize: "18px"}}>2</Radio>
                <Radio value="5" style={{fontSize: "18px"}}>3</Radio>
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
export default DemographicsContainer;