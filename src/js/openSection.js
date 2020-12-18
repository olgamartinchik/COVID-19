export const openSection = () => {
    showButton()
    let sections = document.querySelectorAll('.main-subtable');
    let btns = document.querySelectorAll('.circle-btn');
    for (let i = 0; i < btns.length; i += 1) {
        if (btns[i]) {
            btns[i].addEventListener('click', (e) => {
                sections[i].classList.toggle('main-subtable-open')
            })
        }
    }
}

const showButton = () => {
    let sections = document.querySelectorAll('.main-subtable');
    let btns = document.querySelectorAll('.circle-btn');
    for (let i = 0; i < sections.length; i += 1) {
        sections[i].addEventListener('mouseover', () => {
            btns[i].style.display = 'block';
        })
        sections[i].addEventListener('mouseleave', () => {
            btns[i].style.display = 'none';
        })
    }
}