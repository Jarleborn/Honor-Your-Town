"use strict";
//console.log("HOPPLA HOJ")

var searchHandler = {

	initSearch: function () {
//		console.log("To The Black Bird")
//		console.log(document.activeElement)

		document.getElementById("search").addEventListener("keypress", function (e) {
	      
            if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                searchHandler.search();
            }
	    });
        document.getElementById('searchButton').addEventListener("click", function () {
                //console.log(document.activeElement)
                //searchBox = document.getElementById('search') 
                //console.log(searchBox.value)
                //searchHandler.searchWithTownName(searchBox.value)
                //searchBox.value = ""
            searchHandler.search();
        });

	},

	searchWithTownName: function (userInputedTownName) {
		console.log("bajs")
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
        	if (xhr.readyState == 4 && xhr.status == 200) {
                if (xhr.responseText["results"] != []) {
                    searchHandler.succesfulResponse(JSON.parse(xhr.responseText));
                }
                searchHandler.failResponse();
            }
        };
	    xhr.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address=" + userInputedTownName + "&key=AIzaSyC9frD5YpO4uLFqw6ca-vuMn_obtsgR_CQ", true);
	    xhr.send();
	},

	succesfulResponse: function (response) {
		console.log("to the black bird");
//		console.log(response["results"][0]["address_components"])
		mapHandler.initMap(response["results"][0]["geometry"]["location"].lat, response["results"][0]["geometry"]["location"].lng);
		//console.log(songAndPlaylistHandler.townName)
		songAndPlaylistHandler.townName = response["results"][0]["address_components"][0]["long_name"];
		console.log(songAndPlaylistHandler.townName);
//		songAndPlaylistHandler.emptyResponse();
		// songAndPlaylistHandler.initButton()
        
		//songAndPlaylistHandler.getSongs();
	},
    
    failResponse: function () {
		console.log("to the black bird");
        var searchBox = document.getElementById('search');
        searchBox.value = "We are very sorry to tell you that we can't find annything";
	},

	search: function () {
        var searchBox = document.getElementById('search'); 
        console.log(searchBox.value);
        searchHandler.searchWithTownName(searchBox.value);
        searchBox.value = "";
        var sLink = document.getElementById("savelink");
        songAndPlaylistHandler.emptyResponse();
		songAndPlaylistHandler.initButton();
//        sLink.removeEventListener("click", songAndPlaylistHandler.createPlaylist, true);
		console.log(sLink);
	}

}

window.onload = searchHandler.initSearch();