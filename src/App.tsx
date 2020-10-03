import React, {useEffect, useState} from 'react';
import './App.css';
import {findIndex, last} from 'lodash';

function App() {
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const initialSnake: { row: number, col: number }[] = [{row: 1, col: 1}, {row: 1, col: 2}, {row: 1, col: 3}];
    const [snake, setSnake] = useState<{ row: number, col: number }[]>(initialSnake)
    const dim = 20;
    const board = [];
    const row = [];
    for (let i = 0; i < dim; i++) {
        row.push(0);
    }
    for (let i = 0; i < dim; i++) {
        board.push(row);
    }

    // useEffect(() => console.log(snake))

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(
                () => {
                    setSnake(prevState => {
                        const lastCell = last(prevState);
                        const newState = prevState.slice(1, prevState.length)
                        if (lastCell) {
                            newState.push({row: lastCell.row, col: lastCell.col + 1})
                        }
                        return newState
                    })
                }, 1000
            );
            return () => clearInterval(interval);
        }
    }, [isPlaying])

    return (
        <div className="App" tabIndex={0} onKeyPress={event => {
            if (event.key === ' ') {
                setIsPlaying(isPlaying => !isPlaying);
            }
        }}>
            <header className="App-header">
                <div>
                    <h1>{isPlaying ? "Playing" : "Press space to start"}</h1>
                    <table>
                        {
                            board.map((value, index) => <tr>
                                {
                                    value.map((value, secondIndex) =>
                                        <td style={findIndex(snake, {
                                            row: index,
                                            col: secondIndex
                                        }) !== -1 ? {backgroundColor: "white"} : {}}>
                                            bla
                                        </td>
                                    )
                                }
                            </tr>)
                        }
                    </table>
                </div>
            </header>
        </div>
    );
}

export default App;
