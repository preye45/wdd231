const myTown= document.querySelector ("#town");
const myDescription= document.querySelector ("#description");
const myTemperature = document.querySelector("#temperature");
const myHumidity = document.querySelector("#humidity");
const myGraphic = document.querySelector("#graphic");

const myKey = "f8edbbf29e74ee98ed602915e69861ff"; 
const myLat = "9.0764785000"; 
const myLon = "7.3985740000"; 

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); 
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }

  function displayResults(data){
    myTown.innerHTML = data.name
    myDescription.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&deg;F`
    myHumidity.innerHTML = data.main.humidity
    const iconSrc = `https://openweathermap.org/img/wn${data.weather[0].icon}@2x.png`
    myGraphic.setAttribute('SRC', iconSrc)
    myGraphic.setAttribute("alt", data.weather[0].description )
  }
  // backticks ``
  
apiFetch();
