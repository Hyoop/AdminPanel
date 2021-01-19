import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';

import "./App.css";
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Overview from './pages/overview/Overview';
import Vegetables from './pages/vegetables/Vegetables';
import Signup from './pages/Auth/Signup';
import Footer from './shared/components/Navigation/Footer';


class App extends Component {


  render () {
    
        
    let routes = (
      <Switch>
        <Route path="/" exact>
            <Overview />
        </Route>
        <Route path="/vegetables">
            <Vegetables />
        </Route>
        <Route path="/signup">
          <div className="overlay">
            <Signup />
          </div>
        </Route>
      </Switch>
     
    )
      
    
    return (
      <Fragment>
        <div>
        <Router>
          <MainNavigation />
            <main className="main">
            {routes}
            <Footer />
            </main>
          </Router>
        </div>
      </Fragment>
    )
  }

}

export default App;

