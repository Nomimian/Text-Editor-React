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
            errors.email = 'Please enter a valid email address.';
        }
        if (feedback.trim() === '') {
            errors.feedback = 'Feedback cannot be empty.';
        }
        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            props.showAlert("Response Submitted Successfully", "success");

            const content = `Email: ${email}\nFeedback: ${feedback}`;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'feedback.txt';
            a.click();
            URL.revokeObjectURL(url);

            setEmail('');
            setFeedback('');
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="mt-4" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                <div className="mb-3" >
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                        id="email"
                        placeholder="name@example.com"
                        value={email}
                        style={{
                            backgroundColor: props.mode === 'light' ? 'white' : 'grey',
                            color: props.mode === 'dark' ? 'white' : 'black',

                        }}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                </div>
                <div className="mb-3" >
                    <label htmlFor="feedback" className="form-label">Feedback</label>
                    <textarea
                        className={`form-control ${formErrors.feedback ? 'is-invalid' : ''}`}
                        id="feedback"
                        rows="3"
                        value={feedback}
                        style={{
                            backgroundColor: props.mode === 'light' ? 'white' : 'grey',
                            color: props.mode === 'dark' ? 'white' : 'black',

                        }}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                    ></textarea>
                    {formErrors.feedback && <div className="invalid-feedback">{formErrors.feedback}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}
