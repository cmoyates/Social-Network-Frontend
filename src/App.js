import './App.css';
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Home from './pages/Home';
import Feed from './pages/Feed';
import PageNotFound from './pages/PageNotFound';
import {useState} from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import SinglePostPage from './pages/SinglePostPage';
import ProfilePage from './pages/ProfilePage';
import LoggedInPage from './components/LoggedInPage';


/*const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#000000"
  }
}));*/

function App() {

  const [profile, setProfile] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [firstTime, setFirstTime] = useState(false);

  const theme = createTheme({
    palette: {
      //type: "dark"
    },
    backgroundColor: "#000000"
  })

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={(false) ? "App Dark" : "App"}>
          <Switch>
            <Route exact path="/" component={()=><Home setProfile={setProfile} setIsAuth={setIsAuth} isAuth={isAuth} setFirstTime={setFirstTime}/>}/>
            <ProtectedRoute path="/Feed" isAuth={isAuth} component={(props)=><LoggedInPage {...props} profile={profile} setProfile={setProfile} isAuth={isAuth} setIsAuth={setIsAuth} firstTime={firstTime}/*darkMode={darkMode} setDarkMode={setDarkMode}*/ page={<Feed profile={profile}/>}/>}/>
            <Route exact path="/404" component={PageNotFound}/>
            <Route path="/post/:id" component={SinglePostPage}/>
            <ProtectedRoute path="/profile/:id" profile={profile} isAuth={isAuth} component={(props)=><LoggedInPage {...props} profile={profile} setProfile={setProfile} isAuth={isAuth} setIsAuth={setIsAuth} /*darkMode={darkMode} setDarkMode={setDarkMode}*/ page={<ProfilePage profile={profile}/>}/>}/>
            <Redirect to="/404"/>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
