import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import mongodb from "mongodb";
import "./App.css";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Overview from "./pages/overview/Overview";
import Vegetables from "./pages/vegetables/Vegetables";
import Login from "./pages/Auth/Login";
import Footer from "./shared/components/Navigation/Footer";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [token, setToken] = useState<String | null>(null);
  const [userId, setUserId] = useState<mongodb.ObjectId | null>(null);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Overview />
        </Route>
        <Route path="/vegetables">
          <Vegetables />
        </Route>
        <Route path="/signup">
          <div className="overlay">
            <Login />
          </div>
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/">
          <div className="overlay">
            <Login />
          </div>
        </Route>
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn:  !!token,
        token:  token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <div>
        <Router>
          <MainNavigation />
          <main className="main">
            {routes}
            {token && <Footer />}
          </main>
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
