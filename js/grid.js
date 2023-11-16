import{Cell} from "./cell.js"

export class Grid{
    constructor(gridElement, size = 10){
        this.size = size;
        this.board = []

        for (let i = 0; i < this.size; i++) {
            let tmp = []
            for(let j = 0; j < this.size; j++){
                tmp.push(
                    new Cell(gridElement)
                )
            }
            this.board.push(tmp)
        }

        return this.board
    }
}