"use strict";
var mapHandler = {
	map: null,
	
	getCordinates: function (lat, long) {
		console.log(lat);
		console.log(long);
	},

	addMarker: function (lat, long) {
        var marker = new google.maps.Marker({
            position: {lat: lat, lng: long },
            map: mapHandler.map,
            animation: google.maps.Animation.DROP,
            title: "Här är du"
	    });
	},
	
	initMap: function (lat, longitud) {
		lat = parseFloat(lat);
		longitud = parseFloat(longitud);
        mapHandler.map = new google.maps.Map(document.getElementById('map2'), {
            center: {lat: lat, lng: longitud},
            zoom: 10
	    });
	    console.log(mapHandler.map.addMarker);
	    mapHandler.addMarker(lat, longitud);
		mapHandler.getTownName(lat, longitud);
	},
	getTownName: function (lat, long) {
        var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var res = JSON.parse(xhr.responseText);
                songAndPlaylistHandler.townName = res["results"][0]["address_components"][3]["long_name"];
                songAndPlaylistHandler.getSongs(res["results"][0]["address_components"][3]["long_name"]);
            }
    	}	
	    xhr.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyC9frD5YpO4uLFqw6ca-vuMn_obtsgR_CQ", true);
	    xhr.send();
	},
};






