"use strict";
const board = document.querySelector("#board");
makeBoard(board, 10);

function courierCall() {
    const houses = document.querySelectorAll('.house');
    let randomPackage = Math.floor(Math.random() * houses.length - 1);
    if (houses[randomPackage].children === undefined || houses[randomPackage].children.length > 0) {
        randomPackage = Math.floor(Math.random() * houses.length - 1);
    } else {
         const pack = document.createElement('div');
         pack.classList.add('new_package');
         console.log(houses);
         console.log(houses[randomPackage]);
         houses[randomPackage].appendChild(pack);
    }
}
addingHouses(6);
addingTruck();
courierCall();
/*truck move function
const truckMove = document.querySelector(".cell");
truckMove.classList.add("truck");
const columnIndex = getIndexWithinParent(truckMove);
const nextRow = getNextRow(fruitNode);

 window.addEventListener('keyup', function (event) {
  const truckMove = document.querySelector('.truck');

   if (event.code === 'ArrowRight') {
    const targetNode = truckMove.nextElementSibling;
    if (targetNode === null) {
      return;
    }
 truckMove.classList.remove('truck');
    targetNode.classList.add('truck');
  }

   if (event.code === 'ArrowLeft') {
    const targetNode = truckMove.previousElementSibling;
    if (targetNode === null) {
      return;
    }
 truckMove.classList.remove('truck');
    targetNode.classList.add('truck');
  }
  if (event.code === 'ArrowUp') {
    const targetNode = truckMove.previousElementSibling;
    if (targetNode === null) {
      return;
    }
 truckMove.classList.remove('truck');
    targetNode.classList.add('truck');
}
if (event.code === 'ArrowDown') {
    const targetNode = truckMove.previousElementSibling;
    if (targetNode === null) {
      return;
    }
 truckMove.classList.remove('truck');
    targetNode.classList.add('truck');
}
})*/


