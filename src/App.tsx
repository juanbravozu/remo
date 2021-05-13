import { 
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './styles/main.css'; 
import ForgotPassword from './pages/ForgotPassword';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Switch>
            <PrivateRoute path="/" exact component={Dashboard}/>

            <Route path="/login" component={Login}/>

            <Route path="/signup" component={SignUp}/>

            <Route path="/forgotPassword" component={ForgotPassword}/>
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
