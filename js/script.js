let selection = document.querySelector('#toggle');
let menu = document.querySelector('#overlay');
let links = document.querySelector('.nav');
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