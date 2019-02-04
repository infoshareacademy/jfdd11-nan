"use strict";
const board = document.querySelector("#board");
const gridSize = 10;
const game = {
  truck: {
    positionX:0,
    positionY:0,
    speed:0
  },
  package:{
    positionX:0,
    positionY:0
  },
  packages:0
}

makeBoard(board, gridSize);
addingHouses(6);
addingTruck();
courierCall();
packagePickUp();
//added truck
function addingTruck() {
  const truckBase = document.querySelector('.cell');
  const truck = document.createElement('div');
  truck.classList.add("truck");
  truckBase.appendChild(truck);
}
//truck move function
function truckMove(target,i){
  let truck = document.querySelector('.truck');
  target.appendChild(truck);
  switch(i){
    case 'ArrowRight':
    game.truck.positionX+=1;
    break;
    case 'ArrowLeft':
    game.truck.positionX-=1;
    break;
    case 'ArrowDown':
    game.truck.positionY+=1;
    break;
    case 'ArrowUp':
    game.truck.positionY-=1;
    break;
    default:
    break;
  }
}

window.addEventListener('keyup', function (event) {
  const truckNode = document.querySelector('.cell .truck').parentElement;
  if (event.code === 'ArrowRight') {
    const targetNode = truckNode.nextElementSibling;
    if (targetNode === null) {
      return;
    }
    truckMove(targetNode,event.code);
    packagePickUp();
  }

  if (event.code === 'ArrowLeft') {
    const targetNode = truckNode.previousElementSibling;
    if (targetNode === null) {
      return;
    }
    truckMove(targetNode,event.code);
    packagePickUp();
  }
  if (event.code === 'ArrowUp') {
    const truckNodeIndex = Array.from(truckNode.parentElement.children).indexOf(truckNode);
    const truckRow = truckNode.parentElement;
    const targetRow = truckRow.previousElementSibling;
    if (targetRow === null) {
      return;
    }
    const targetNode = targetRow.children[truckNodeIndex]
    truckMove(targetNode,event.code);
    packagePickUp();
  }
  if (event.code === 'ArrowDown') {
    const truckNodeIndex = Array.from(truckNode.parentElement.children).indexOf(truckNode);
    const truckRow = truckNode.parentElement;
    const targetRow = truckRow.nextElementSibling;
    if (targetRow === null) {
      return;
    }
    const targetNode = targetRow.children[truckNodeIndex]
    truckMove(targetNode,event.code);
    packagePickUp();
  }
})
//play button
function refreshPage(){
  window.location.reload();
}





