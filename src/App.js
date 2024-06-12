import './App.css';
import Alert from './Components/Alert';
import Navbar from './Components/Navbar';
import TextForm from './Components/TextForm';
// import About from './Components/About';
import React, { useState } from 'react'
// import { BrowserRouter as Router,Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light')
  const [color, setColor] = useState('white')
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

  const toggleMode = () => {
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

  const backColor = () => {
    if(color === 'white'){
      setColor('blue')
      document.body.style.backgroundColor = "#89CFF0";
      showAlert("Blue Mode Activated ", "success");
    } else {
      setColor('white')
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
    }
  }

  return (
    // <Router>
      <div>
        <Navbar title="Text-Editor" about="About" mode={mode} backColor={backColor} toggleMode={toggleMode} />
        <Alert alert={alert} /> 
        <div className="container">
          {/* <Routes> */}
            {/* react will do partial match if we simply add "path", "exact path" can exactly match to path */}
            {/* users  --> component 1
            users/page ---> component 2 
            it will show component 1 if we use only "path", because starting name is same 
            so we use "exact match"*/}
            {/* <Route exact path="/about" element={<About  mode={mode} showAlert={showAlert}/>} />
            <Route exact path="/" element={<TextForm heading="Enter text to analyze" mode={mode} showAlert={showAlert} />} />
          </Routes> */}
          <TextForm mode={mode} showAlert={showAlert}/>
          {/* <About mode={mode} showAlert={showAlert}/> */}
        </div>
      </div>
    // </Router>
  );
}

export default App;
