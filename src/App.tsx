import { 
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './styles/main.css'; 
import ForgotPassword from './pages/ForgotPassword';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home}/>

          <Route path="/login" component={Login}/>

          <Route path="/signup" component={SignUp}/>

          <Route path="/forgotPassword" component={ForgotPassword}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
