const eventContainer = document.querySelector('.event-container');
const moreInfoWrapper = document.querySelector('.moreInfoWrapper')

const key = 'SGAsgKjftKVJvlQdkQCsXnLgAukjz16E';
const url = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=CA&stateCode=ON&size=20&apikey=${key}`;

// Fetch data from TicketMaster
async function fetchCanadaEventData() {
    try{
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(response.statusText);
        }

        const getData = await response.json();
        // console.log(getData);
        const data = getData._embedded.events;

        buildEvent(data)

        
    } catch (error) {
        console.error(error);
    };
    
}

fetchCanadaEventData();



// Display events
function buildEvent(data) {

    eventContainer.innerHTML = '';

    const topFourEvent = data.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 4);

    topFourEvent.forEach(event => {

        const eachCont = document.createElement('div');
        eachCont.classList.add('each-event');
        
        // Event structure
        eachCont.innerHTML = `
            <div> 
                <img src="${event.images[3].url}" alt="${event.name}" width="${event.images[3].width}" height="${event.images[3].height}" loading="lazy"> 
            </div>
    
            <ul>
                <li><strong> ${event.name} </strong></li>
                
                <li> ${new Date(event.dates.start.dateTime).toLocaleString('en-US', {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                })} </li>
    
                <li> 
                    ${event._embedded.venues[0].name}, 
                    ${event._embedded.venues[0].city.name}, 
                    ${event._embedded.venues[0].state.stateCode} 
                </li>
            </ul>
        `;

        // Display dialog view when each event is clicked
        eachCont.addEventListener('click', ()=> {

            moreInfoWrapper.innerHTML = `

                <span class="closeBtn" autofocus>❌</span>

                <h2>${event.name}</h2>
                <p><strong>Important Event Info</strong> <br> ${event.pleaseNote || 'No additional information available.'}</p>
                                
                <div class="timeVenue">
                    <p><strong>Date & Time:</strong> ${new Date(event.dates.start.dateTime).toLocaleString('en-US', {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true
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
            const closeBtn = moreInfoWrapper.querySelector('.closeBtn');
            closeBtn.addEventListener('click', () => {
                moreInfoWrapper.close();
            });

            moreInfoWrapper.showModal(); // Show dialog
        });

        eventContainer.appendChild(eachCont)
    })

}

buildEvent();
