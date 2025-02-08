
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
import EndContainer from "./pages/end/end";


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
                    <Route path="/AI-Preface" component={AIPrefaceContainer} />
                    <Route path="/Traditional-Preface" component={TraditionalPrefaceContainer} />
                    <Route path="/AI-Feedback" component={AIFeedbackContainer} />
                    <Route path="/Traditional-Feedback" component={TraditionalFeedbackContainer} />
                    <Route path="/Exp2Trial1" component={Exp2Trial1Container} />
                    <Route path="/Exp2Trial2" component={Exp2Trial2Container} />
                    <Route path="/Rating" component={RateVideoPrefaceContainer} />
                    <Route path="/RateVideo" component={RateVideoContainer} />
                    <Route path="/Main1" component={Main1Container} />
                    <Route path="/Main2" component={Main2Container} />
                    <Route path="/Survey" component={SurveyContainer} />
                    <Route path="/End" component={EndContainer} />

                </Switch>
            </HashRouter>

        )
    }
}