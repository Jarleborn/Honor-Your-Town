/* Load the HTTP library */
var http = require("http");
var SpotifyWebApi = require('spotify-web-api-node');
var express = require("express")  , app = express()
  , port = 1312
  , ipaddr = 'localhost';
  //, ipaddr = environment.IPDR;

app.use("/components", express.static(__dirname + '/components'));
app.use(express.static(__dirname + '/public'));
console.log("bajs")

  //Routes
  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
  });
  app.get('/inloggad', function(req, res) {
    res.sendFile(__dirname + '/public/loggedin.html');
  });
  
  app.get('/login', function(req, res) {
  var scopes = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize' + 
    '?response_type=code' + '&show_dialog=true'+
    '&client_id=' + '8f30445301e641c99cee7af38d0212b5' +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent('http://localhost:1312/inloggad'));
  });

app.listen(port, function() {
  console.log("Server up on "  + ipaddr+":" + port);
});
// app.get('/login', function(req, res) {
// var scopes = 'user-read-private user-read-email';
// res.redirect('localhost:1312/inloggad' +
//   '&client_id=' +"8f30445301e641c99cee7af38d0212b5" +
//   (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
//   '&redirect_uri=' + encodeURIComponent('localhost:1312/inloggad'));
// });


//   //spotify
//   var spotifyApi = new SpotifyWebApi({
//   clientId : '8f30445301e641c99cee7af38d0212b5',
//   clientSecret : '894d94073d1c4e1486249c86b54e8e09',
//   redirectUri : 'http://localhost/inloggad'
// });

  
// var credentials = {
//   clientId : '8f30445301e641c99cee7af38d0212b5',
//   clientSecret : '894d94073d1c4e1486249c86b54e8e09',
//   redirectUri : 'localhost:1312/inloggad'
// };
 
// var spotifyApi = new SpotifyWebApi(credentials);
 
// // The code that's returned as a query parameter to the redirect URI 
// var code = 'MQCbtKe23z7YzzS44KzZzZgjQa621hgSzHN';
 
// // Retrieve an access token and a refresh token 
// spotifyApi.authorizationCodeGrant(code)
//   .then(function(data) {
//     console.log('The token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);
//     console.log('The refresh token is ' + data.body['refresh_token']);
 
//     // Set the access token on the API object to use it in later calls 
//     spotifyApi.setAccessToken(data.body['access_token']);
//     spotifyApi.setRefreshToken(data.body['refresh_token']);
//   }, function(err) {
//     console.log('Something went wrong!', err);
//   });




// var credentials = {
//  clientId : '8f30445301e641c99cee7af38d0212b5',
//   clientSecret : '894d94073d1c4e1486249c86b54e8e09',
//   redirectUri : 'http://localhost/inloggad'
// };

// var spotifyApi = new SpotifyWebApi(credentials);

// var scopes = 'user-read-private user-read-email';
// var authorizeURL = spotifyApi.createAuthorizeURL(scopes);

// // The code that's returned as a query parameter to the redirect URI
// var code = 'MQCbtKe23z7YzzS44KzZzZgjQa621hgSzHN';

// // Retrieve an access token and a refresh token
// spotifyApi.authorizationCodeGrant(code)
//   .then(function(data) {
//     console.log('The token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);
//     console.log('The refresh token is ' + data.body['refresh_token']);

//     // Set the access token on the API object to use it in later calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//     spotifyApi.setRefreshToken(data.body['refresh_token']);
//   }, function(err) {
//     console.log('Something went wrong!', err);
//   });


