import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./Home";
import BabyName from "./BabyName";
import Profile from "./Profile";
import {ThemeProvider, createTheme}from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#5F9EA0'
    }
  }
});

export default function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      !!parseRes.id ? setIsAuthenticated(true) : setIsAuthenticated(false);
      setAuthId(parseRes.id)
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const [ authId, setAuthId ] = useState();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            {/* <Switch>
              <Route
                exact
                path="/login"
                render={props =>
                  !isAuthenticated ? (
                    <Login {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )
                }
              />
              <Route
                exact
                path="/register"
                render={props =>
                  !isAuthenticated ? (
                    <Register {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )
                }
              />
              <Route
                exact
                path="/dashboard"
                render={props =>
                  isAuthenticated ? (
                    <Dashboard {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
            </Switch> */}

            <Route path="/" element={<Home setAuth={setAuth} />} />
            <Route
              path="/:username"
              element={
                <BabyName setAuth={setAuth} isAuthenticated={isAuthenticated} authId={authId} />
              }
            />

            <Route
              path="/profile/:username"
              element={
                <Profile setAuth={setAuth} isAuthenticated={isAuthenticated} />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
