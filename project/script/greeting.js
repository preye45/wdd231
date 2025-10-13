import { DisplayGreeting2 } from "./module.js";

document.addEventListener('DOMContentLoaded', () => {
    const display = new DisplayGreeting2();
    const grtContainer = document.querySelector('.grtContainer');

    display.displayGreeting(grtContainer);
    
    // Add the 'show' class to trigger the animation
    grtContainer.classList.add('show');
    
    // Remove the 'show' class after the animation ends
    setTimeout(() => {
        grtContainer.classList.add('hide');
    }, 4000); // Duration of the animation (4 seconds)
});
