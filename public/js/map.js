var mapHandler = {
	map: null,
	playlistid: null,
   bigArray: [],
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
			
        	if (xhr.readyState == 4 && xhr.status == 200) {
        		var res = JSON.parse(xhr.responseText)
        		console.log(res);
       			for(var i = 0; i < res["tracks"]["items"].length; i++){
       				var array = [];
       				url = trackname = res["tracks"]["items"][i].preview_url
       				id = trackname = res["tracks"]["items"][i].id
       				trackname = res["tracks"]["items"][i].name
       				artistname = res["tracks"]["items"][i].artists[0].name
       				uri = res["tracks"]["items"][i].uri
       				// console.log("artist "  + artistname + "  " + artistname.indexOf("Kalmar"))
       				// console.log("låt "  + trackname + "  " + trackname.indexOf("Kalmar"))

       				if(trackname.indexOf(townName) > -1){
       					trackObject = { artistName:artistname, trackName:trackname, id:id, url:url, uri:uri}
       					mapHandler.bigArray.push(trackObject);
       				}
       				//console.log(res["tracks"]["items"][i].name+ "  med   "+res["tracks"]["items"][i].artists[0].name );
       				
       				//bigArray.push(array)
       			}
       			console.log(mapHandler.bigArray);
       			mapHandler.loopout(mapHandler.bigArray)
	   				 mapHandler.createPlaylist("test")
       			//console.log(res["results"][0]["address_components"][3]["long_name"]);

      		}
    	}	
	    //xhr.open("GET", "https://api.spotify.com/v1/search?q="+townName+"&type=track&limit=50", true);
	    xhr.open("GET", 'https://api.spotify.com/v1/search?q='+townName+'&type=track&limit=50', true);
	    xhr.send();
	    
	},

	createPlaylist: function(townName){
		xhr = new XMLHttpRequest();
		//xhr2 = new XMLHttpRequest();
		//console.log("hoj")
		
		xhr.onreadystatechange = function() {
			
        	if (xhr.readyState == 4 && xhr.status == 200) {
        		mapHandler.playlistid = xhr.responseText
        		console.log(mapHandler.playlistid);

        		for (var i = 0; i < mapHandler.bigArray.length; i++) {
        			mapHandler.addTracksToplaylist(mapHandler.bigArray[i].uri)
        		};
        		
      		}
    	}	
	    //xhr.open("GET", "https://api.spotify.com/v1/search?q="+townName+"&type=track&limit=50", true);
	   
	    xhr.open("GET", 'http://localhost:1337/createplaylist', true);
	 	 //xhr.setRequestHeader("Content-Type", "application/json" ,"Authorization" ,"Bearer", "BQDJUNwSr-Zui8lyc8KZZINHj828gyb2WmAKZ_XDTy9DdTt9FJ5IkziwXzhoyaRFXHMUfiiWWZtpCb1HO-db-rWepJ6FtMwtRPwJbtwCqhUCtNkFxgt6xVmywQbfeGpjIbfLk2Q9X__juaV1Hhf4W_mDdFTuVaZoeUzg9gn5ILh_wIeZeKNfrPMn27doY-Q4TwWkU1n0ueJtOG49bjYe4mKsa9rqAbBI1wxSWXao6LNQDRJ5GD_YEOVwJNw_ogQ72DOcNjHP6Zm5sjW6UfwZDspigEAQ9-y_p0AaguZTT5Awmr8" )
	    xhr.send(
				//JSON.stringify({"name":"test", "public":"true","Authorization":"AQActuIEDkF8yDZgysdxbJ_LvydYNtyJh_nIhx7Xrk5UFgmbopxDNutX6SCWBIWGB7HfD0j7Vppp3vWH5Me8LuWgOLwOhzTvFjZ0YUXvgvuN6qEZP5yGttoRRneGCaT2wCGSu_lqcmMA2or3k_Tw1LLcLbRYkSLiIZBdZyvT455MDM_XD6CzIc86cGL8HmGbnDZvTGsSleYuIE4YfdrWXYIFQ2jicKaeAhNif4dQ_AwS37-lMNG3N36leGs2VgDL6Vwf_dGejjgND_BO9IYEVLOUfj9Q1UZypLAIqQ" })
			);
	},

	addTracksToplaylist: function(song){
		xhr = new XMLHttpRequest();
		//xhr2 = new XMLHttpRequest();
		console.log("hoj")
		
		xhr.onreadystatechange = function() {
			
        	if (xhr.readyState == 4 && xhr.status == 200) {
        		v = xhr.responseText
        		console.log(v);
      		}
    	}	
	    //xhr.open("GET", "https://api.spotify.com/v1/search?q="+townName+"&type=track&limit=50", true);
	   
	    xhr.open("POST", 'http://localhost:1337/addTracksToPlayList', true);
	 	 //xhr.setRequestHeader("Content-Type", "application/json" ,"Authorization" ,"Bearer", "BQDJUNwSr-Zui8lyc8KZZINHj828gyb2WmAKZ_XDTy9DdTt9FJ5IkziwXzhoyaRFXHMUfiiWWZtpCb1HO-db-rWepJ6FtMwtRPwJbtwCqhUCtNkFxgt6xVmywQbfeGpjIbfLk2Q9X__juaV1Hhf4W_mDdFTuVaZoeUzg9gn5ILh_wIeZeKNfrPMn27doY-Q4TwWkU1n0ueJtOG49bjYe4mKsa9rqAbBI1wxSWXao6LNQDRJ5GD_YEOVwJNw_ogQ72DOcNjHP6Zm5sjW6UfwZDspigEAQ9-y_p0AaguZTT5Awmr8" )
	    xhr.send(
				JSON.stringify({"plid":mapHandler.playlistid, "track":song})
			);
	},

	loopout: function(arrayOfSongs){
		console.log("kör")
		diven = document.getElementById("songs");
		if(arrayOfSongs.length <= 0){
			console.log("hoj")
			diven.textContent = "Tyvärr hittades inga låtar, vänlige se till att spendera din tid i en riktig stad"
		}
		console.log(diven)
		for(var i = 0; i < arrayOfSongs.length; i++){
			litag = document.createElement("li");
			litag.textContent = arrayOfSongs[i].artistName + " - " + arrayOfSongs[i].trackName ;
			diven.appendChild(litag) 
		}
	}


};