import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FlixHive from "./pages/flixHive"; 
import Login from "./pages/login"; 
import SignUp from "./pages/signUp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<FlixHive />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
