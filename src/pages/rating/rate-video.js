import {React, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { useParams } from "react-router-dom";
import {
  Form,
  Select,
  // Radio,
  // Input,
  Button,
  Slider,
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
        respectForTissue: values.Q1, 
        timeAndMotion: values.Q2,
        instrumentHandling: values.Q3,
        useOfInstruments: values.Q4,
        sutureHandling: values.Q5,
        flowOfOperation: values.Q6,
        useOfNonDomHand: values.Q7,
        knowledgeOfProcedure: values.Q8,
        overallPerformance: values.Q9,
    };
    sendData(data)
    let path = '/#/Demographics'; 
    window.location.assign(path);
  };

  const sendData = (obj) => {
    fetch('http://localhost:8080/surveyData', {
      method: 'POST',
      body: JSON.stringify({
        user_id: localStorage.getItem("user-id"),
        folder: 'OSATS_eval',
        type: 'survey',
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
        }}
      >

        <div className="title"> Video Rating</div>
        <div className='text'>Please select the operator's performance in each category based on the current video. </div>

        <Form.Item 
            name="Q1" 
            rules={[{ required: true }]}
        >
          <Slider 
            min={1} 
            max={5} 
            marks={{
              1: "Frequently used unnecessary force on tissues or caused damage by inappropriate instrument use",
              3: "Careful handling of the tissue, but with occasional inadvertent damage",
              5: "Consistently handled tissue appropriately with minimal damage",
            }} 
            step={1} 
            style={{ width: "60%", margin: "0 auto" }}
            tooltip={{ open: false }} // Hides tooltip to keep it clean
                      />
        </Form.Item>
        

        <Form.Item 
            name="Q2" 
            rules={[{
                    required: true,
                  },
                ]}>
            <Slider 
              min={1} 
              max={5} 
              marks={{
                1: "Many unnecessary movements",
                3: "Efficient time and motion, but some unnecessary movements",
                5: "Clear economy of movement and maximum efficiency",
              }} 
              step={1} 
              style={{ width: "60%", margin: "0 auto" }}
              tooltip={{ open: false }} // Hides tooltip to keep it clean
            />
        </Form.Item>

        <Form.Item 
            name="Q3" 
            rules={[{
                    required: true,
                  },
                ]}>
            <Slider 
              min={1} 
              max={5} 
              marks={{
                1: "Repeatedly makes tentative or awkward moves with instruments",
                3: "Competent use of instruments, but occasionally awkward",
                5: "Fluid movements",
              }} 
              step={1} 
              style={{ width: "60%", margin: "0 auto" }}
              tooltip={{ open: false }} // Hides tooltip to keep it clean
            />
        </Form.Item>

        <Form.Item 
            name="Q4" 
            rules={[{
                    required: true,
                  },
                ]}>
            <Slider 
              min={1} 
              max={5} 
              marks={{
                1: "Frequently utilized inappropriate instrument",
                3: "Generally used appropriate instruments",
                5: "Obviously familiar with instruments and their use",
              }} 
              step={1} 
              style={{ width: "60%", margin: "0 auto" }}
              tooltip={{ open: false }} // Hides tooltip to keep it clean
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
export default RateVideoContainer;