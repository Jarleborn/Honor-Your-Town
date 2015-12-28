//  var location = {
  

// 	 success: function(pos) {
// 	 	console.log("1")
// 	  var crd = pos.coords;

// 	  console.log('Your current position is:');
// 	  console.log('Latitude : ' + crd.latitude);
// 	  console.log('Longitude: ' + crd.longitude);
// 	  console.log('More or less ' + crd.accuracy + ' meters.');
// 	},

// 	 error: function(err) {
// 	 	console.log("2")
// 	  console.warn('ERROR(' + err.code + '): ' + err.message);
// 	},

// 	init: function(){
// 		console.log("3")
		
// 	},

// 	options:{
// 		enableHighAccuracy: true,
//   		timeout: 5000,
//   		maximumAge: 0
// 	}
// }
// navigator.geolocation.getCurrentPosition(location.success, location.error, location.options);
 //window.onload = location.init();
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(position) {
  //console.log(position);
  var cordinates = position.coords;
  console.log(cordinates.latitude)
  console.log(cordinates.longitude)
  // var userPosition ={latitude: cordinates.latitude, Longitude:cordinates.longitude};
  // console.log(userPosition);
  
// //nuvarande
//   	mapHandler.initMap(cordinates.latitude, cordinates.longitude);
   
  //lund
   	 //mapHandler.initMap(55.704660, 13.191007);

  // //malmö
   	mapHandler.initMap(55.604981, 13.003822);

   	// //Örebro
   //	mapHandler.initMap(59.275263, 15.213411);
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

function getPosition(){
	navigator.geolocation.getCurrentPosition(success, error, options);
	console.log(success())
}

window.onload = getPosition()


//getPosition()



