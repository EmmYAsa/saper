import {Game} from "./game.js"


let root = document.querySelector('.root')
let boardGame = new Game(root)

let reload = document.querySelector('.reload')

reload.addEventListener('click', () => {
    window.location.reload('../index.html');
})