import './App.css';
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from './pages/Home';
import Posts from './pages/Posts';
import PageNotFound from './pages/PageNotFound';
import {useState} from 'react';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  const [profile, setProfile] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={()=><Home setProfile={setProfile} setIsAuth={setIsAuth} isAuth={isAuth}/>}/>
          <ProtectedRoute path="/posts" isAuth={isAuth} component={(props)=><Posts {...props} profile={profile} setProfile={setProfile} isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
          <Route exact path="/404" component={PageNotFound}/>
          <Redirect to="/404"/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
