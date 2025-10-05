document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelector(".slider-box ul");
    let index = 0;

    function nextSlide() {
        index = (index + 1) % slides.children.length;
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    setInterval(nextSlide, 4000); // Changes every 4 seconds
});
