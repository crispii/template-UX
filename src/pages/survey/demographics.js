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
        Age: values.Q1, 
        Gender: values.Q2,
        trainingLevel: values.Q3,
        Games: values.Q4,
        aiKnowledge: values.Q5,
        aiTraining: values.Q6,
        aiComfort: values.Q7,
    };
    sendData(data)

    let path = '/#/End';
    window.location.assign(path);
    
  };
  // also connect with the backend to randomize the task 
  const sendData = (obj) => {
    fetch('http://localhost:8080/surveyData', {
      method: 'POST',
      body: JSON.stringify({
        user_id: localStorage.getItem("user-id"),
        folder: 'demo',
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
            Q7: 1
        }}
      >

        <div className="title"> Demographics Survey</div>

        <Form.Item 
            name="Q1" 
            label = {
                <p style={{fontSize: "20px"}}> 1. What is your age group?</p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group style={{ display: "flex", flexDirection: "column" }}>
                <Radio value="1" style={{fontSize: "18px", marginLeft: "25px"}}>18-24</Radio>
                <Radio value="2" style={{fontSize: "18px", marginLeft: "25px"}}>25-34</Radio>
                <Radio value="3" style={{fontSize: "18px", marginLeft: "25px"}}>35-44</Radio>
                <Radio value="4" style={{fontSize: "18px", marginLeft: "25px"}}>45-54</Radio>
                <Radio value="5" style={{fontSize: "18px", marginLeft: "25px"}}>55+</Radio>
            </Radio.Group>
        </Form.Item>
        

        <Form.Item 
            name="Q2" 
            label = {
                <p style={{fontSize: "20px"}}> 2. What is your gender? </p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group style={{ display: "flex", flexDirection: "column" }}>
                <Radio value="1" style={{fontSize: "18px", marginLeft: "25px"}}>Female</Radio>
                <Radio value="2" style={{fontSize: "18px", marginLeft: "25px"}}>Male</Radio>
                <Radio value="3" style={{fontSize: "18px", marginLeft: "25px"}}>Other</Radio>
                <Radio value="4" style={{fontSize: "18px", marginLeft: "25px"}}>Prefer not to say</Radio>
            </Radio.Group>
        </Form.Item>

        <Form.Item 
            name="Q3" 
            label = {
                <p style={{fontSize: "20px"}}> 3. Which phase of your medical education are you currently in?</p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group style={{ display: "flex", flexDirection: "column" }}>
                <Radio value="1" style={{fontSize: "18px", marginLeft: "25px"}}>Pre-clinical </Radio>
                <Radio value="2" style={{fontSize: "18px", marginLeft: "25px"}}>Clerkships </Radio>
                <Radio value="3" style={{fontSize: "18px", marginLeft: "25px"}}>Residency preparation </Radio>
                <Radio value="4" style={{fontSize: "18px", marginLeft: "25px"}}>Residency PY1-PY2 </Radio>
                <Radio value="5" style={{fontSize: "18px", marginLeft: "25px"}}>Residency PY3-PY4 </Radio>
                <Radio value="6" style={{fontSize: "18px", marginLeft: "25px"}}>Residency PY5 </Radio>
            </Radio.Group>
        </Form.Item>

        <Form.Item 
            name="Q4" 
            label = {
                <p style={{fontSize: "20px"}}> 4. Do you play video games/ musical instruments?</p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group style={{ display: "flex", flexDirection: "column" }}>
                <Radio value="1" style={{fontSize: "18px", marginLeft: "25px"}}>Never</Radio>
                <Radio value="2" style={{fontSize: "18px", marginLeft: "25px"}}>1-5 h per week </Radio>
                <Radio value="3" style={{fontSize: "18px", marginLeft: "25px"}}>6-10 h per week </Radio>
                <Radio value="4" style={{fontSize: "18px", marginLeft: "25px"}}> 10+ h per week </Radio>
            </Radio.Group>
        </Form.Item>


        <Form.Item 
            name="Q5" 
            label = {
                <p style={{fontSize: "20px"}}> 5. How would you rate your general knowledge of artificial intelligence (AI)?</p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group style={{ display: "flex", flexDirection: "column" }}>
                <Radio value="1" style={{fontSize: "18px", marginLeft: "25px"}}>No knowledge</Radio>
                <Radio value="2" style={{fontSize: "18px", marginLeft: "25px"}}>Novice</Radio>
                <Radio value="3" style={{fontSize: "18px", marginLeft: "25px"}}>Intermediate</Radio>
                <Radio value="4" style={{fontSize: "18px", marginLeft: "25px"}}>Advanced</Radio>
                <Radio value="5" style={{fontSize: "18px", marginLeft: "25px"}}>Expert</Radio>
            </Radio.Group>
        </Form.Item>

        <Form.Item 
            name="Q6" 
            label = {
                <p style={{fontSize: "20px"}}> 6. Have you previously participated in AI-based educational tools or training programs?  </p>}
            rules={[{
                    required: true,
                  },
                ]}>
            <Radio.Group style={{ display: "flex", flexDirection: "column" }}>
                <Radio value="1" style={{fontSize: "18px", marginLeft: "25px"}}>No</Radio>
                <Radio value="2" style={{fontSize: "18px", marginLeft: "25px"}}>Yes</Radio>
            </Radio.Group>
        </Form.Item>


        <Form.Item 
          name="Q7" 
          label={<p style={{ fontSize: "20px" }}>7. How comfortable are you with using AI-based systems in your practice?</p>}
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
              tooltip={{ open: false }} // Hides tooltip to keep it clean
          />
      </Form.Item>

         <Form.Item >
         
        <Button type="primary" htmlType="submit" style={{margin: "40px"}}>
        Submit
        </Button>
        </Form.Item>
      </Form>
      
    </div>
  );
};
export default DemographicsContainer;