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
  const [videoList, setVideoList] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoListLoading, setVideoListLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [currentVideo, setCurrentVideo] = useState("");
  const baseVideoUrl = "./";

  // useEffect(() => {
  //   console.log('getting videos')
  //   fetch("http://localhost:8080/get_videos")
  //     .then(response => response.json())
  //     .then(data => {
  //       setVideoList(data['videos']);
  //       setVideoListLoading(false);
  //       let video_name = data['videos'][0].name;
  //       setCurrentVideo(video_name);
  //     })
  //     .catch(error => console.error("Error fetching videos:", error));
  //     setVideoListLoading(false);
  // }, []);


  const onFinish = (values) => {

    console.log('Received values of form: ', values);
    let copySaveArray = values
    setAnswers(values)
    // save data
    let data = {
        q_id: currentVideo,
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

    if (currentVideoIndex < videoList.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setCurrentVideo(videoList[currentVideoIndex].name);
      form.resetFields();
    } else {
      let path = '/#/Demographics'; 
      window.location.assign(path);
    }
  };

  const sendData = (obj) => {

    const videoName = videoList[currentVideoIndex].name;

    fetch('http://localhost:8080/surveyData', {
      method: 'POST',
      body: JSON.stringify({
        user_id: localStorage.getItem("user-id"),
        folder: 'OSATS_eval',
        type: 'survey',
        video_name: videoName,
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
      .catch(error => console.error("Error: ", error));
  } 

  if (videoListLoading) return <div>Loading videos...</div>;
  if (videoList.length === 0) return <div>No videos available</div>;

  const handleVideoError = () => {
    setVideoLoading(true);  // Keep loading until the video can be retried or error is resolved
  };


  return (
    <div className="container"> 
      <h2>Video {currentVideoIndex + 1} of {videoList.length}</h2>

      <div className="video-wrapper">
          {videoLoading && <div className="loading-message">Loading video...</div>}

          <video
            controls
            width="600"
            onLoadedData={() => setVideoLoading(false)}
            onError={() => handleVideoError()}
            style={videoLoading ? { display: "none" } : {}}
          >
            <source
            src={baseVideoUrl + currentVideo}
            type="video/mp4"
          />
          </video>
        </div>

      <Form {...formItemLayout} layout='vertical'
        name="validate_other"
        onFinish={onFinish}
        initialValues={{
          Q1: 1,
          Q2: 1,
          Q3: 1,
          Q4: 1,
          Q5: 1,
          Q6: 1,
          Q7: 1,
          Q8: 1,
          Q9: 1,
        }}
      >


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

        <Form.Item 
            name="Q5" 
            rules={[{
                    required: true,
                  },
                ]}>
            <Slider 
              min={1} 
              max={5} 
              marks={{
                1: "Awkward or unsure with poor knot typing and inability to maintain tension",
                3: "Competent suturing with good knot placement and appropriate tension",
                5: "Excellent suture control with correct suture placement and tension",
              }} 
              step={1} 
              style={{ width: "60%", margin: "0 auto" }}
              tooltip={{ open: false }} // Hides tooltip to keep it clean
            />
        </Form.Item>

        <Form.Item 
            name="Q6" 
            rules={[{
                    required: true,
                  },
                ]}>
            <Slider 
              min={1} 
              max={5} 
              marks={{
                1: "Frequently stopped operating and seemed unsure of next move",
                3: "Demonstrated some forward planning and reasonable progression of procedure",
                5: "Obviously planned operation",
              }} 
              step={1} 
              style={{ width: "60%", margin: "0 auto" }}
              tooltip={{ open: false }} // Hides tooltip to keep it clean
            />
        </Form.Item>

        <Form.Item 
            name="Q7" 
            rules={[{
                    required: true,
                  },
                ]}>
            <Slider 
              min={1} 
              max={5} 
              marks={{
                1: "Consistently poor placement or failure to use non-dominant hand",
                3: "Appropriate use of non-dominant hand most of the time",
                5: "Strategically used non-dominant hand to the best advantage at all times",
              }} 
              step={1} 
              style={{ width: "60%", margin: "0 auto" }}
              tooltip={{ open: false }} // Hides tooltip to keep it clean
            />
        </Form.Item>

        <Form.Item 
            name="Q8" 
            rules={[{
                    required: true,
                  },
                ]}>
            <Slider 
              min={1} 
              max={5} 
              marks={{
                1: "Inefficient knowledge of procedure; looked unsure and hesitant",
                3: "Knew important steps of procedure",
                5: "Demonstrated familiarity of all steps of procedure",
              }} 
              step={1} 
              style={{ width: "60%", margin: "0 auto" }}
              tooltip={{ open: false }} // Hides tooltip to keep it clean
            />
        </Form.Item>

        <Form.Item 
            name="Q9" 
            rules={[{
                    required: true,
                  },
                ]}>
            <Slider 
              min={1} 
              max={5} 
              marks={{
                1: "Very poor",
                3: "Competent",
                5: "Very good",
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