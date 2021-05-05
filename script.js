var mainSearchBtnEl = $("#mainSearch");
var cityInputEl = $("#citySearch");
var currentDate = moment().format("(MM/DD/YYYY)");
$("#date").text(" " + currentDate);

// function initAutocomplete() {
//   var autocomplete = new google.maps.places.Autocomplete(
//     document.getElementById('citySearch'),
//   {
//     componentRestrictions: {'country': ['US']},
//     fields: ['geometry']
//   });
//  }


var cityInput;
var localWeather;
var cityName;
var lat = 35.787743;
var lon = -78.644257;
refreshWeather();

$(mainSearchBtnEl).click(function () {
  cityInput = cityInputEl.val()

  var locationInput = {
    async: true,
    crossDomain: true,
    url:
      "https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=ed93848b5b0c63d91becb0502f59e1d9",
    method: "GET",
  };

  $.ajax(locationInput).done(function (city) {
    console.log('city:', city)
    lat = city[0].lat
    lon = city[0].lon
    cityName = city[0].name
  }).then(function() {
    refreshWeather();
  }).then(function() {
    localStorage.setItem('searched', cityInput);
    $(".searchHistory").append('<button class="btn btn-secondary grayBtn" type="button">'+ cityInput +'</button>');
  });
  })


function refreshWeather() {
localWeather = {
  async: true,
  crossDomain: true,
  url:
    "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=ed93848b5b0c63d91becb0502f59e1d9",
  method: "GET",
};

$.ajax(localWeather).done(function (response) {
  console.log(response);
  $(document).ready(function () {
    var temperature = Math.round(response.current.temp);
    var wind = response.current.wind_speed;
    var humidity = response.current.humidity;
    var UV = response.current.uvi;
    var icon = response.current.weather[0].icon;

    $('#city').text(cityName);
    $("#temp").text("Temperature: " + temperature + "°F");
    $("#wind").text("Wind Speed: " + wind);
    $("#humidity").text("Humidity: " + humidity + "%");
    $("#icon").html(
      '<img src="https://openweathermap.org/img/w/' + icon + '.png" alt="icon">'
    );

    if (UV <= 2) {
      $("#uvi").html('<p class="btn btn-success">UV Index: ' + UV + "</p>");
    } else if (UV > 2 && UV <= 5) {
      $("#uvi").html('<p class="btn btn-warning">UV Index: ' + UV + "</p>");
    } else {
      $("#uvi").html('<p class="btn btn-danger">UV Index: ' + UV + "</p>");
    }
  });

  $(".fiveDayContainer").empty()

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

}


