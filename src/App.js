import './App.css';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import Home from './pages/Home';
import Posts from './pages/Posts';
import PageNotFound from './pages/PageNotFound';

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/posts" component={Posts}/>
          <Route exact path="/404" component={PageNotFound}/>
          <Redirect to="/404"/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
