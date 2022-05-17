import React from 'react';
import {Route, HashRouter as Router, Link} from "react-router-dom"
import SignUp from './signup/signup';
import Login from './login/login';
import Dashboard from './dashboard/dashboard';
import {Socket} from "socket.io-client";
import Complete from './signup/complete';
import ChartForParent from './dashboard/components/chartforparent';
import QuestionExample from './etc/questionexample';

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
      </div>
    </Router>
  )
}

export default App;
