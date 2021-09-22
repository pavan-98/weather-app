const apiKey = "64f38f4537fea9cba4e356843f7cdc8b";  
const main = document.getElementById('main');  
const form = document.getElementById('form');  
const search = document.getElementById('search');  
const url = (city)=> `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;  
async function getWeatherByLocation(city){  
     const resp = await fetch(url(city), {  
       origin: "cros" });  
     const respData = await resp.json();  
      addWeatherToPage(respData);  
   }  
   function addWeatherToPage(data){  
    try{
     const temp = Ktoc(data.main.temp);  
     const feels = Ktoc(data.main.feels_like); 
     const pressure = Hpatommhg(data.main.pressure); 
     const eyes = Mtokm(data.visibility);
  
     const weather = document.createElement('div')  
     weather.classList.add('weather');  
    
     weather.innerHTML = `
     <small>${data.name}</small>   
     <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2> 
     <small>${data.weather[0].main}</small> 
     <p> Pressure - ${pressure} mmHg </p> 
     <p> Feels Like - ${feels}°C </p>
     <p> Humidity - ${data.main.humidity}% </p>
     <p> Visibility - ${eyes}km </p>
     `;  
    //  cleanup   
     main.innerHTML= "";  
      main.appendChild(weather); 
     }
     catch(err){
        const noweather = document.createElement('div')  
        noweather.classList.add('weather');  
        noweather.innerHTML  = `<p>${data.message}</p> `;
        //  cleanup 
        main.innerHTML= "";  
        main.appendChild(noweather); 
     } 
   };  
   function Ktoc(K){  
     return Math.floor(K - 273.15);  
   }  
   function Hpatommhg(hpa){  
    return Math.floor(hpa * 0.75);  
  }  
  function Mtokm(eyes){  
    return eyes/1000;  
  } 
   form.addEventListener('submit',(e) =>{  
    e.preventDefault();  
    const city = search.value;  
    if(city){  
      getWeatherByLocation(city)  
    }  
   });  