import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import netflix from "./pages/netflix.jsx";
import login from "./pages/login.jsx";
import signUp from "./pages/signUp.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/login" element={<login />}/>
        <Route path="/" element={<netflix />}/>
        <Route path="/signUp" element={<signUp />}/>
      </Routes>
    </BrowserRouter>
  );
}