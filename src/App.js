import './App.css';
import Alert from './Components/Alert';
import Navbar from './Components/Navbar';
import TextForm from './Components/TextForm';
import About from './Components/About';
import React, { useState } from 'react'
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light')
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  }


  const toggleMode=()=>{
    if (mode === 'light') {
      setMode('dark')
      document.body.style.backgroundColor = "grey";
      showAlert("Dark mode has been enabled", "success");
      document.title = "Text-Editor - Dark Mode";
    } else {
      setMode('light')
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
      document.title = "Text-Editor - Light Mode";
    }
  }


  return (
    <Router>
      <div>
        <Navbar title="Text-Editor" about="About" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} /> 
        <div className="container">
          <Routes> 
            <Route exact path="/about" element={<About  mode={mode} showAlert={showAlert}/>} />
            <Route exact path="/" element={<TextForm heading="Enter text to analyze" mode={mode} showAlert={showAlert} />} />
          </Routes>
        </div>
      </div>
       </Router>
  );
}

export default App;
