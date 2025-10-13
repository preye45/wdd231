class DisplayGreeting2 {
    constructor() {
        this.aDayInMillSeconds = 1000 * 60 * 60 * 24;
        this.lastVisit = localStorage.getItem('lastVisit');
        this.currentVisit = new Date().getTime();
    }

    displayGreeting(greetingElement) {

        if (!this.lastVisit) {
            greetingElement.textContent = "Welcome! Let us know if you have any questions.";

        } else {
            const timeDiff = this.currentVisit - parseInt(this.lastVisit); // the difference is the sum of the days between last and current visit
            const daysDiff = Math.floor(timeDiff / this.aDayInMillSeconds); // How many days difference 

            if (timeDiff < this.aDayInMillSeconds) {
                greetingElement.textContent = "Back so soon! Awesome!";

            } else {
                const daysText = daysDiff === 1 ? 'day' : 'days';
                greetingElement.textContent = `You last visited ${daysDiff} ${daysText}`;
            }
        }
        // Update last visit date in localStorage
        localStorage.setItem('lastVisit', this.currentVisit);
    }
}

export { DisplayGreeting2 };
