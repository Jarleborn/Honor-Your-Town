"use strict";
var placesHandler = {
	getDetailAboutPlace: function () {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var w = JSON.parse(xhr.responseText);
                for (var i = 0; i < w["result"]["photos"].length; i++) {
                    console.log(w["result"]["photos"][i]["photo_reference"]);
                    placesHandler.getPics(w["result"]["photos"][i]["photo_reference"]);
                }	
        	}
    	};	
	 	xhr.open("GET", 'https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJY-886c6XU0YRipSzBG2DNo8&key=AIzaSyC9frD5YpO4uLFqw6ca-vuMn_obtsgR_CQ', true);
	    xhr.send(
				
			);
	},


	getPics: function (argument) {
        		var img = document.createElement("img");
        		img.setAttribute("src",'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+argument+'&key=AIzaSyC9frD5YpO4uLFqw6ca-vuMn_obtsgR_CQ');
       			document.getElementById('bajs').appendChild(img);		

};

window.onload = placesHandler.getDetailAboutPlace("hoj");