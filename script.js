// getting html nodes
let search=document.getElementById('searchButton')
let home=document.querySelector('.home button')
let seeWeather=document.querySelector('.buttons button')
let start=document.getElementById('start')
let errorPage=document.getElementById('error')
let weatherPage=document.getElementById('weather')
let temperature=document.getElementById('temprature')
let cityName=document.getElementById('city')
let windSpeed=document.getElementById('windSpeed')
let humidityPercentage=document.getElementById('humidityperc')
let logo=document.getElementById('weatherImage')
let weatherCondition=document.getElementById('currentCondition')

let allImages={
    Clear:'resources/clear.png',
    Cloudy:'resources/clouds.png',
    Drizzle:'resources/drizzle.png',
    "Smoky haze":'resources/haze.png',
    Mist:'resources/mist.png',
    Rain:'resources/rain.png',
    Snow:'resources/snow.png'
}
// event listiners  
seeWeather.addEventListener('click',function(){
    start.classList.add('screen')
    weatherPage.classList.remove('screen')
})
home.addEventListener('click',function(){
    errorPage.classList.add('screen')
    start.classList.remove('screen')
})
search.addEventListener('click',function(){
    let city=document.getElementById('searchCity').value
    console.log(city)
    weather(city)
    
})

// functions

function weather(city){
    let url=`https://api.weatherapi.com/v1/current.json?key=2a12eee8fba84edb83074719261110&q=${encodeURIComponent(city)}&aqi=yes
`
    fetch(url)
.then(function(data){
    return data.json()
    
})
.then(function(jsonData){
    console.log(jsonData)
    weatherForcast(jsonData)
})
.catch(function(error){
    console.log('e:',error)
})
}

function weatherForcast(value){
    if(value.error){
        errorPage.classList.remove('screen')
        start.classList.add('screen')
        weatherPage.classList.add('screen')

    }
    else{
        weatherCondition.textContent=`${value.current.condition.text}`
        temperature.textContent=`${value.current.temp_c}°C`
        cityName.textContent=`${value.location.name}`
        windSpeed.textContent=`${value.current.wind_kph}km/h`
        humidityPercentage.textContent=`${value.current.humidity}%`
        changeImage(value)
    }
}

function changeImage(weathertoday){
logo.src= allImages[weathertoday.current.condition.text] || "resources/clear.png"
}