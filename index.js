// console.log("hello ji");
// const API_KEY = "b01ea47b3eb1a89add9f7371f09421e5";

// function renderWeatherInfo(data){
//     let newPara = document.createElement('p');
//     newPara.textContent = `${data?.main?.temp.toFixed(2)} 'C`

//     document.body.appendChild(newPara);
// }

// async function fetchWeatherDetails(){
   
//        try{
//         let city = "jaipur";

//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    
//         const data = await response.json();
//         console.log("weather data ->" + data);
    
    
        

//         renderWeatherInfo(data);

//     }
//     catch(err){

//     }


   
// }

// async function getCustomWeatherDetails(){

//     try{
//         let latitude = 15.4433;
//     let longitude = 74.3333;

//     let result = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
//     let data  = await result.json();

//     }
//     catch(err){
//     console.log("error found",err)
//     }
     
// }


// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log("no geolocation supported");
//     }
// }
 

// function showPosition(position){
//     let lat = position.coords.latitude;
//     let longi = position.coords.longitude;

//     console.log(lat);
//     console.log(longi);
// }


// const API_KEY = "b01ea47b3eb1a89add9f7371f09421e5";
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAcessContainer = document.querySelector(".grant-location-container");
const  Searchform = document.querySelector("[data-searchForm]");
const  loadingScreen = document.querySelector(".Loading-container");
const  userInfoContainer = document.querySelector(".user-Info-container");


let currentTab = userTab;
const API_KEY = "b01ea47b3eb1a89add9f7371f09421e5";
currentTab.classList.add("current-Tab");
getfromSessionstorage();


function switchTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-Tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-Tab");

        if(!Searchform.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAcessContainer.classList.remove("active");
            Searchform.classList.add("active");
        }
        else{
            Searchform.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSessionstorage();
        }
    }

}


userTab.addEventListener("click",() => {
    switchTab(userTab);
});
searchTab.addEventListener("click",() => {
    switchTab(searchTab);
});

function getfromSessionstorage(){
    const localcoordinate = sessionStorage.getItem("user-coordinates");
    if(!localcoordinate){
        grantAcessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localcoordinate);
        fetchUserWeatherInfo(coordinates);
    }

}



async function fetchUserWeatherInfo(coordinates){
    const {lat,lon} = coordinates;
    grantAcessContainer.classList.remove("active");
    loadingScreen.classList.add("active");
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
            const data = await response.json();

            loadingScreen.classList.remove("active");
            userInfoContainer.classList.add("active");
            renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");

    }
}

function renderWeatherInfo(weatherInfo){
       const cityName = document.querySelector("[data-cityName]");
       const countryIcon = document.querySelector("[data-countryIcon]");
       const desc = document.querySelector("[data-weatherDesc]");
       const weatherIcon = document.querySelector("[data-weatherIcon]");
       const temp  = document.querySelector("[data-temp]");
       const windspeed  = document.querySelector("[data-windspeed]");
       const humidity = document.querySelector("[data-humidity]");
       const clouds = document.querySelector("[data-clouds]");

       cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    clouds.innerText = `${weatherInfo?.clouds?.all}%`;

       
    //    weatherDisplay.classList.add("active")

 
       

}


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("No geolocation Found");
    }
}
function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}
const GrantAcessButton = document.querySelector("[data-grantAcess]");
GrantAcessButton.addEventListener("click", getLocation);



    


const searchInput = document.querySelector("[data-searchInput]");

Searchform.addEventListener("submit",(e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "") return;
    else{
        fetchSearchWeatherInfo(cityName);
    }
})


async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAcessContainer.classList.remove("active");

    try{
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await res.json();
        loadingScreen.classList.remove("active");
       userInfoContainer.classList.add("active");
       renderWeatherInfo(data);

    }
    catch(err){

    }
}
