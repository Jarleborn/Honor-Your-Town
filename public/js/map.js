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
	
	initMap: function(lat, long) {
	    map = new google.maps.Map(document.getElementById('map'), {
	      center: {lat: lat, lng: long},
	      zoom: 14
	    });
	    console.log(map.addMarker)
	    mapHandler.addMarker(lat, long);
		mapHandler.getTownName(lat, long);
	},

	getTownName: function(lat, long){
		xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function() {

        	if (xhr.readyState == 4 && xhr.status == 200) {
       			res = JSON.parse(xhr.responseText);
       			console.log(res["results"][0]["address_components"][3]["long_name"]);
       			mapHandler.getSongs(res["results"][0]["address_components"][3]["long_name"]);
      		}
    	}	
	    xhr.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyC9frD5YpO4uLFqw6ca-vuMn_obtsgR_CQ", true);
	    xhr.send();
	},

	getSongs: function(townName){
		xhr = new XMLHttpRequest();
		//console.log("hoj")
		
		xhr.onreadystatechange = function() {
			var bigArray = []
        	if (xhr.readyState == 4 && xhr.status == 200) {
        		var res = JSON.parse(xhr.responseText)
        		console.log(res);
       			for(var i = 0; i < res["tracks"]["items"].length; i++){
       				var array = [];
       				url = trackname = res["tracks"]["items"][i].preview_url
       				id = trackname = res["tracks"]["items"][i].id
       				trackname = res["tracks"]["items"][i].name
       				artistname = res["tracks"]["items"][i].artists[0].name
       				// console.log("artist "  + artistname + "  " + artistname.indexOf("Kalmar"))
       				// console.log("låt "  + trackname + "  " + trackname.indexOf("Kalmar"))

       				if(trackname.indexOf("Kalmar") > -1){
       					trackObject = { artistName:artistname, trackName:trackname, id:id, url:url}
       					bigArray.push(trackObject);
       				}
       				//console.log(res["tracks"]["items"][i].name+ "  med   "+res["tracks"]["items"][i].artists[0].name );
       			
       				//bigArray.push(array)
       			}
       			console.log(bigArray);
       			//console.log(res["results"][0]["address_components"][3]["long_name"]);

      		}
    	}	
	    //xhr.open("GET", "https://api.spotify.com/v1/search?q="+townName+"&type=track&limit=50", true);
	    xhr.open("GET", 'https://api.spotify.com/v1/search?q=Kalmar&type=track&limit=50', true);
	    xhr.send();
	}


};