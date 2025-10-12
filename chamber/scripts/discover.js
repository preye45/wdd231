document.addEventListener("DOMContentLoaded", () => {
  fetch("data/discover-data.json")
    .then((res) => res.json())
    .then((data) => {
      const grid = document.getElementById("discoverGrid");
      
      data.forEach((item, i) => {
        const card = document.createElement("article");
        card.classList.add("discover-card");
        card.style.gridArea = `card${i + 1}`;
        card.innerHTML = `
          <h2>${item.title}</h2>
          <figure><img src="${item.image}" alt="${item.title}" loading="lazy"></figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;
        grid.appendChild(card);
      });
    });

  // Visit tracking
  const visitMessage = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const msDiff = now - Number(lastVisit);
    const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    if (days < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${days} days ago.`;
    }
  }
  localStorage.setItem("lastVisit", now.toString());
});
