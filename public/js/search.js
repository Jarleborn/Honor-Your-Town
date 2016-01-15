"use strict";
//console.log("HOPPLA HOJ")

var searchHandler = {
//  initsierar sökrutan/knappen
	initSearch: function () {
		document.getElementById("search").addEventListener("keypress", function (e) {
	   
            if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                searchHandler.search();
            }
	    });
        document.getElementById('searchButton').addEventListener("click", function () {
            searchHandler.search();
        });

	},
//  Skickar det användaren sökt på till Google Geocode APIet för att om möjligt få tillbaka longitud och latitud
	searchWithTownName: function (userInputedTownName) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
        	if (xhr.readyState == 4 && xhr.status == 200) {
                
                var response = JSON.parse(xhr.responseText);
                console.log(response["results"]);
                if (response["results"].length > 0) {
                    searchHandler.succesfulResponse(response);
                }
                else{
                    searchHandler.failResponse();    
                }
                
            }
            else if (xhr.readyState == 403 || xhr.status == 404 || xhr.status == 500) {
                songAndPlaylistHandler.apiError("Google Geocode");
            }
        };
	    xhr.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address=" + userInputedTownName + "&key=AIzaSyC9frD5YpO4uLFqw6ca-vuMn_obtsgR_CQ", true);
	    xhr.send();
	},

	succesfulResponse: function (response) {
//		console.log("to the black bird");
		mapHandler.initMap(response["results"][0]["geometry"]["location"].lat, response["results"][0]["geometry"]["location"].lng);
		songAndPlaylistHandler.townName = response["results"][0]["address_components"][0]["long_name"];
		console.log(songAndPlaylistHandler.townName);
	},
    
    failResponse: function () {
		console.log("to the black bird");
        var searchBox = document.getElementById('search');
        searchBox.value = "We are very sorry to tell you that we can't find annything";
	},
//Gör sidan redo för en sökning och söker
	search: function () {
        var searchBox = document.getElementById('search'); 
//        console.log(searchBox.value);
        searchHandler.searchWithTownName(searchBox.value);
        searchBox.value = "";
        var sLink = document.getElementById("savelink");
        songAndPlaylistHandler.emptyResponse();
		songAndPlaylistHandler.initButton();
//		console.log(sLink);
	}

}

window.onload = searchHandler.initSearch();