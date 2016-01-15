"use strict";
var mapHandler = {
	map: null,
	
//	getCordinates: function (lat, long) {
//		console.log(lat);
//		console.log(long);
//	},

	addMarker: function (lat, long) {
        var marker = new google.maps.Marker({
            position: {lat: lat, lng: long },
            map: mapHandler.map,
            animation: google.maps.Animation.DROP,
            title: "Your position"
	    });
	},
	
//  Skapar en google maps karta baserad på användarens position    
	initMap: function (lat, longitud) {
		//Gör om strängvärden till flytttal
        lat = parseFloat(lat);
		longitud = parseFloat(longitud);
        mapHandler.map = new google.maps.Map(document.getElementById('map2'), {
            center: {lat: lat, lng: longitud},
            zoom: 10
	    });
	    //console.log(mapHandler.map.addMarker);
	    mapHandler.addMarker(lat, longitud);
		mapHandler.getTownName(lat, longitud);
	},
    

    //Skickar longitud och latitud till Google Geocode APIet och får tillbaka ett matchande stadsnamn
	getTownName: function (lat, long) {
        var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var res = JSON.parse(xhr.responseText);
                songAndPlaylistHandler.townName = res["results"][0]["address_components"][3]["long_name"];
                //console.log("är det här");
                songAndPlaylistHandler.getSongs(res["results"][0]["address_components"][3]["long_name"]);
            }
            else if (xhr.readyState == 403 || xhr.status == 404 || xhr.status == 500) {
                songAndPlaylistHandler.apiError("spotify");
            }
    	}	
	    xhr.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyC9frD5YpO4uLFqw6ca-vuMn_obtsgR_CQ", true);
	    xhr.send();
	},
};






