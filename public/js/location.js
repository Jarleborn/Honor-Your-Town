"use strict";
var options = {
    SenableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(position) {
    var cordinates = position.coords;
    console.log(cordinates.latitude);
    console.log(cordinates.longitude);
    mapHandler.initMap(cordinates.latitude, cordinates.longitude);
};

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};

function getPosition () {
    navigator.geolocation.getCurrentPosition(success, error, options);
};

window.onload = getPosition();