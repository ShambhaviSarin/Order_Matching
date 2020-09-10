import React from 'react';
import './App.css';
import FrontPage from './FrontPage';
import Shares from './Shares';
import Login from './Login';
import { BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';

const App = () => {
    return (
      <Router>
          <Switch>
            <Route exact path="/" component={withRouter(FrontPage)} />
            <Route exact path="/Login" component={withRouter(Login)} />
            <Route exact path="/Shares" component={withRouter(Shares)} />
          </Switch>
      </Router>
    );
}

export default App;