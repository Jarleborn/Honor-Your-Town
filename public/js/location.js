"use strict";


var locationhandler = {

    options: {
        SenableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    },
    //Hanterar positionen om den bli rätt
     success: function (position) {
        var cordinates = position.coords;
//        console.log(cordinates.latitude);
//        console.log(cordinates.longitude);
        mapHandler.initMap(cordinates.latitude, cordinates.longitude);
    },
    //Hanterar fel.
      error: function (err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    },
    //Hämtar användarens position.
    getPosition: function  () {
        navigator.geolocation.getCurrentPosition(locationhandler.success, locationhandler.error, locationhandler.options);
    }
    
}

window.onload = locationhandler.getPosition();