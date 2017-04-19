/* Load the HTTP library */
var userID;
var path = require('path');
var http = require("http");
var SpotifyWebApi = require('spotify-web-api-node');
var express = require("express"), app = express()
  , port = "3000"
  , ipaddr = 'localhost';
var credentials = {
  clientId : '8f30445301e641c99cee7af38d0212b5',
  clientSecret : '894d94073d1c4e1486249c86b54e8e09',
  redirectUri : 'http://localhost:3000/inloggad'
};
//Cache
app.use(express.static(path.join(__dirname, '/public'), { maxAge: 31557600000 }));
app.use(express.static(path.join(__dirname, "/public/js"), { maxAge: 31557600000 }));
app.use(express.static(path.join(__dirname, "/public/pics"), { maxAge: 31557600000 }));
app.use(express.static(path.join(__dirname, '/public/css'), { maxAge: 31557600000 }));
app.use(express.static(path.join(__dirname, '/public/materialize'), { maxAge: 31557600000 }));

var spotifyApi = new SpotifyWebApi(credentials);

app.use(express.static(__dirname + '/public'));

  //Routes
  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
  });

//Callbacken till inloggningen
  app.get('/inloggad', function(req, res) {
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

//Inloggningen
  app.get('/login', function(req, res) {
//Begärda tillåtelser
      var scopes = 'playlist-modify-public playlist-modify-private playlist-read-private ';
      res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' + '&show_dialog=true'+
        '&client_id=' + '8f30445301e641c99cee7af38d0212b5' +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent('http://localhost:3000/inloggad'));
  });

//Skapar spellista
  app.post('/createplaylist', function(req, res) {
//      console.log("varför fungerar detta inte 1");
    spotifyApi.getMe()
    .then(function(data) {
//        console.log("varför fungerar detta inte 2");
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
                res.send(JSON.stringify({"id":data.body.id, "link":data.body["external_urls"].spotify }))
            },
          function(err) {
                console.log('Something went wrong!', err);
           })
        });
    });
});

//LÄgger till spår till spellistan
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
        res.send(data.body)
      }, function(err) {
        console.log('Something went wrong!', err);
        res.send(err)
        });
      });
 });

//Söker efter de 30 populäraste låtarna
  app.post('/searchTracks', function(req, res) {
//        var bodyStr = '';
        req.on("data",function(chunk){
            console.log("chunk " + chunk)
            console.log("hoj " + chunk)
            spotifyApi.searchTracks('track:'+chunk+'', {limit: 30})
            .then(function(data) {
                res.send(JSON.stringify(data.body))
            },
          function(err) {
                console.log('Something went wrong!', err);
           })
        });
});

app.get('/fillimg', function(req, res) {
    //console.log(req.query.code)

      res.sendFile(__dirname + '/pics/1.png');
  });

app.listen(port, function() {
  console.log("Server up on "  + ipaddr+":" + port);
});
