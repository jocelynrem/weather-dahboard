const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://community-open-weather-map.p.rapidapi.com/forecast?q=san%20francisco%2Cus",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "b0bf9f381cmsh5222c721b80dd11p1937dejsn06a8ef11603c",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});