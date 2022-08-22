
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import SnippetsList from './Pages/SnippetsList';

const App = () => {
  return <>
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            localStorage.getItem('token') ?
              <Navigate to="/snippets" /> :
              <Navigate to="/login" />

          }
        />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/snippets" exact element={<SnippetsList />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App;