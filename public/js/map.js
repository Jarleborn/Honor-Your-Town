var mapHandler = {
	map: null,
	
	getCordinates: function(lat, long) {
		console.log(lat);
		console.log(long);
	},

	addMarker: function(lat, long){
	   marker = new google.maps.Marker({
	   position: {lat: lat, lng: long },
	   map: map,
	   animation: google.maps.Animation.DROP,
	   title: "Här är du"
	 })
	},
	
	initMap: function(lat, longitud) {
		lat = parseFloat(lat)
		longitud = parseFloat(longitud)
		console.log(lat)
		console.log("vad händer" + lat + "           " + longitud)
	    map = new google.maps.Map(document.getElementById('map2'), {
	      center: {lat: lat, lng: longitud},
	      //zoom: 14
	      zoom: 10
	    });
	    console.log(map.addMarker)
	    mapHandler.addMarker(lat, longitud);
		mapHandler.getTownName(lat, longitud);
		//backgroundHandler.initMap();
	},



	getTownName: function(lat, long){
		xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function() {

        	if (xhr.readyState == 4 && xhr.status == 200) {
       			res = JSON.parse(xhr.responseText);
       			console.log(res["results"][0]["address_components"][3]["long_name"]);
       			songAndPlaylistHandler.townName = res["results"][0]["address_components"][3]["long_name"];
       			songAndPlaylistHandler.getSongs(res["results"][0]["address_components"][3]["long_name"]);
      		}
    	}	
	    xhr.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyC9frD5YpO4uLFqw6ca-vuMn_obtsgR_CQ", true);
	    xhr.send();
	},

	
//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyC9frD5YpO4uLFqw6ca-vuMn_obtsgR_CQ
};






