import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import {isEqual, last, uniqWith} from 'lodash';
import Board, {Cell} from "./components/Board";

function App() {
    const initialSnake: Cell[] = useMemo(() => [{row: 1, col: 1}, {row: 1, col: 2}, {row: 1, col: 3}], []);
    const initialDirection: Cell = useMemo(() => {
        return {row: 0, col: 1}
    }, []);
    const dim = 15;

    const [turn, setTurn] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [direction, setDirection] = useState<Cell>(initialDirection);
    const [snake, setSnake] = useState<{ row: number, col: number }[]>(initialSnake)
    const [isLost, setIsLost] = useState<boolean>(false)
    const [foodCell, setFoodCell] = useState<Cell>({
        row: Math.floor(Math.random() * dim),
        col: Math.floor(Math.random() * dim)
    })


    const moveSnake = useCallback((shouldSlice: boolean = true) => {
        setSnake(prevSnake => {
            const head = last(prevSnake);
            const initialIndex = isEqual(head, foodCell) ? 0 : 1;
            if (isEqual(head, foodCell)) {
                setFoodCell({
                    row: Math.floor(Math.random() * dim),
                    col: Math.floor(Math.random() * dim)
                });
            }
            const newSnake = prevSnake.slice(initialIndex, prevSnake.length)
            if (head) {
                newSnake.push({row: head.row + direction.row, col: head.col + direction.col})
            }
            return newSnake
        });
    }, [foodCell, direction]);

    useEffect(() => {
        const head = last(snake);
        let touchedEdge = false;
        if (head) {
            touchedEdge = head.row < 0 || head.row >= dim || head.col < 0 || head.col >= dim;
        }
        if (uniqWith(snake, isEqual).length !== snake.length || touchedEdge) {
            setIsLost(true);
            setIsPlaying(false);
        } else {
            setIsLost(false);
        }
    }, [snake])

    useEffect(moveSnake, [turn])

    useEffect(() => {
        if (isPlaying) {
            setSnake(initialSnake);
            setDirection(initialDirection)
        }
    }, [initialDirection, initialSnake, isPlaying])

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(
                () => setTurn(prevState => prevState += 1), 200
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
                    <Board snake={snake} food={foodCell} dim={dim}/>
                </div>
            </header>
        </div>
    );
}

export default App;
