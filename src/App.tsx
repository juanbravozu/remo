import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory
} from 'react-router-dom';
import { Button } from '@material-ui/core';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Splash from './pages/Splash';
import './styles/main.css';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home}/>

          <Route path="/login" component={Login}/>

          <Route path="/signup" component={SignUp}/>

          <Route path="/welcome" component={Splash}/>
        </Switch>
      </Router>        
    </div>
  );
}

export default App;
