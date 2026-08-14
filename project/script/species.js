
// discover.js
document.addEventListener('DOMContentLoaded', () => {
    const discoverCards = document.getElementById('discover-cards');
  
    fetch('data/species.json') // Assuming your JSON file is named data.json and in the same directory
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        discoverCards.innerHTML = ''; // Clear the loading message
  
        data.forEach(item => {
          const card = document.createElement('div');
          card.classList.add('discover-card');
  
          const image = document.createElement('img');
          image.src = item.image;
          image.alt = item.name;
  
          const title = document.createElement('h2');
          title.textContent = item.title;
  
          const description = document.createElement('h3');
          description.textContent = item.description;
  
          const scripture = document.createElement('h4');
          scripture.textContent = `ArtCultureRepresentation: ${item.ArtCultureRepresentation}`;
          scripture.classList.add('ArtCultureRepresentation');

          const phone = document.createElement('h5');
          phone.textContent = item.phone;
  
          card.appendChild(image);
          card.appendChild(title);
          card.appendChild(description);
          card.appendChild(scripture);
          card.appendChild(phone);
  
          discoverCards.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error fetching or processing data:', error);
        discoverCards.innerHTML = '<p>Error loading scripture topics.</p>';
      });
  });
