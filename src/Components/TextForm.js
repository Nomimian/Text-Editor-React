import React, { useState } from "react";
import '../../src/App.css';

export default function TextForm(props) {
    const [text, setText] = useState('');
    const [history, setHistory] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [fWord, findWord] = useState("");
    const [rWord, replaceWord] = useState("");

    const handleUpClick = () => {
        updateText(text.toUpperCase());
        props.showAlert("Converted to UpperCase", "success");
    }

    const handleLowClick = () => {
        updateText(text.toLowerCase());
        props.showAlert("Converted to LowerCase", "success");
    }

    const handleSpaceClick = () => {
        updateText(text.replace(/\s+/g, ' '));
    }

    const handleClearClick = () => {
        updateText('');
        props.showAlert("Cleared All the Text", "danger");
    }

    const handleUndoClick = () => {
        if (history.length > 0) {
            const previousText = history[history.length - 1];
            setRedoStack([text, ...redoStack]);
            setHistory(history.slice(0, -1));
            setText(previousText);
            console.log("Undo " + previousText);
        }
    }

    const handleRedoClick = () => {
        if (redoStack.length > 0) {
            const nextText = redoStack[0];
            setHistory([...history, text]);
            setRedoStack(redoStack.slice(1));
            setText(nextText);
            console.log("Redo " + nextText);
        }
    }

    const handleOnChange = (event) => {
        updateText(event.target.value);
    }

    const speak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
    }

    const handleFindChange = (event) => {
        findWord(event.target.value);
    }

    const handleReplaceChange = (event) => {
        replaceWord(event.target.value);
    }

    const handleReplaceClick = () => {
        let newText = text.replaceAll(fWord, rWord);
        updateText(newText);
    }

    const updateText = (newText) => {
        setHistory([...history, text]);
        setRedoStack([]);
        setText(newText);
    }

    const handleCopyClick = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied successfully", "success");
    }


    return (
        <div>
            <div className="container"
                 style={{
                     color: props.mode === 'dark' ? 'white' : 'black',
                     backgroundColor: props.mode === 'dark' ? '#343a40' : '#F5F5DC', 
                     marginBottom: '20px', 
                     padding: '20px'
                 }}
            >
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        id="myBox"
                        placeholder="Welcome to Text-Editor By Mian Numan"
                        value={text}
                        style={{
                            backgroundColor: props.mode === 'light' ? 'white' : '#899499',
                            color: props.mode === 'dark' ? 'white' : 'black',
                            padding: '10px', // Optional: Adjust padding for text area
                            borderRadius: '5px', // Optional: Add border radius for rounded corners
                            borderColor: props.mode === 'dark' ? '#343a40' : '#ced4da' // Optional: Adjust border color
                        }}
                        onChange={handleOnChange}
                        rows="8"
                    />
                </div>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert To UpperCase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLowClick}>Convert To LowerCase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleSpaceClick}>Remove Extra Spaces</button>
                <button disabled={text.length===0} className="btn btn-success mx-1 my-1" onClick={handleCopyClick}>Copy Text</button>
                <button className="btn btn-danger mx-1 my-1" onClick={handleUndoClick} disabled={history.length === 0}>Undo</button>
                <button className="btn btn-danger mx-1 my-1" onClick={handleRedoClick} disabled={redoStack.length === 0}>Redo</button>
                <button disabled={text.length===0} type="submit" onClick={speak} className="btn btn-warning mx-1 my-1">Speak</button>
                <button disabled={text.length===0} className="btn btn-danger mx-1 my-1" onClick={handleClearClick}>Clear Text</button>

                <div className="my-3">
                    <input
                        className="form-control"
                        type="text"
                        value={fWord}
                        style={{
                            backgroundColor: props.mode === 'light' ? 'white' : '#899499',
                            color: props.mode === 'dark' ? 'white' : 'black',
                            padding: '10px', // Optional: Adjust padding for input field
                            borderRadius: '5px', // Optional: Add border radius for rounded corners
                            borderColor: props.mode === 'dark' ? '#343a40' : '#ced4da' // Optional: Adjust border color
                        }}
                        onChange={handleFindChange}
                        placeholder="Find Word"
                    />
                </div>
                <div className="my-3">
                    <input
                        className="form-control"
                        type="text"
                        value={rWord}
                        style={{
                            backgroundColor: props.mode === 'light' ? 'white' : '#899499',
                            color: props.mode === 'dark' ? 'white' : 'black',
                            padding: '10px', // Optional: Adjust padding for input field
                            borderRadius: '5px', // Optional: Add border radius for rounded corners
                            borderColor: props.mode === 'dark' ? '#343a40' : '#ced4da' // Optional: Adjust border color
                        }}
                        onChange={handleReplaceChange}
                        placeholder="Replace With"
                    />
                </div>
                <button className="btn btn-primary my-1 my-1" onClick={handleReplaceClick}>Replace</button>
            </div>

            <div className="container"
                 style={{
                     color: props.mode === 'dark' ? 'white' : 'black',
                     backgroundColor: props.mode === 'dark' ? '#343a40' : '#F5F5DC',
                     padding: '20px', // Optional: Add padding for content spacing
                     borderRadius: '10px' // Optional: Add border radius for rounded corners
                 }}
            >
                <h1>Your Text Summary</h1>
                <p>{text.split(/\s/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
                <p>{0.008 * text.split(/\s/).filter((element)=>{return element.length!==0}).length} minutes to read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Enter your text in above text-box to preview it here"}</p>
            </div>
            </div>        
    );

}

