/* Load the HTTP library */
var userID;
var http = require("http");
var SpotifyWebApi = require('spotify-web-api-node');
var express = require("express")  , app = express()
  , port = "1337"
  , ipaddr = 'localhost';
  //, ipaddr = environment.IPDR;
var credentials = {
  clientId : '8f30445301e641c99cee7af38d0212b5',
  clientSecret : '894d94073d1c4e1486249c86b54e8e09',
  //redirectUri : 'http://xn--dagsfrkaffe-vfb.nu:1337/'
  redirectUri : 'http://xn--dagsfrkaffe-vfb.nu:1337/inloggad'
};
 var spotifyApi = new SpotifyWebApi(credentials);
//var spotifyApi = new SpotifyWebApi(credentials);
app.use("/components", express.static(__dirname + '/components'));
app.use(express.static(__dirname + '/public'));
console.log("bajs")
  //Routes
  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
  });
  
  app.get('/inloggad', function(req, res) {
    //console.log(req.query.code)
    spotifyApi.authorizationCodeGrant(req.query.code)
    .then(function(data) {
      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
      res.sendFile(__dirname + '/public/loggedin.html');
  });
   
  app.get('/login', function(req, res) {


  var scopes = 'playlist-modify-public playlist-modify-private playlist-read-private ';
  res.redirect('https://accounts.spotify.com/authorize' + 
    '?response_type=code' + '&show_dialog=true'+
    '&client_id=' + '8f30445301e641c99cee7af38d0212b5' +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent('http://xn--dagsfrkaffe-vfb.nu:1337/inloggad'));
    //'&redirect_uri=' + encodeURIComponent('http://xn--dagsfrkaffe-vfb.nu:1337/inloggad'));
   });

  app.post('/createplaylist', function(req, res) {
    spotifyApi.getMe()
    .then(function(data) {

      //console.log('Some information about the authenticated user', data.body);
      userID = data.body.id;
      console.log(userID)



      var bodyStr = '';
      console.log("kör")
    req.on("data",function(chunk){
      console.log("chunk " + chunk)
        bodyStr += chunk.toString();
        var data = JSON.parse(bodyStr);
        console.log("namn" + data.name)





console.log("hoj " + data.name)
      spotifyApi.createPlaylist(userID, data.name, { 'public' : true })
      .then(function(data) {
      //console.log('Created playlist!' + data.body.id);
      res.send(data.body.id); 
      }, function(err) {
      console.log('Something went wrong!', err);
     })
      });      });
      });


  app.post('/addTracksToPlayList', function(req, res) {

    console.log("hej")
    var bodyStr = '';
    req.on("data",function(chunk){
        bodyStr += chunk.toString();
        var data = JSON.parse(bodyStr);
        console.log("id: "+data.plid +"   låtar: "+ data.pit)
      spotifyApi.addTracksToPlaylist(userID, data.plid, data.pit)

      .then(function(data) {
        console.log('Added tracks to playlist!');
        res.send(userID)
      }, function(err) {
        console.log('Something went wrong!', err);
        res.send(err)
        });
      });
      // });
   
    });

app.listen(port, function() {
  console.log("Server up on "  + ipaddr+":" + port);
});


