import React from 'react';
import './App.css';
import FrontPage from './FrontPage';
import Shares from './Shares';
import { BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';

const App = () => {

  //render(){
    return (
      <Router>
          <Switch>
            <Route exact path="/" component={withRouter(FrontPage)} />
            <Route exact path="/Shares" component={withRouter(Shares)} />
          </Switch>
      </Router>
    );
  //}
}

export default App;
