// Selecting elements from the DOM
const toolsContainer = document.querySelector('#tools-container');
const modal = document.querySelector('#tool-details');
const modalContent = document.querySelector('#modal-content');
const closeModal = document.querySelector('#close-modal');

// 1. Fetching Data using an Asynchronous Function
async function fetchTools() {
    try {
        const response = await fetch('data/tools.json'); // Path to your JSON file
        if (!response.ok) {
            throw new Error('Could not fetch the tool data');
        }
        const tools = await response.json();
        
        // 2. Processing Data with an Array Method (forEach)
        displayTools(tools);
        
    } catch (error) {
        console.error("Error:", error);
        toolsContainer.innerHTML = `<p class="error">Sorry, we couldn't load the tools right now.</p>`;
    }
}

// 3. Dynamic Content Generation using Template Literals
function displayTools(tools) {
    toolsContainer.innerHTML = ""; // Clear container first

    tools.forEach(tool => {
        // Create a card for each tool
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';

        // Displaying at least 4 distinct data properties (Image, Name, Type, Price)
        toolCard.innerHTML = `
            <img src="${tool.image}" alt="${tool.name}" loading="lazy">
            <h3>${tool.name}</h3>
            <p class="category">${tool.type}</p>
            <p class="price"><strong>${tool.price}</strong></p>
            <button class="details-btn" data-id="${tool.id}">View Details</button>
        `;

        toolsContainer.appendChild(toolCard);
    });

    // Add Event Listeners to all "Details" buttons
    const detailButtons = document.querySelectorAll('.details-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const toolId = event.target.getAttribute('data-id');
            const tool = tools.find(t => t.id == toolId);
            showDetails(tool);
        });
    });
}

// 4. Modal Dialog and Local Storage
function showDetails(tool) {
    modalContent.innerHTML = `
        <h2>${tool.name}</h2>
        <img src="${tool.image}" alt="${tool.name}" style="width:100%">
        <p><strong>Category:</strong> ${tool.type}</p>
        <p><strong>Description:</strong> ${tool.description}</p>
        <p><strong>Price:</strong> ${tool.price}</p>
    `;
    
    // Using Local Storage to save the user's last viewed item
    localStorage.setItem('lastViewedTool', tool.name);
    
    modal.showModal();
}

// Close the modal
closeModal.addEventListener('click', () => {
    modal.close();
});

// Call the function to start the process
fetchTools();
