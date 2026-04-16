// scripts/index.js

const toolContainer = document.querySelector('#tool-container');
const modal = document.querySelector('#tool-modal');
const modalContent = document.querySelector('#modal-content');
const closeModal = document.querySelector('#close-modal');

// 1. Fetch Data with Error Handling
async function getTools() {
    try {
        const response = await fetch('data/tools.json');
        if (!response.ok) throw new Error('Data not found');
        const data = await response.json();
        
        displayTools(data);
    } catch (error) {
        console.error("Error fetching tools:", error);
        toolContainer.innerHTML = "<p>Failed to load tools.</p>";
    }
}

// 2. Dynamic Content Generation & Array Methods
function displayTools(tools) {
    toolContainer.innerHTML = ""; // Clear existing content
    
    // Process data using forEach (Array Method)
    tools.forEach(tool => {
        let card = document.createElement('div');
        card.classList.add('tool-card');
        
        // Template Literals & 4 distinct properties (name, type, price, image)
        card.innerHTML = `
            <img src="${tool.image}" alt="${tool.name}" loading="lazy">
            <h3>${tool.name}</h3>
            <p>Category: ${tool.type}</p>
            <p><strong>${tool.price}</strong></p>
            <button class="view-details" data-id="${tool.id}">Details</button>
        `;
        
        toolContainer.appendChild(card);
    });

    // 3. Event Handling for Modal
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            const toolId = e.target.getAttribute('data-id');
            const tool = tools.find(t => t.id == toolId);
            showModal(tool);
        });
    });
}

// 4. Modal Interaction
function showModal(tool) {
    modalContent.innerHTML = `
        <h2>${tool.name}</h2>
        <p>${tool.description}</p>
        <p>Rental Status: Available</p>
    `;
    modal.showModal();
    
    // 5. Local Storage (Persisting last viewed tool)
    localStorage.setItem('lastViewedTool', tool.name);
}

closeModal.addEventListener('click', () => modal.close());

// Initialize
getTools();
