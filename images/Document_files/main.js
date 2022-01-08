const gameBoard = (function() {
    const arrayBoard = {};
    for ( i = 0; i < 3; i++ ) {
        arrayBoard[i] = [];
        for ( h = 0; h < 3; h++ ) {
            arrayBoard[i].push(null);
        }
    }
    return arrayBoard;
})()

const displayController = (function() {
    for ( value in gameBoard ) {
        gameBoard[value].forEach((emptyBox) => {
            let box = document.createElement('span');
            box.classList.add('box', `box-${value}`);

            let container = document.querySelector('.box-container');
            container.appendChild(box);
        })
    }
})();