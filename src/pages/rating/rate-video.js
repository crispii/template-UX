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
import './rating.css'
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

const RateVideoContainer = () => {
  const [form] = Form.useForm();
  const [answers, setAnswers] = useState({});


  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    let copySaveArray = values
    setAnswers(values)
    // save data
    let data = {
        user_id: localStorage.getItem("user-id"),
        q1: 1, 
        q2: 2,
    };
    sendData(data)
    let path = '/#/End'; 
    window.location.assign(path);
  };

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

        <div className="title"> Video Rating</div>
        <div className='text'> Based on the performance in the video, rate the following skills </div>

        <Form.Item 
            name="Q1" 
            label = {
                <p style={{fontSize: "20px"}}> 1. How confident were you in your responses to complete the task?</p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group>
                <Radio value="1" style={{fontSize: "18px"}}>Strongly agree</Radio>
                <Radio value="2" style={{fontSize: "18px"}}>Agree</Radio>
                <Radio value="3" style={{fontSize: "18px"}}>Neutral</Radio>
                <Radio value="4" style={{fontSize: "18px"}}>Disagree</Radio>
                <Radio value="5" style={{fontSize: "18px"}}>Strongly disagree</Radio>
            </Radio.Group>
        </Form.Item>
        

        <Form.Item 
            name="Q2" 
            label = {
                <p style={{fontSize: "20px"}}> 2. How successful do you think you were you in accomplishing what you were asked to do? </p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group>
                <Radio value="1" style={{fontSize: "18px"}}>Poor</Radio>
                <Radio value="2" style={{fontSize: "18px"}}>Fair</Radio>
                <Radio value="3" style={{fontSize: "18px"}}>Average</Radio>
                <Radio value="4" style={{fontSize: "18px"}}>Good</Radio>
                <Radio value="5" style={{fontSize: "18px"}}>Excellent</Radio>
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
export default RateVideoContainer;