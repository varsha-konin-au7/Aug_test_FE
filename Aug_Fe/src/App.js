import React ,{useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import {loadUser} from './actions/auth'

// Neeeded
import Profile from './components/dashboard/Profile'

import Main from './components/Main'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Sell from './components/dashboard/Sell'
import Postdetail from './components/dashboard/Postdetail'
import Dashboard from './components/dashboard/Dashboard'
import Addpost from './components/dashboard/Addpost'
import Navbar from './components/Navbar'
import './App.css';
import PrivateRoute from './components/routing/PrivateRoute'


const  App= () => {

  useEffect(() => {
      store.dispatch(loadUser());
    }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <Switch>
          <div>
                <PrivateRoute exact path='/add' component={Addpost} />
                <PrivateRoute exact path={'/profile/:id'} component={Postdetail} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path='/' component={Main}/>
          </div>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
