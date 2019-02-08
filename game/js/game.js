"use strict";
const board = document.querySelector("#board");
const crash = document.querySelector('#treeCrash');
const startCells = document.querySelector('.cell');
const startEngine = document.querySelector('#startEngine');
const pickUpPackage = document.querySelector('#pickUpPackage');
const packageDelivered = document.querySelector('#deliveryPackage');
const gridSize = 10;
const game = {
  packages: 0
}
//scoreBoard
let scoreStorage = {};
const fetchAddress = 'https://best-zupa-in-my-life.firebaseio.com/.json';
const getScoresPromise = () => fetch(fetchAddress).then(
    response => response.json()
    ).then(scores => scores === null ? {} : scores)

function getScores() {
    getScoresPromise().then(scores => {
          
                    const boardBlock = document.getElementById('scoreBoard');
                boardBlock.innerHTML = 'Score Board:';
                    Object.keys(scores).map(key => ({ points: scores[key], nick: key })).sort((a, b) => b.points - a.points).slice(0,9).forEach(player => {
                        const list = document.createElement('li');
                    list.textContent = player.nick + ':' + player.points;
                    boardBlock.appendChild(list);
                    })
                
        })
       }

getScores();
//scoreBoard
makeBoard(board, gridSize);
addingHouses(6);
addingTrees(10)
startGamePopupShow();

function resetGame() {
  timeLeft = 60;
  game.packages = 0;
  isRuning = !isRuning;
}
addingTruck();

courierCall();
packagePickUp();


window.addEventListener('keydown', function (event) {
  const truckNode = document.querySelector('.cell .truck').parentElement;
  if (!isRuning){return}
  if (event.code === 'ArrowRight') {
    const targetNode = truckNode.nextElementSibling;
    if (targetNode === null) {
      return;
    }
    if (checkBarriers(targetNode)) {
      truckMove(targetNode, 0);
    }
    packagePickUp();
    deliveryPackage()
  }

  if (event.code === 'ArrowLeft') {
    const targetNode = truckNode.previousElementSibling;
    if (targetNode === null) {
      return;
    }
    if (checkBarriers(targetNode)) {
      truckMove(targetNode, 180);
    }
    packagePickUp();
    deliveryPackage();
  }
  if (event.code === 'ArrowUp') {
    const truckNodeIndex = Array.from(truckNode.parentElement.children).indexOf(truckNode);
    const truckRow = truckNode.parentElement;
    const targetRow = truckRow.previousElementSibling;
    if (targetRow === null) {
      return;
    }
    const targetNode = targetRow.children[truckNodeIndex];
    if (checkBarriers(targetNode)) {
      truckMove(targetNode, 270);
    }
    packagePickUp();
    deliveryPackage();
  }
  if (event.code === 'ArrowDown') {
    const truckNodeIndex = Array.from(truckNode.parentElement.children).indexOf(truckNode);
    const truckRow = truckNode.parentElement;
    const targetRow = truckRow.nextElementSibling;
    if (targetRow === null || targetRow.classList.contains('truckPhantom')) {
      return;
    }
    const targetNode = targetRow.children[truckNodeIndex];
    if (checkBarriers(targetNode)) {
      truckMove(targetNode, 90);
    }
    packagePickUp();
    deliveryPackage();
  }
})