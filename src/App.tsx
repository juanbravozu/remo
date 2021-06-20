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
import { ThemeProvider } from '@material-ui/styles';
import theme from './utils/theme';
import Statistics from './pages/Statistics';

function App() {

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Switch>
              <PrivateRoute path="/" exact component={Dashboard}/>

              <Route path="/inicia-sesion" component={Login}/>

              <Route path="/registrate" component={SignUp}/>

              <Route path="/olvidaste-tu-contrasena" component={ForgotPassword}/>

              <Route path="/estadisticas" component={Statistics}/>
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
