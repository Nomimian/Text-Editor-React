import React, { useState } from 'react';

export default function About(props) {
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateForm = () => {
        const errors = {};
        if (!validateEmail(email)) {
            errors.email = 'Invalid email address';
        }
        if (!feedback) {
            errors.feedback = 'Feedback cannot be empty';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Email:', email);
            console.log('Feedback:', feedback);
            setEmail('');
            setFeedback('');
            props.showAlert('Your feedback is successfully sent.', 'success');
        } else {
            props.showAlert('Please correct the errors in the form.', 'danger');
        }
    };

    return (
        <div className="container" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
            <h1 className="my-3">About Us</h1>
            <p>
                Welcome to Text-Editor, your go-to web application for easy and efficient text manipulation. Whether you need to convert text cases, remove extra spaces, or find and replace specific words, we've got you covered. Our simple and intuitive interface makes text editing a breeze.
            </p>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-describedby="emailHelp"
                    />
                    {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="feedback" className="form-label">Feedback</label>
                    <textarea
                        className={`form-control ${formErrors.feedback ? 'is-invalid' : ''}`}
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows="4"
                    />
                    {formErrors.feedback && <div className="invalid-feedback">{formErrors.feedback}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
