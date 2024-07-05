import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./Components/Login"
import Register from './Components/Register';
import Navbar from "./Components/Navbar";
function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Navbar/>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
