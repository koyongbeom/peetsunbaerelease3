import React from 'react';
import {Route, BrowserRouter as Router, Link} from "react-router-dom"
import SignUp from './signup/signup';

const App : React.FC = () => {

  return (
    <Router>
      <div id="routing-container">
        <Route path="/signup" component={SignUp}></Route>
        <Link to="/signup">signup</Link>
      </div>
    </Router>
  )
}

export default App;
