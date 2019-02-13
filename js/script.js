function get(selector) {
    return document.querySelector(selector);
}
const selection = get('#toggle');
const menu = get('#overlay');
const links = get('.nav');
selection.addEventListener('click', function () {
    for (let i = 0; i < 3; i++) {
        selection.children[i].classList.toggle('active');
    }
    menu.classList.toggle('open');
})
let active_show = document.querySelectorAll('.links');
for (let i = 0; i < 4; i++) {
    active_show[i].addEventListener('click', function () {
        for (let i = 0; i < 3; i++) {
            selection.children[i].classList.toggle('active');
        }
        menu.classList.toggle('open');
    });
}
window.onscroll = function () {
    changeColor();
};

const navbar = get(".overlay-menu");
let getPosition = navbar.offsetTop;

function changeColor() {
    if (window.pageYOffset > getPosition) {
        navbar.classList.add("stick");
    } else {
        navbar.classList.remove("stick");
    }
}

const formNode = get('.form_subscription');
const nameNode = get('#name');
const emailNode = get('#email');
const messageNode = get('#comment');

formNode.addEventListener('submit', function (e) {
    e.preventDefault();
    const fetchUrl = 'https://first-project-20f00.firebaseio.com/users.json';
    let personData = {
        username: nameNode.value,
        email: emailNode.value,
        message: messageNode.value
    }
    addForm(personData, fetchUrl);
})

const addForm = (data, fetchUrl) =>
    fetch(fetchUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => {
        res.json();
        location.href = "/game/game.html"
    })
    .catch(error => console.error('Error:', error))