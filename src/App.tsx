import React from 'react';
import {Route, BrowserRouter as Router, Link} from "react-router-dom"
import SignUp from './signup/signup';
import Login from './login/login';
import Dashboard from './dashboard/dashboard';

const App : React.FC = () => {

  return (
    <Router>
      <div id="routing-container">
        <Route exact path="/" component={Login}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
      </div>
    </Router>
  )
}

export default App;
