import React from 'react';
import './App.css';
import FrontPage from './FrontPage';
import Shares from './Shares';
import Login from './Login';
import Register from './Register';
import Admin from './Admin';
import Admin1 from './Admin1';
import Admin2 from './Admin2.js';
import Profile from './Profile';
import Orders from './Orders';
import UserData from './UserData';
import AdminOrders from './AdminOrders';
import { BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';

const App = () => {
    return (
      <Router>
          <Switch>
            <Route exact path="/" component={withRouter(FrontPage)} />
            <Route exact path="/Login" component={withRouter(Login)} />
            <Route exact path="/Register" component={withRouter(Register)} />
            <Route exact path="/Shares" component={withRouter(Shares)} />
            <Route exact path="/Admin" component={withRouter(Admin)} />
            <Route exact path="/Profile" component={withRouter(Profile)} />
            <Route exact path="/Orders" component={withRouter(Orders)} />
            <Route exact path="/Admin1" component={withRouter(Admin1)} />
            <Route exact path="/Admin2" component={withRouter(Admin2)} />
            <Route exact path="/UserData" component={withRouter(UserData)} />
            <Route exact path="/AdminOrders" component={withRouter(AdminOrders)} />
          </Switch>
      </Router>
    );
}

export default App;
