console.log("HOPPLA HOJ")

var searchHandler = {

	getUserInputedTownName: function () {
		console.log("To The Black Bird")
		console.log(document.activeElement)

		document.getElementById("search").addEventListener("keypress", function(e){
	      
	        if(e.keyCode == 13 && !e.shiftKey){
	            e.preventDefault();
	            searchBox = document.getElementById('search') 
		   		console.log(searchBox.value)
		   		searchHandler.searchWithTownName(searchBox.value)
		   		searchBox.value = ""
	        }
	    });
			document.getElementById('searchButton').addEventListener("click", function() {
				// console.log(document.activeElement)
				searchBox = document.getElementById('search') 
		   		console.log(searchBox.value)
		   		searchHandler.searchWithTownName(searchBox.value)
		   		searchBox.value = ""

	   		});

	},

	searchWithTownName: function(userInputedTownName){
		console.log("bajs")
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
        	if (xhr.readyState == 4 && xhr.status == 200) {
        		if(xhr.responseText["results"] != []){
        			searchHandler.succesfulResponse(JSON.parse(xhr.responseText))
        		}
        	
      		}
    	}	
	    xhr.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address="+userInputedTownName+"&key=AIzaSyC9frD5YpO4uLFqw6ca-vuMn_obtsgR_CQ", true);
	    xhr.send();
	},

	succesfulResponse: function(response) {
		console.log("to the black bird")
		console.log(response["results"][0]["address_components"])
		mapHandler.initMap(response["results"][0]["geometry"]["location"].lat, response["results"][0]["geometry"]["location"].lng)
		//console.log(songAndPlaylistHandler.townName)
		songAndPlaylistHandler.townName = response["results"][0]["address_components"][0]["long_name"];
		console.log(songAndPlaylistHandler.townName)
		document.getElementById("songs").innerHTML = ""
		songAndPlaylistHandler.bigArray = []
		// songAndPlaylistHandler.initButton()
		songAndPlaylistHandler.getSongs()
	}

}

window.onload = searchHandler.getUserInputedTownName()