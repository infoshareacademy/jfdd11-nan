"use strict";
const board = document.querySelector("#board");
makeBoard(board, 10);

function courierCall() {
    const houses = document.querySelectorAll('.cell');
    let randomPackage = Math.floor(Math.random() * houses.length - 1);
    if (houses[randomPackage].children.length > 0) {
        randomPackage = Math.floor(Math.random() * houses.length - 1);
    } else {
        const pack = document.createElement('div');
        pack.classList.add('new_package');
        houses[randomPackage].appendChild(pack);
    }
}
courierCall();