const displayAllEvents = document.querySelector(".dsAllEvents");
const moreInfoWrapper = document.querySelector(".moreInfoWrapper");

const key = "SGAsgKjftKVJvlQdkQCsXnLgAukjz16E";
const url = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=CA&stateCode=ON&size=20&apikey=${key}`;

async function fetchCanadaEventData() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const getData = await response.json();
    // console.log(getData);
    const data = getData._embedded.events;

    displayEvents(data);
  } catch (error) {
    console.error(error);
  }
}

fetchCanadaEventData();

// Display all events
function displayEvents(data) {
  displayAllEvents.innerHTML = "";

  data.forEach((event) => {
    const eventItem = document.createElement("div");
    eventItem.classList.add("eachItem");

    // Event structure
    eventItem.innerHTML = `
            <div> 
                <img src="${event.images[3].url}" alt="${event.name}" width="${
      event.images[3].width
    }" height="${event.images[3].height}" loading="lazy"> 
            </div>

            <ul>
                <li><strong>${event.name}</strong></li>
                <li>${new Date(event.dates.start.dateTime).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  }
                )}</li>

                <li>
                    ${event._embedded.venues[0].name}, 
                    ${event._embedded.venues[0].city.name}, 
                    ${event._embedded.venues[0].state.stateCode}
                </li>
            </ul>
        `;

    // Dialog information when clicked
    eventItem.addEventListener("click", () => {
      moreInfoWrapper.innerHTML = `

                <span class="closeBtn" autofocus>❌</span>

                <h2>${event.name}</h2>
                <p><strong>Important Event Info</strong> <br> ${
                  event.pleaseNote || "No additional information available."
                }</p>
                                
                <div class="timeVenue">
                    <p><strong>Date & Time:</strong> ${new Date(
                      event.dates.start.dateTime
                    ).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}</p>

                    <p><strong>Venue:</strong> 
                        ${event._embedded.venues[0].name},
                        ${event._embedded.venues[0].city.name},
                        ${event._embedded.venues[0].state.stateCode}
                    </p>
                </div>

                <p><strong>Additional Info</strong>
                    ${event._embedded.venues[0].generalInfo.generalRule}
                </p>

            `;

      // Close dialog
      const closeBtn = moreInfoWrapper.querySelector(".closeBtn");
      closeBtn.addEventListener("click", () => {
        moreInfoWrapper.close();
      });

      moreInfoWrapper.showModal(); // Show dialog
    });

    displayAllEvents.appendChild(eventItem);
  });
}
