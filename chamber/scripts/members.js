document.addEventListener("DOMContentLoaded", () => {
    const spotlightContainer = document.querySelector(".spotlight-container");

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json"); // Adjust path if needed
            if (!response.ok) throw new Error("Failed to load member data");

            const members = await response.json();
            displaySpotlight(members);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    function displaySpotlight(members) {
        const goldSilverMembers = members.filter(member => member.membershipLevel >= 2);
        const shuffledMembers = goldSilverMembers.sort(() => 0.5 - Math.random());
        const selectedMembers = shuffledMembers.slice(0, Math.floor(Math.random() * 2) + 2); // Select 2 or 3

        spotlightContainer.innerHTML = selectedMembers.map(member => `
            <div class="spotlight-card">
                <img src="images/${member.image}" alt="${member.name} Logo">
                <h3>${member.name}</h3>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p class="membership-level">${member.membershipLevel === 3 ? "Gold Member" : "Silver Member"}</p>
            </div>
        `).join("");
    }

    fetchMembers();
});
