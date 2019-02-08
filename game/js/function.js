function makeBoard(target, size) {
  for (let y = 0; y < size; y += 1) {
    let rowNode = createNode("row");

    for (let x = 0; x < size; x += 1) {
      let cellNode = createNode("cell");

      rowNode.appendChild(cellNode);
    }

    target.appendChild(rowNode);
  }
  const truckPhantom = document.createElement('div');
  truckPhantom.classList.add('truckPhantom');
  target.appendChild(truckPhantom);
}

function createNode(className) {
  const node = document.createElement("div");
  node.classList.add(className);

  return node;
}

function getIndexWithinParent(element) {
  return Array.from(element.parentNode.children).indexOf(element);
}

function getNextRow(element) {
  return element.parentElement.nextElementSibling
}

function addingHouses(x) {
  const arrHouse = Array.from(document.querySelectorAll('.cell'))
    .filter((item, index) => index > 0);
  for (let i = 0; i < x; i++) {
    let randomPackageIndex = Math.floor(Math.random() * arrHouse.length);
    arrHouse[randomPackageIndex].classList.add('house');

    arrHouse.splice(randomPackageIndex, 1);
  }
}

function addingTrees(x) {
  const arrTree = Array.from(document.querySelectorAll('.cell:not(.house)'))
    .filter((item, index) => index > 0);

  for (let i = 0; i < x; i++) {
    let randomPackageIndex = Math.floor(Math.random() * arrTree.length);
    arrTree[randomPackageIndex].classList.add('tree');

    arrTree.splice(randomPackageIndex, 1);
  }
}

function crashTreeAudio() {
  crash.play();
}

function startEngineAudio() {
  startEngine.play();
}

function pickUpPackageAudio() {
  pickUpPackage.play();
}

function deliveryPackageAudio() {
  packageDelivered.play();
}

function courierCall() {
  calls += 1;
  const truck = document.querySelector('.truck').parentElement;
  const houses = Array.from(document.querySelectorAll('.house')).filter((house) => house != truck);
  let randomPackage = Math.floor(Math.random() * houses.length);
  const pack = document.createElement('div');
  pack.classList.add('new_package');
  houses[randomPackage].appendChild(pack);
  if (calls%5===0){
    trackenApear();
  }

}

function packagePickUp() {
  const package = document.querySelector('.new_package');
  const isTruck = document.querySelector('.truck');
  const isTruckPhantom = document.querySelector('.truckPhantom');
  const tracken = document.querySelector('.tracken-man');
  if (isTruckPhantom.childNodes.length<=0 && package === isTruck.previousElementSibling) {
    pickUpPackageAudio();
    deliveryPoint();
    isTruck.appendChild(package);
    isTruckPhantom.appendChild(package);

  }
  if (tracken && tracken === isTruck.previousElementSibling) {
    pickUpPackageAudio();
    deliveryPoint();
    isTruck.appendChild(tracken);
    isTruckPhantom.appendChild(tracken);
    package.remove();
  }
}

function deliveryPackage() {

  const isTruck = document.querySelector('.truck');
  const truckPhantom = document.querySelector('.truckPhantom').firstChild;
  const package = document.querySelector('.new_package');
  const deliveryHouse = document.querySelector('.delivery-point');
  if (isTruck.parentElement === deliveryHouse) {
    if (truckPhantom === package){
      game.packages += 1;
      deliveryPackageAudio();
      document.querySelector('#points').textContent = game.packages;
      package.remove();
      timeLeft += 1;
    } else {
      game.packages += 10;
      deliveryPackageAudio();
      document.querySelector('#points').textContent = game.packages;
      truckPhantom.remove();
      timeLeft += 10;
    }
    const houses = document.querySelectorAll('.house');
    houses.forEach(element => {
      element.classList.remove('delivery-point');
    });
    courierCall();
  }
  
}

function deliveryPoint() {

  const houses = document.querySelectorAll('.house');
  const truck = document.querySelector('.truck').parentElement;
  const package = document.querySelectorAll('.new_package').parentElement;
  let housesArray = Array.from(houses).filter(house => house !== truck);
  let randomHouseIndex = Math.floor(Math.random() * housesArray.length);
  housesArray[randomHouseIndex].classList.add('delivery-point');

};

let timeLeft = 60;
let countDown = 0;
let isRuning = false;
document.getElementById('start').addEventListener('click', function () {
  isRuning = !isRuning;
  if (isRuning) {
    //startGame();
    document.querySelector('#points').textContent = game.packages;
    countDown = setInterval(function () {
      timeLeft -= 1;
      document.getElementById('start').textContent = 'Pause';
      document.getElementById('countdown').textContent = timeLeft + ' seconds left';
      if (timeLeft <= 0) {
        document.getElementById('countdown').textContent = ' Time is up!';
        document.getElementById('start').textContent = 'Play again';
        clearInterval(countDown);
        winOrGameOver();
        startGame();
      };
    }, 1000);
  } else {
    clearInterval(countDown);
    document.getElementById('start').textContent = 'Resume';
  }
})


//end game function
function winOrGameOver() {
    let score = game.packages;
    let nick = 'noname';
    let text = "Your score is : " + score;
    if (score === 0) {
        swal("Oops!", "Try again!", "error");
    } else {
        swal({
            text,
            content: {
                element: "input",
                attributes: {
                    placeholder: "Enter your name",
                    type: "text",
                    onchange: (event) => nick = event.target.value
                },
            },
            button: {
                text: "OK",

            },
        })
            .then(() => {
                getScoresPromise().then(scores => {
                    scores[nick] = score;
                    fetch(fetchAddress, { method: 'put', body: JSON.stringify(scores) }).then(() => getScores())

        })

        // game.scoreStorage = JSON.parse(window.localStorage.getItem('score'));
        // game.scores[nick] = score;
        // window.localStorage.setItem('score', JSON.stringify(game.scoreStorage));
      })

  }

}


//added truck
function addingTruck() {
  const truckBase = document.querySelector('.cell');
  const truck = document.createElement('div');
  truck.classList.add("truck");
  truckBase.appendChild(truck);
}

function getIndex(target) {
  return Array.from(target.parentElement.children).indexOf(target);
}
//truck move function
function truckMove(target, deg) {
  let truck = document.querySelector('.truck');
  target.appendChild(truck);
  let truckPhantom = document.querySelector('.truckPhantom');
  let x = getIndex(target);
  let y = getIndex(target.parentElement);
  truckPhantom.style.left = x * 5 + 'vw';
  truckPhantom.style.top = y * 5 + 'vw';
  truckPhantom.style.transform = `rotate(${deg}deg)`;

}
//play button
function refreshPage() {
  window.location.reload();
}

//check barriers function
function checkBarriers(target) {
  const barriers = Array.from(document.querySelectorAll('.tree'));
  let checkField = barriers.includes(target);
  if (checkField) {
    crashTreeAudio();
    timeLeft -= 4;
    target.classList.add('tree-shake');
    setTimeout(() => {
      target.classList.remove('tree-shake');
    }, 1000)
  }
  return !checkField;
}

function trackenApear() {
  
  const emptyCellsNode = Array.from(document.querySelectorAll('.cell:not(.tree):not(.house)')).filter((cell) => cell.hasChildNodes.length === 0);
  let randomTrackenIndex = Math.floor(Math.random() * emptyCellsNode.length);
  const trackenNode = document.createElement('div');
  trackenNode.classList.add('tracken-man');
  emptyCellsNode[randomTrackenIndex].appendChild(trackenNode);
}
