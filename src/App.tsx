import React from 'react';
import {Route, HashRouter as Router, Link} from "react-router-dom"
import SignUp from './signup/signup';
import Login from './login/login';
import Dashboard from './dashboard/dashboard';
import {Socket} from "socket.io-client";
import Complete from './signup/complete';
import ChartForParent from './dashboard/components/chartforparent';
import QuestionExample from './etc/questionexample';
import Login2 from "./login/login2";
import Wordtest from "./etc/wordtest";
import Wordtestreal from "./etc/wordtestreal";
import RegularParentpermit from './etc/regularparentpermit';
import SuddenNoticepermit from './etc/suddennoticepermit';

interface props {
  socket : Socket;
}

const App : React.FC<props> = (appProps) => {
  
  return (
    <Router>
      <div id="routing-container">
        <Route exact path="/chartforparent" component={ChartForParent}></Route>
        <Route exact path="/" component={Login}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/complete" component={Complete}></Route>
        <Route path="/dashboard" render={(props)=><Dashboard socket={appProps.socket} {...props}/>} />
        <Route path="/view/questionexample" component={QuestionExample}></Route>
        <Route path="/login2" component={Login2}></Route>
        <Route path="/wordtest" component={Wordtest}></Route>
        <Route path="/wordtestreal" component={Wordtestreal}></Route> 
        <Route path="/regularschedulepermit" component={RegularParentpermit}></Route>
        <Route path="/suddennoticepermit" component={SuddenNoticepermit}></Route>
      </div>
    </Router>
  )
}

export default App;
