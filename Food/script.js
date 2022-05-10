document.querySelector('.menu').addEventListener('click', () => {
    document.querySelectorAll('.target').forEach((item) => {
        item.classList.toggle('change')
    })
})

const icons = document.querySelectorAll('.section-1-icons i')

let i = 0;

setInterval(() => {
    icons[i].classList.remove('change');
    if (i >= icons.length - 1) {
        i = 0;
    } else {
        i++;
    }
    icons[i].classList.add('change')
},4000)