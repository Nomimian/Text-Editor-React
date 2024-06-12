import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
export default function Navbar(props) {

  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">{props.title}</a>
        {/* <Link className="navbar-brand" to="/">{props.title}</Link> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
              {/* <Link className="nav-link active" aria-current="page" to="/">Home</Link> */}
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/about">{props.about}</a>
               <Link className="nav-link" to="/about">{props.about}</Link> 
            </li> */}
          </ul>
        </div>
        <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
          <input className="form-check-input" type="checkbox" onClick={props.toggleMode} role="switch" id="flexSwitchCheckDefault" />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
        </div>

        <div className={`form-check form-check-inline mx-1 text-${props.mode === 'light' ? 'dark' : 'light'}`} >
          <input className="form-check-input" type="checkbox" onClick={props.backColor} id="inlineCheckbox1" value="option1" />
          <label className="form-check-label" htmlFor="inlineCheckbox1">blue</label>
        </div>

      </div>

    </nav>
  )
}

Navbar.prototype = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired
}

//----------"isRequired" used to check whether our navigation is required for this component to be shown in the navigation bar-----------


//----------Default properties----------
// Navbar.defaultProps = {
//     title: 'Its me',
//     about: 'About me'
//   };