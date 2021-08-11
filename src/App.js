import './App.css';
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from './pages/Home';
import Feed from './pages/Feed';
import PageNotFound from './pages/PageNotFound';
import {useState} from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import SinglePostPage from './pages/SinglePostPage';
import ProfilePage from './pages/ProfilePage';
import LoggedInPage from './components/LoggedInPage';

function App() {

  const [profile, setProfile] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={()=><Home setProfile={setProfile} setIsAuth={setIsAuth} isAuth={isAuth}/>}/>
          <ProtectedRoute path="/Feed" isAuth={isAuth} component={(props)=><LoggedInPage {...props} profile={profile} setProfile={setProfile} isAuth={isAuth} setIsAuth={setIsAuth} page={<Feed profile={profile}/>}/>}/>
          <Route exact path="/404" component={PageNotFound}/>
          <Route path="/post/:id" component={SinglePostPage}/>
          <ProtectedRoute path="/profile/:id" profile={profile} isAuth={isAuth} component={(props)=><LoggedInPage {...props} profile={profile} setProfile={setProfile} isAuth={isAuth} setIsAuth={setIsAuth} page={<ProfilePage profile={profile}/>}/>}/>
          <Redirect to="/404"/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
