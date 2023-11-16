export class Cell{
    constructor(gridElement){
        this.el = document.createElement('div');
        gridElement.append(this.el)

        return this.el
    }
}

