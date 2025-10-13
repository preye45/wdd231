const navLinks = document.querySelector('.nav-links');
const menuBtn= document.querySelector('#icon-menu');

menuBtn.addEventListener('click', ()=>{
    navLinks.classList.toggle('open');
    menuBtn.classList.toggle('open');
});


const getDateObj = new Date;
document.getElementById('lastModified').textContent = `Last Modified ${new Date(document.lastModified).toLocaleDateString()}`;
document.getElementById('currentYear').textContent += getDateObj.getFullYear();
