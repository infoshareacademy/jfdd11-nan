function makeBoard(target, size) {
  for (let y = 0; y < size; y += 1) {
    let rowNode = createNode("row");

    for (let x = 0; x < size; x += 1) {
      let cellNode = createNode("cell");

      rowNode.appendChild(cellNode);
    }

    target.appendChild(rowNode);
  }
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

function courierCall() {
  const houses = document.querySelectorAll('.house');
  let randomPackage = Math.floor(Math.random() * houses.length);
  if (houses[randomPackage].children.length > 0) {
    randomPackage = Math.floor(Math.random() * houses.length);
  } else {
    const pack = document.createElement('div');
    pack.classList.add('new_package');
    houses[randomPackage].appendChild(pack);
  }
}

function packagePickUp() {
  const package = document.querySelector('.new_package');
  const isTruck = document.querySelector('.truck');
  if (package === isTruck.previousElementSibling) {
    deliveryPoint(1);
    isTruck.appendChild(package);
  }
}

function deliveryPackage() {

  const isTruck = document.querySelector('.truck');
  const package = document.querySelector('.new_package');
  const deliveryHouse = document.querySelector('.delivery-point');
  if (isTruck.parentElement === deliveryHouse) {
    game.packages += 1;
    document.querySelector('#points').textContent = game.packages;
    package.remove();
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
let countDown = setInterval(function () {
  timeLeft -= 1;
  document.getElementById('countdown').textContent = timeLeft + ' seconds left';
  if (timeLeft <= 0) {
    document.getElementById('countdown').textContent = ' Time is up!';
    clearInterval(countDown);
    winOrGameOver();
  }
}, 1000)
//end game function
function winOrGameOver() {
  let score = game.packages;
  let text = "Your score is : " + score;
  if (score === 0) {
    swal("Oops!", "Try again!");
  } else {
    swal("Good job!", text, "success");
  }
}

//added truck
function addingTruck() {
  const truckBase = document.querySelector('.cell');
  const truck = document.createElement('div');
  truck.classList.add("truck");
  truckBase.appendChild(truck);
}
//truck move function
function truckMove(target, deg) {
  let truck = document.querySelector('.truck');
  target.appendChild(truck);
  truck.style.transform = `rotate(${deg}deg)`;
}
//play button
function refreshPage() {
  window.location.reload();
}

//check barriers function
function checkBarriers(target) {
  const package = document.querySelector('.new_package').parentElement;
  const delivery = document.querySelector('.delivery-point');
  const barriers = Array.from(document.querySelectorAll('.house, .tree')).filter((item) => item != package && item != delivery);
  let checkField = barriers.includes(target);
  return !checkField;
}
