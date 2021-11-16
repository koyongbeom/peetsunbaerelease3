import React from 'react';
import {Route, HashRouter as Router, Link} from "react-router-dom"
import SignUp from './signup/signup';
import Login from './login/login';
import Dashboard from './dashboard/dashboard';
import {Socket} from "socket.io-client";

interface props {
  socket : Socket;
}

const App : React.FC<props> = (appProps) => {
  
  return (
    <Router>
      <div id="routing-container">
        <Route exact path="/" component={Login}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/dashboard" render={(props)=><Dashboard socket={appProps.socket} {...props}/>} />
      </div>
    </Router>
  )
}

export default App;
