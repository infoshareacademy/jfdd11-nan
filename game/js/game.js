"use strict";
const board = document.querySelector("#board");
makeBoard(board, 10);
addingHouses(6);
addingTruck();
courierCall();
//truck move function

const truckMove = document.querySelector('.cell');
truckMove.classList.add("truck");
window.addEventListener('keyup', function (event) {
  const truckNode = document.querySelector('.truck');

  if (event.code === 'ArrowRight') {
    const targetNode = truckNode.nextElementSibling;
    if (targetNode === null) {
      return;
    }
    truckNode.classList.remove('truck');
    targetNode.classList.add('truck');
  }

  if (event.code === 'ArrowLeft') {
    const targetNode = truckNode.previousElementSibling;
    if (targetNode === null) {
      return;
    }
    truckNode.classList.remove('truck');
    targetNode.classList.add('truck');
  }
  if (event.code === 'ArrowUp') {
    const truckNodeIndex = Array.from(truckNode.parentElement.children).indexOf(truckNode);
    const truckRow = truckNode.parentElement;
    const targetRow = truckRow.previousElementSibling;
    if (targetRow === null) {
      return;
    }
    const targetNode = targetRow.children[truckNodeIndex]
    truckNode.classList.remove('truck');
    targetNode.classList.add('truck');
  }
  if (event.code === 'ArrowDown') {
    const truckNodeIndex = Array.from(truckNode.parentElement.children).indexOf(truckNode);
    const truckRow = truckNode.parentElement;
    const targetRow = truckRow.nextElementSibling;
    if (targetRow === null) {
      return;
    }
    const targetNode = targetRow.children[truckNodeIndex]
  
    truckNode.classList.remove('truck');
    targetNode.classList.add('truck');
  }
})





