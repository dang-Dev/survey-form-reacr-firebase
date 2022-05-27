import React, {useState, useEffect} from "react";
import Home from "./components/home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import SignIn from "./Auth/Login";
import { RequireAuth } from "./Auth/RequiredAuth";
import Admin from "./components/Admin";
import {
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from './firebase'

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ height: "100vh" }}>
        <UserAuthContextProvider>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} /> 
            <Route
              path="/admin"
              element={
                <>
                  <RequireAuth>
                    <Admin />
                  </RequireAuth>
                </>
              }
            />
            <Route
              exact
              path="/"
              element={
                <>
                  <Home />
                </>
              }
            />
          </Routes>
        </UserAuthContextProvider>
      </Box>
    </React.Fragment>
  );
}

export default App;
