import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {findIndex, last} from 'lodash';

function App() {
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [direction, setDirection] = useState<{ row: number, col: number }>({row: 0, col: 1});
    const initialSnake: { row: number, col: number }[] = [{row: 1, col: 1}, {row: 1, col: 2}, {row: 1, col: 3}];
    const [snake, setSnake] = useState<{ row: number, col: number }[]>(initialSnake)
    const dim = 15;
    const board = [];
    const row = [];
    for (let i = 0; i < dim; i++) {
        row.push(0);
    }
    for (let i = 0; i < dim; i++) {
        board.push(row);
    }

    const moveSnake = useCallback(() => {
        setSnake(prevState => {
            const lastCell = last(prevState);
            const newState = prevState.slice(1, prevState.length)
            if (lastCell) {
                newState.push({row: lastCell.row + direction.row, col: lastCell.col + direction.col})
            }
            return newState
        })
    }, [direction]);


    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(
                moveSnake, 500
            );
            return () => clearInterval(interval);
        }
    }, [moveSnake, isPlaying])

    useEffect(() => moveSnake(), [direction, moveSnake])

    const changeDirection = (row: number, col: number) => {
        if (direction.row === row && direction.col === col) {
            return;
        }
        setDirection({row, col});
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        switch (event.key) {
            case ' ':
                setIsPlaying(isPlaying => !isPlaying);
                break;
            case 'ArrowRight':
                changeDirection(0, 1);
                break;
            case 'ArrowLeft':
                changeDirection(0, -1);
                break;
            case 'ArrowDown':
                changeDirection(1, 0);
                break;
            case 'ArrowUp':
                changeDirection(-1, 0);
                break;
        }
    }

    return (
        <div className="App" tabIndex={0} onKeyDown={handleKeyDown}>
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
