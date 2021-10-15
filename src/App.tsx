import React from 'react';
import {Route, BrowserRouter as Router, Link} from "react-router-dom"
import SignUp from './signup/signup';
import Login from './login/login';

const App : React.FC = () => {

  return (
    <Router>
      <div id="routing-container">
        <Route exact path="/" component={Login}></Route>
        <Route path="/signup" component={SignUp}></Route>
      </div>
    </Router>
  )
}

export default App;
