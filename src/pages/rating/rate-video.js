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
  const baseVideoUrl = "./participants_clips/";

  useEffect(() => {
    console.log('getting videos')
    fetch("http://localhost:8080/get_videos", {
        method: 'POST',
        body: JSON.stringify({
          user_id: localStorage.getItem("user-id"),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => response.json())
      .then(data => {
        console.log(data)
        setVideoList(data['videos']);
        setVideoListLoading(false);
        let video_name = data['videos'][0];
        setCurrentVideo(video_name);
      })
      .catch(error => console.error("Error fetching videos:", error));
      setVideoListLoading(false);
  }, []);


  const onFinish = (values) => {

    console.log('Received values of form: ', values);
    let copySaveArray = values
    setAnswers(values)
    // save data
    let data = {
        q_id: currentVideo,
        timeAndMotion: values.Q1,
        instrumentHandling: values.Q2,
        useOfInstruments: values.Q3,
        sutureHandling: values.Q4,
        flowOfOperation: values.Q5,
    };
    sendData(data)

    if (currentVideoIndex < videoList.length - 1) {
      console.log('updating video name')
      // let video_name = videoList[currentVideoIndex + 1];
      // console.log(video_name)
      // setCurrentVideoIndex((prevIndex) => prevIndex + 1);
      // setCurrentVideo(video_name);

      const nextIndex = currentVideoIndex + 1;
      setCurrentVideoIndex(nextIndex);
      setCurrentVideo(videoList[nextIndex]); 
      form.resetFields();
      console.log("Next video for rendering:", videoList[nextIndex]);  
      window.scrollTo(0, 0);
    } else {
      let path = '/#/Demographics'; 
      window.location.assign(path);
      window.scrollTo(0, 0);
    }
  };

//   useEffect(() => {
//     // Reset form to initial values when video changes
//     form.resetFields();
//     form.setFieldsValue({
//         Q1: 1,
//         Q2: 1,
//         Q3: 1,
//         Q4: 1,
//         Q5: 1
//     });
// }, [currentVideo]);

  useEffect(() => {
    console.log("Updated currentVideo for rendering:", currentVideo);
  }, [currentVideo]);

  // useEffect(() => {
  //   if (videoList.length > 0) {
  //     setCurrentVideo(videoList[currentVideoIndex]);
  //     console.log("Updated currentVideo:", videoList[currentVideoIndex]);
  //     console.log(currentVideo)
  //   }
  // }, [currentVideoIndex, videoList]);

  const sendData = (obj) => {

    const videoName = videoList[currentVideoIndex];
    const match = videoName.match(/trial\d+/);
    

    fetch('http://localhost:8080/osatsData', {
      method: 'POST',
      body: JSON.stringify({
        user_id: localStorage.getItem("user-id"),
        folder: 'OSATS_eval',
        video_trial: match[0],
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

  const marks_q1 = {
    1: (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
        1- Many unnecessary{"\n"}movements
      </div>
    ),
    2: "2",
    3: (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
        3-Efficient time and motion,{"\n"} but some unnecessary movements
      </div>
    ),
    4: "4",
    5: (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "center",width: "150px", margin: "0 auto"}}>
        5-Clear economy of{"\n"}movement and{"\n"}maximum efficiency
      </div>
    )
  };

  const marks_q2 = {
    1: (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
        1-Repeatedly makes tentative or{"\n"} awkward moves with instruments
      </div>
    ),
    2: "2",
    3: (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
        3-Competent use of instruments,{"\n"} but occasionally awkward
      </div>
    ),
    4: "4",
    5: (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "center",width: "150px", margin: "0 auto"}}>
        5-Fluid movements
      </div>
    )
  };

  const marks_q3 = {
    1: (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
        1-Frequently utilized {"\n"}inappropriate instrument 
      </div>
    ),
    2: "2",
    3: (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
        3-Generally used appropriate {"\n"}instruments
      </div>
    ),
    4: "4",
    5: (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "center",width: "150px", margin: "0 auto"}}>
        5-Obviously familiar {"\n"}with instruments and their use
      </div>
    )
  };

  const marks_q4 = {
    1: (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
        1-Awkward or unsure with {"\n"}poor knot typing and {"\n"}inability to maintain tension 
      </div>
    ),
    2: "2",
    3: (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
        3-Competent suturing with {"\n"}good knot placement and{"\n"} appropriate tension
      </div>
    ),
    4: "4",
    5: (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "center",width: "150px", margin: "0 auto"}}>
        5-Excellent suture control with correct {"\n"}suture placement and tension
      </div>
    )
  };

  const marks_q5 = {
    1: (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
        1-Frequently stopped operating {"\n"}and seemed unsure of next move
      </div>
    ),
    2: "2",
    3: (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
        3-Demonstrated some forward {"\n"}planning and reasonable {"\n"}progression of procedure
      </div>
    ),
    4: "4",
    5: (
      <div style={{ whiteSpace: "pre-wrap", textAlign: "center",width: "150px", margin: "0 auto"}}>
        5-Obviously planned operation
      </div>
    )
  };


  return (
    <div className="container"> 
      <h2>Video {currentVideoIndex + 1} of {videoList.length}</h2>

      <div className="video-wrapper">
          {videoLoading && <div className="loading-message">Loading video...</div>}

          <video
            key={currentVideo}
            controls
            width="600"
            onLoadedData={() => setVideoLoading(false)}
            onError={() => handleVideoError()}
            style={videoLoading ? { display: "none" } : {}}
          >
            <source
            src={`${baseVideoUrl}${currentVideo}`} 
            type="video/mp4"
          />
          </video>
        </div>

      <Form {...formItemLayout} layout='vertical'
        form={form}
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


        <div className='text'>Please select the operator's performance in each category based on the current video. </div>
        

        <Form.Item 
            name="Q1" 
            label={<p style={{ fontSize: "20px" }}>Time and motion</p>}
            style={{ marginBottom: "50px" }}
            rules={[{
                    required: true,
                  },
                ]}>
            <Slider 
              min={1} 
              max={5} 
              step={1}
              marks={marks_q1} 
              style={{ width: "60%", margin: "0 auto" }}
              tooltip={{formatter: (value) => value }} // Hides tooltip to keep it clean
            />
        </Form.Item>


        <Form.Item 
            name="Q2" 
            label={<p style={{ fontSize: "20px" }}>Instrument Handling</p>}
            style={{ marginBottom: "50px" }}
            rules={[{
                    required: true,
                  },
                ]}>
            <Slider 
              min={1} 
              max={5} 
              marks={marks_q2}
              step={1} 
              style={{ width: "60%", margin: "0 auto" }}
              tooltip={{ open: false }} // Hides tooltip to keep it clean
            />
        </Form.Item>

        <Form.Item 
            name="Q3" 
            label={<p style={{ fontSize: "20px" }}>Use of instruments</p>}
            style={{ marginBottom: "50px" }}
            rules={[{
                    required: true,
                  },
                ]}>
            <Slider 
              min={1} 
              max={5} 
              marks={marks_q3}
              step={1} 
              style={{ width: "60%", margin: "0 auto" }}
              tooltip={{ open: false }} // Hides tooltip to keep it clean
            />
        </Form.Item>

        <Form.Item 
            name="Q4" 
            label={<p style={{ fontSize: "20px" }}>Suture handling</p>}
            style={{ marginBottom: "50px" }}
            rules={[{
                    required: true,
                  },
                ]}>
            <Slider 
              min={1} 
              max={5} 
              marks={marks_q4}
              step={1} 
              style={{ width: "60%", margin: "0 auto" }}
              tooltip={{ open: false }} // Hides tooltip to keep it clean
            />
        </Form.Item>

        <Form.Item 
            name="Q5" 
            label={<p style={{ fontSize: "20px" }}>Flow of operation</p>}
            style={{ marginBottom: "80px" }}
            rules={[{
                    required: true,
                  },
                ]}>
            <Slider 
              min={1} 
              max={5} 
              marks={marks_q5}
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