import { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import mongodb from "mongodb";
import "./App.css";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Overview from "./pages/overview/Overview";
import Vegetables from "./pages/vegetables/Vegetables";
import Recipes from "./pages/recipes/Recipes";
import Subscriptions from "./pages/subscription/Subscriptions";
import Login from "./pages/Auth/Login";
import Footer from "./shared/components/Navigation/Footer";
import { AuthContext } from "./shared/context/auth-context";

let logoutTimer: NodeJS.Timeout;

const App = () => {

  const [token, setToken] = useState<String | null>(null);
  const [userId, setUserId] = useState<mongodb.ObjectId | null>(null);
  const [tokenexpiration, setTokenexpiration] = useState<any>(null);
  
  const login = useCallback((uid, token, expiration) => {
    setToken(token);
    setUserId(uid);
    const tokenexpiration = expiration || new Date(new Date().getTime() + 1000*60*60*24*20);
    setTokenexpiration(tokenexpiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token: token, expiration: tokenexpiration.toISOString()})
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenexpiration(null);
    setUserId(null);
    localStorage.removeItem('userData')
  }, []);

  useEffect(() => {
    if (token && tokenexpiration) {
      const remainingTime = tokenexpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [tokenexpiration, logout]);

  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);




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
        <Route path="/recipes">
          <Recipes />
        </Route>
        <Route path="/subscription">
          <Subscriptions/>
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
        <Router>
          <MainNavigation />
          <main className="main">
            {routes}
            {token && <Footer />}
          </main>
        </Router>
    </AuthContext.Provider>
  );
};

export default App;
