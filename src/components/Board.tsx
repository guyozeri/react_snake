import React, {FC} from "react";
import {findIndex} from "lodash";
import "./Board.scss";

export interface Cell {
    row: number;
    col: number;
}

interface BoardProps {
    snake: Cell[];
    food: Cell;
    dim: number;
}

const Board: FC<BoardProps> = ({snake, food, dim}) => {
    const board = [];
    const row = [];
    for (let i = 0; i < dim; i++) {
        row.push(0);
    }
    for (let i = 0; i < dim; i++) {
        board.push(row);
    }

    return <table>
        {
            board.map((value, index) => <tr>
                {
                    value.map((value, secondIndex) => {
                        let style = {};
                        if (findIndex(snake, {
                                row: index,
                                col: secondIndex
                            }) !== -1) {
                            style = {backgroundColor: "white"};
                        } else {
                            if (food.row === index && food.col === secondIndex) {
                                style = {backgroundColor: "red"};
                            }
                        }
                            return <td style={style}>
                            </td>
                        }
                    )
                }
            </tr>)
        }
    </table>
}

export default Board;