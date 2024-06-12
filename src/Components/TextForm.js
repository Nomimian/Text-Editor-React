import React, { useState } from "react";

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
        // Check if the clipboard API is available
        if (navigator.clipboard && window.isSecureContext) {
            // Use the clipboard API directly
            navigator.clipboard.writeText(text).then(() => {
                console.log("Text Copied");
                props.showAlert("Text copied to clipboard", "success");
            }).catch((err) => {
                console.error("Failed to copy text: ", err);
                props.showAlert("Failed to copy text", "danger");
            });
        } else {
            // Fallback for older browsers
            let textArea = document.createElement("textarea");
            textArea.value = text;
            // Avoid scrolling to bottom
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
    
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
    
            try {
                document.execCommand('copy');
                console.log("Text Copied");
                props.showAlert("Text copied to clipboard", "success");
            } catch (err) {
                console.error("Failed to copy text: ", err);
                props.showAlert("Failed to copy text", "danger");
            }
    
            document.body.removeChild(textArea);
        }
    }
    

    return (
        <>
            <div className="container" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        id="myBox"
                        placeholder="Welcome to Text-Editor By Mian Numan"
                        value={text}
                        style={{
                            backgroundColor: props.mode === 'light' ? 'white' : 'grey',
                            color: props.mode === 'dark' ? 'white' : 'black',

                        }}
                        onChange={handleOnChange}
                        rows="8"
                    />
                </div>
                <button className="btn btn-primary" onClick={handleUpClick}>Convert To UpperCase</button>
                <button className="btn btn-primary mx-1" onClick={handleLowClick}>Convert To LowerCase</button>
                <button className="btn btn-primary mx-1" onClick={handleSpaceClick}>Remove Extra Spaces</button>
                <button className="btn btn-success mx-1" onClick={handleCopyClick}>Copy Text</button>
                <button className="btn btn-danger mx-1" onClick={handleUndoClick} disabled={history.length === 0}>Undo</button>
                <button className="btn btn-danger mx-1" onClick={handleRedoClick} disabled={redoStack.length === 0}>Redo</button>
                <button type="submit" onClick={speak} className="btn btn-warning mx-1">Speak</button>
                <button className="btn btn-danger mx-1" onClick={handleClearClick}>Clear Text</button>

                <div className="my-3">
                    <input
                        className="form-control"
                        type="text"
                        value={fWord}
                        style={{
                            backgroundColor: props.mode === 'light' ? 'white' : 'grey',
                            color: props.mode === 'dark' ? 'white' : 'black'
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
                            backgroundColor: props.mode === 'light' ? 'white' : 'grey',
                            color: props.mode === 'dark' ? 'white' : 'black'
                        }}
                        onChange={handleReplaceChange}
                        placeholder="Replace With"
                    />
                </div>
                <button className="btn btn-primary my-1" onClick={handleReplaceClick}>Replace</button>
            </div>

            <div className="container" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
                <h1>Your Text Summary</h1>
                <p>{text.trim().length} characters</p>
                <p>{text.replace(/\n/g, " ").split(' ').filter(value => value !== "").length} words</p>
                <p>{0.008 * text.trim().length} minutes to read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Enter your text in above text-box to preview it here"}</p>
            </div>
        </>
    );
}
