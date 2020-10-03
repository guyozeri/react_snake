import React, {useState} from 'react';
import './App.css';

function App() {
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    return (
        <div className="App" tabIndex={0} onKeyPress={event => {
            if (event.key === ' ') {
                setIsPlaying(isPlaying => !isPlaying);
            }
        }}>
            <header className="App-header">
                <div>
                    <h1>{isPlaying ? "Playing" : "Press space to start"}</h1>
                </div>
            </header>
        </div>
    );
}

export default App;
