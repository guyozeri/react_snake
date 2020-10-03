import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {isEqual, last, uniqWith} from 'lodash';
import Board, {Cell} from "./components/Board";

function App() {
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [direction, setDirection] = useState<Cell>({row: 0, col: 1});
    const initialSnake: Cell[] = [{row: 1, col: 1}, {row: 1, col: 2}, {row: 1, col: 3}];
    const [snake, setSnake] = useState<{ row: number, col: number }[]>(initialSnake)
    const [isLost, setIsLost] = useState<boolean>(false)
    const dim = 15;

    useEffect(() => {
        const head = last(snake);
        let touchedEdge = false;
        if (head) {
            touchedEdge = head.row < 0 || head.row > dim || head.col < 0 || head.col > dim;
        }
        if (uniqWith(snake, isEqual).length !== snake.length || touchedEdge) {
            setIsLost(true);
            setIsPlaying(false);
        } else {
            setIsLost(false);
        }
    }, [snake])

    const moveSnake = useCallback(() => {
        setSnake(prevSnake => {
            const head = last(prevSnake);
            const newSnake = prevSnake.slice(1, prevSnake.length)
            if (head) {
                newSnake.push({row: head.row + direction.row, col: head.col + direction.col})
            }
            return newSnake
        })
    }, [direction]);


    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(
                moveSnake, 250
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
        if (isPlaying) {
            switch (event.key) {
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
        } else {
            if (event.key === ' ') {
                setIsPlaying(isPlaying => !isPlaying);
            }
        }
    }

    return (
        <div className="App" tabIndex={0} onKeyDown={handleKeyDown}>
            <header className="App-header">
                <div>
                    <h1>{isPlaying ? "Playing" : "Press space to start"}</h1>
                    {!isLost || <h1>lost</h1>}
                    <Board snake={snake} dim={dim}/>
                </div>
            </header>
        </div>
    );
}

export default App;
