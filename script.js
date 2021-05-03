var mainSearchBtnEl = $("#mainSearch");
var searchHistoryBtnEls = $(".searchHistory");
var resultsContainerMain = $("#resultsContainerMain");
var cityInputEl = $(".cityName");
var currentDate = moment().format("(MM/DD/YYYY)");
$("#date").text(' ' + currentDate);
console.log(currentDate);


for (let i = 1; i <= 5; i++) {
    $(i).each(function() {
        $('.fiveDayContainer').html('<div class="card"><div class="card-body"><h5 class="card-title"></h5><img src="" alt="icon" id="icon"><p class="card-text"></p></div></div>')
    });
    var forecastDate = moment().add(i, 'days').format('MM/DD/YYYY');
    console.log('Forecast Date:', forecastDate)
    $('.card-title').text(forecastDate);
};

var formSubmitHandler = function (event) {
  event.preventDefault();
};

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



