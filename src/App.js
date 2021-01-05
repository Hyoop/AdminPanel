import React from 'react';
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';

import "./App.css";
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Overview from './pages/overview/Overview';
import Vegetables from './pages/vegetables/Vegetables';
import Footer from './shared/components/Navigation/Footer';

function App() {
  return (
    <div>
      <Router>
        <MainNavigation />
        <main className="main">
          <Switch>
            <Route path="/" exact>
                <Overview />
            </Route>
            <Route path="/vegetables">
                <Vegetables />
            </Route>
          </Switch>
          <Footer />
        </main>
      </Router>
    </div>
    
    
  )

}

export default App;

