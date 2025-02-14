
import React, { Component } from "react";
import { HashRouter, Router, Switch, Route} from 'react-router-dom';

import StartContainer from './pages/start/start';
import InstructionsContainer from './pages/instr/instructions';
import Exp1Trial1Container from "./pages/main/exp1-trial1";
import Exp1Trial2Container from "./pages/main/exp1-trial2";
import Main1Container from "./pages/main/main-task1";
import Main2Container from "./pages/main/main-task2";
import AIPrefaceContainer from "./pages/feedback/ai-preface";
import AIFeedbackContainer from "./pages/feedback/ai-feedback";
import TraditionalFeedbackContainer from "./pages/feedback/traditional-feedback";
import TraditionalPrefaceContainer from "./pages/feedback/traditional-preface";
import Exp2Trial1Container from "./pages/main/exp2-trial1";
import Exp2Trial2Container from "./pages/main/exp2-trial2";
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
                    <Route path="/Exp1Trial1" component={Exp1Trial1Container} />
                    <Route path="/Exp1Trial2" component={Exp1Trial2Container} />
                    <Route path="/FeedbackA-Preface" component={AIPrefaceContainer} />
                    <Route path="/FeedbackB-Preface" component={TraditionalPrefaceContainer} />
                    <Route path="/FeedbackA" component={AIFeedbackContainer} />
                    <Route path="/FeedbackB" component={TraditionalFeedbackContainer} />
                    <Route path="/Exp2Trial1" component={Exp2Trial1Container} />
                    <Route path="/Session1" component={Session1Container} />
                    <Route path="/Session2" component={Session2Container} />
                    <Route path="/Exp2Trial2" component={Exp2Trial2Container} />
                    <Route path="/Rating" component={RateVideoPrefaceContainer} />
                    <Route path="/RateVideo" component={RateVideoContainer} />
                    <Route path="/Main1" component={Main1Container} />
                    <Route path="/Break" component={BreakContainer} />
                    <Route path="/Main2" component={Main2Container} />
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