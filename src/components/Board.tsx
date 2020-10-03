import React, {FC} from "react";
import {findIndex} from "lodash";

export interface Cell {
    row: number;
    col: number;
}

interface BoardProps {
    snake: Cell[];
    dim: number;
}

const Board: FC<BoardProps> = ({snake, dim}) => {
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
}

export default Board;