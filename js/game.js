import { Grid } from "./grid.js";

export class Game {
    constructor(gridElement, mines = 10) {
        this.board = new Grid(gridElement)
        this.boardValue = this.helperArray(0)
        this.flags = this.helperArray(false)
        this.mines = mines
        this.unrevealedCells = 10 * 10 - mines;
        this.placeMines()
        console.log(this.boardValue)
        this.handlerClick()

        this.timer = null;
        this.seconds = 0;
        this.timerElement = document.querySelector('.timer');
    }


    startTimer() {
        this.timer = setInterval(() => {
            this.seconds++;
            this.timerElement.textContent = this.seconds;
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    handlerClick() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                this.board[i][j].addEventListener('click', () => {
                    if (!this.timer) {
                        this.startTimer();
                    }
                    this.revelod(i, j)
                })

                this.board[i][j].addEventListener('contextmenu', (event) => {
                    event.preventDefault();
                    if (this.board[i][j].textContent == '') {
                        this.board[i][j].textContent = 'F';
                        this.board[i][j].style.color = '#dd8e8e'
                    }
                });
            }
        }
    }
    helperArray(value) {
        let tmp = []
        for (let i = 0; i < this.board.length; i++) {
            let row = []
            for (let j = 0; j < this.board.length; j++) {
                row.push(value)
            }
            tmp.push(row)
        }

        return tmp;
    }
    placeMines() {
        let counter = 0

        while (counter < this.mines) {
            let x = parseInt(Math.random() * this.board.length)
            let y = parseInt(Math.random() * this.board.length)
            console.log(`${y} - ${x}`)
            if (this.boardValue[x][y] != -1) {
                this.boardValue[x][y] = -1;

                counter++
            }


        }
    }

    countMines(x, y) {
        let counter = 0;

        if (x > 0 && this.boardValue[x - 1][y] == -1) {
            counter++;
        }
        if (x < this.board.length - 1 && this.boardValue[x + 1][y] == -1) {
            counter++;
        }
        if (y > 0 && this.boardValue[x][y - 1] == -1) {
            counter++;
        }
        if (y < this.board.length - 1 && this.boardValue[x][y + 1] == -1) {
            counter++;
        }
        if (x > 0 && y > 0 && this.boardValue[x - 1][y - 1] == -1) {
            counter++;
        }
        if (x < this.board.length - 1 && y > 0 && this.boardValue[x + 1][y - 1] == -1) {
            counter++;
        }
        if (x > 0 && y < this.board.length - 1 && this.boardValue[x - 1][y + 1] == -1) {
            counter++;
        }
        if (x < this.board.length - 1 && y < this.board.length - 1 && this.boardValue[x + 1][y + 1] == -1) {
            counter++;
        }

        return counter;
    }

    revelod(x, y) {
        if (this.boardValue[x][y] == -1) {
            this.endGame();
        }
        else if (!this.flags[x][y]) {
            let mines = this.countMines(x, y);
            this.flags[x][y] = true;
            this.board[x][y].textContent = mines;
            this.print(x, y);

            this.unrevealedCells--;
            console.log(this.unrevealedCells)

            if (this.unrevealedCells == 0) {
                this.winGame();
                return;
            }


            if (mines == 0) {
                if (x > 0) {
                    this.revelod(x - 1, y);
                }
                if (x < this.board.length - 1) {
                    this.revelod(x + 1, y);
                }
                if (y > 0) {
                    this.revelod(x, y - 1)
                }
                if (y < this.board.length - 1) {
                    this.revelod(x, y + 1)
                }
                if (x > 0 && y > 0) {
                    this.revelod(x - 1, y - 1);
                }
                if (x < this.board.length - 1 && y < this.board.length - 1) {
                    this.revelod(x + 1, y + 1);
                }
                if (x > 0 && y < this.board.length - 1) {
                    this.revelod(x - 1, y + 1)
                }
                if (x < this.board.length - 1 && y > 0) {
                    this.revelod(x + 1, y - 1)
                }
            }
        }
    }

    print(x, y) {
        this.board[x][y].classList.add('visible')

        if (this.board[x][y].textContent == 0) {
            this.board[x][y].textContent = " "
        }
        else if (this.board[x][y].textContent == 1) {
            this.board[x][y].style.color = 'blue'
        }
        else if (this.board[x][y].textContent == 2) {
            this.board[x][y].style.color = 'green'
        }
        else if (this.board[x][y].textContent == 3) {
            this.board[x][y].style.color = 'red'
        }
        else if (this.board[x][y].textContent == 4) {
            this.board[x][y].style.color = 'darkblue'
        }
        else if (this.board[x][y].textContent == 5) {
            this.board[x][y].style.color = 'brown'
        }
    }

    endGame() {
        let game_over = document.querySelector(".game_over");
        let try_again = document.querySelector(".try_again");

        this.stopTimer()
        if (!game_over.classList.contains("show")) {
            game_over.classList.add("show");
        }

        try_again.addEventListener('click', () => {
            game_over.classList.remove("show");
            window.location.reload('../index.html');
        });
    }


    winGame() {
        let win_message = document.querySelector(".win_message");
        let try_again_win = document.querySelector(".try_again_win");

        this.stopTimer()


        if (!win_message.classList.contains("show")) {
            console.log("yes")
            win_message.classList.add("show");
            console.log(win_message.classList.contains("show"))
        }

        try_again_win.addEventListener('click', () => {
            win_message.classList.remove("show");
            window.location.reload('../index.html');
        });
    }
}