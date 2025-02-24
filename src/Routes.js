
import React, { Component } from "react";
import { HashRouter, Router, Switch, Route} from 'react-router-dom';

import StartContainer from './pages/start/start';
import InstructionsContainer from './pages/instr/instructions';
import PrefaceContainer from "./pages/feedback/description-feedback";
import AIPrefaceContainer from "./pages/feedback/ai-preface";
import AIFeedbackContainer from "./pages/feedback/ai-feedback";
import TraditionalFeedbackContainer from "./pages/feedback/traditional-feedback";
import TraditionalPrefaceContainer from "./pages/feedback/traditional-preface";
import RateVideoPrefaceContainer from "./pages/rating/rate-video-preface";
import RateVideoContainer from "./pages/rating/rate-video";
import PracticeContainer from "./pages/main/practice";
import SurveyContainer from "./pages/survey/survey"
import Survey2Container from "./pages/survey/survey2";
import EndContainer from "./pages/end/end";
import Session1Container from "./pages/main/session1";
import Session2Container from "./pages/main/session2";
import Survey2FeedbackContainer from "./pages/survey/survey2-feedback";
import DemographicsContainer from "./pages/survey/demographics";
import BreakContainer from "./pages/main/break";


export default class Routes extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={StartContainer} />
                    <Route path="/Instructions" component={InstructionsContainer} />
                    <Route path="/Practice" component={PracticeContainer} />
                    <Route path="/Feedback-Preface" component={PrefaceContainer}/>
                    <Route path="/FeedbackA" component={AIFeedbackContainer} />
                    <Route path="/FeedbackB" component={TraditionalFeedbackContainer} />
                    <Route path="/Session1" component={Session1Container} />
                    <Route path="/Session2" component={Session2Container} />
                    <Route path="/Rating" component={RateVideoPrefaceContainer} />
                    <Route path="/RateVideo" component={RateVideoContainer} />
                    <Route path="/Break" component={BreakContainer} />
                    <Route path="/Survey" component={SurveyContainer} />
                    <Route path="/Survey2" component={Survey2Container} />
                    <Route path="/Demographics" component={DemographicsContainer} />
                    <Route path="/Survey2Feedback" component={Survey2FeedbackContainer} />
                    <Route path="/End" component={EndContainer} />

                </Switch>
            </HashRouter>

        )
    }
}