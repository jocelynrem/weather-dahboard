var mainSearchBtnEl = $("#mainSearch");
var searchHistoryBtnEls = $(".searchHistory");
var resultsContainerMain = $("#resultsContainerMain");
var cityInputEl = $(".cityName");
var currentDate = moment().format("(MM/DD/YYYY)");
$("#date").text(" " + currentDate);
console.log(currentDate);

var formSubmitHandler = function (event) {
  event.preventDefault();
};

// function searchResult(response) {
//     var city = response.name;
//   $("#city").html(city);
// }


const settings = {
  async: true,
  crossDomain: true,
  url:
    "https://api.openweathermap.org/data/2.5/onecall?lat=35.787743&lon=-78.644257&units=imperial&exclude=minutely,hourly,alerts&appid=ed93848b5b0c63d91becb0502f59e1d9",
  method: "GET",
};


$.ajax(settings).done(function (response) {
  console.log(response);
  $(document).ready(function () {
    // var city = response.city.name;
    var temperature = Math.round(response.current.temp);
    var wind = response.current.wind_speed;
    var humidity = response.current.humidity;
    var UV = response.current.uvi;
    var icon = response.current.weather[0].icon;
    console.log("icon:", icon);

    //   $('#city').text(city);
    $("#temp").text("Temperature: " + temperature + "°F");
    $("#wind").text("Wind Speed: " + wind);
    $("#humidity").text("Humidity: " + humidity + "%");
    $("#icon").html(
      '<img src="http://openweathermap.org/img/w/' + icon + '.png" alt="icon">'
    );

    if (UV <= 2) {
      $("#uvi").html('<p class="btn btn-success">UV Index: ' + UV + "</p>");
    } else if (UV > 2 && UV <= 5) {
      $("#uvi").html('<p class="btn btn-warning">UV Index: ' + UV + "</p>");
    } else {
      $("#uvi").html('<p class="btn btn-danger">UV Index: ' + UV + "</p>");
    }
  });
  for (let i = 0; i < 5; i++) {
    $(function () {
      $(".fiveDayContainer").append(
        '<div class="card"><div class="card-body"><h5 class="card-title"></h5><p class="fiveDayIcon"></p><h6 class="temp"></h6><h6 class="windSpeed"></h6><h6 class="humid"></h6></div></div>'
      );
      $(".card-title").each(function (i) {
        $(this).text(moment().add(i, "days").format("MM/DD/YYYY"));
      });

      $(".fiveDayIcon").each(function (i) {
        $(this).html(
          '<img src="http://openweathermap.org/img/w/' +
            (response.daily[i].weather[0].icon) +
            '.png" alt="icon">'
        );
      });
      $(".temp").each(function (i) {
        $(this).text('High Temp: ' + Math.round(response.daily[i].temp.max) + '°F');
      });
      $(".windSpeed").each(function (i) {
        $(this).text('Wind Speed: ' + Math.round(response.daily[i].wind_speed) + 'MPH');
      });
      $(".humid").each(function (i) {
        $(this).text('Humidity: ' + Math.round(response.daily[i].humidity) + '%');
      });
    });
  }
});
