var mainSearchBtnEl = $("#mainSearch");
var searchHistoryBtnEls = $(".searchHistory");
var resultsContainerMain = $("#resultsContainerMain");
var cityInputEl = $(".cityName");
var currentDate = moment().format("(MM/DD/YYYY)");
$("#date").text(' ' + currentDate);
console.log(currentDate);

// for (let i = 1; i <= 5; i++) {
//     moment('MM/DD.YYYY').add(1, 'd') = fiveDay[i];
//     console.log('fiveDay:', fiveDay)

// }

var formSubmitHandler = function (event) {
  event.preventDefault();
};

//Current Weather
// const settings = {
//   async: true,
//   crossDomain: true,
//   url:
//     "https://community-open-weather-map.p.rapidapi.com/weather?q=Raleigh%2C%20us&lat=0&lon=0&callback=test&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html",
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": "b0bf9f381cmsh5222c721b80dd11p1937dejsn06a8ef11603c",
//     "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
//   },
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

// function searchResult(response) {
//     var city = response.name;
//   $("#city").html(city);
// }

//Five Day
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://community-open-weather-map.p.rapidapi.com/forecast?q=san%20francisco%2Cus&units=imperial",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "b0bf9f381cmsh5222c721b80dd11p1937dejsn06a8ef11603c",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
    $(document).ready(function() {
        var city = response.city.name;
        var temperature = Math.round(response.list[0].main.temp);
        var wind = response.list[0].wind.speed;
        var humidity = response.list[0].main.humidity;
        var UV = response.list[0]
        var icon = response.list[0].weather[0].icon;

      $('#city').text(city);      
      $('#temp').text('Temperature: ' + temperature +'°F');
      $('#wind').text('Wind Speed: ' + wind);
      $('#humidity').text('Humidity: ' + humidity + '%');
      $('#icon').html('<img src="http://openweathermap.org/img/w/' + icon +'.png" alt="icon">')
    })
});



