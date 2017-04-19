"use strict";
var songAndPlaylistHandler = {
    playlistid: null,
    bigArray: [],
    townName: null,
    urlToUserPlaylist: null,

    //initsierar knappen för att spara spellistor
    initButton: function () {
        var sLink = document.getElementById("savelink");
        sLink.textContent = "Save The Playlist";
		sLink.setAttribute("href","#");
		sLink.removeAttribute('target');
        sLink.addEventListener("click", songAndPlaylistHandler.createPlaylist, true);
    },
    //För att senare kunna ta bort eventlistenern så behövs den läggas till med en funktion
    createPlaylist: function(event){
         songAndPlaylistHandler.createPlaylist();
    },
    //Kallar på servern som i sin tur söker efter låtar på spotify med den angivna staden
	getSongs: function () {
//        console.log("getsongs")
        var xhr2 = new XMLHttpRequest();
        xhr2.onreadystatechange = function () {
            if (xhr2.readyState == 4 && xhr2.status == 200) {
                var res = JSON.parse(xhr2.responseText);
//                console.warn(res);
                //Kollar om det kommer tillbaka några låtar
                if(res["tracks"]["items"].length != 0){
                    for (var i = 0; i < res["tracks"]["items"].length; i++){
                        var preurl = trackname = res["tracks"]["items"][i].preview_url;
                        var id = trackname = res["tracks"]["items"][i].id;
                        var trackname = res["tracks"]["items"][i].name;
                        var url = res["tracks"]["items"][i]["external_urls"].spotify;
                        var artistname = res["tracks"]["items"][i].artists[0].name;
                        var uri = res["tracks"]["items"][i].uri;
                        var img = null;
                        if(res["tracks"]["items"][i]["album"]["images"][0] !== null || res["tracks"]["items"][i]["album"]["images"][0] !== undefined){
                             img = res["tracks"]["items"][i]["album"]["images"][0].url;
                        }
                            var trackObject = { artistName:artistname, trackName:trackname, id:id, preurl:preurl, uri:uri, img:img, url:url};
                            songAndPlaylistHandler.bigArray.push(trackObject);
//                        }

                    }
//                    console.log("här"+songAndPlaylistHandler.bigArray.length);
                    songAndPlaylistHandler.loopout(songAndPlaylistHandler.bigArray);
                }
                else{
                    songAndPlaylistHandler.setCardName();
		            songAndPlaylistHandler.getCoverArt();
                    var diven = document.getElementById("songs");
                    diven.textContent = "No songs where found, try again in real town. Or search for one";
                }
            }
            else if (xhr2.readyState == 403 || xhr2.status == 404 || xhr2.status == 500) {
                songAndPlaylistHandler.apiError("spotify");
            }
        };
        xhr2.open("POST", 'http://localhost:3000/searchTracks', true);
        xhr2.send(
        songAndPlaylistHandler.townName
        );

	},

	createPlaylist: function(){
		var xhr = new XMLHttpRequest();
		var songstrings = [];
		xhr.onreadystatechange = function() {
        	if (xhr.readyState == 4 && xhr.status == 200) {
        		var linkAndId = JSON.parse(xhr.responseText);
        		songAndPlaylistHandler.urlToUserPlaylist = linkAndId.link;
        		songAndPlaylistHandler.playlistid = linkAndId.id;
        		for (var i = 0; i < songAndPlaylistHandler.bigArray.length; i++) {

        			songstrings.push(songAndPlaylistHandler.bigArray[i].uri);

        		}
        		 songAndPlaylistHandler.addTracksToplaylist(songstrings);

      		}
            else if (xhr.readyState == 403 || xhr.status == 404 || xhr.status == 500) {
                songAndPlaylistHandler.apiError("spotify");
            }

    	};

	    xhr.open("POST", 'http://localhost:3000/createplaylist', true);
	    xhr.send(

	    	JSON.stringify({"name":"Låtar om " + songAndPlaylistHandler.townName})
				);
	},

	apiError: function (apiName) {
        document.getElementById("songs").textContent = "Unefortunaly is " + apiName + " down at the moment";
    },
	addTracksToplaylist: function(song){

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {

        	if (xhr.readyState == 4 && xhr.status == 200) {
        		var v = xhr.responseText;

        		var sLink = document.getElementById("savelink");
        		sLink.removeEventListener("click", songAndPlaylistHandler.createPlaylist, true);
                sLink.textContent = "The Playslist Is Saved, Click Here To View It";
        		sLink.setAttribute("href",songAndPlaylistHandler.urlToUserPlaylist);
        		sLink.setAttribute("target","_blank");
                //console.log(sLink);
      		}
            else if (xhr.readyState == 403 || xhr.status == 404 || xhr.status == 500) {
                songAndPlaylistHandler.apiError("spotify");
            }
    	};
//	  var pit = song;
//     var plid = songAndPlaylistHandler.playlistid;
	   var tracks = JSON.stringify({"plid" : songAndPlaylistHandler.playlistid , "pit":song});
        console.log(JSON.parse(tracks));
	    xhr.open("POST", 'http://localhost:3000/addTracksToPlayList', true);
	    xhr.send(
				tracks
			);
	},

	loopout: function(arrayOfSongs){

        //console.warn("loppar");
		songAndPlaylistHandler.setCardName();
		songAndPlaylistHandler.getCoverArt();
		var diven = document.getElementById("songs");
		for(var i = 0; i < arrayOfSongs.length; i++){
			var litag = document.createElement("li");

			var audioTag = document.createElement("audio");
			audioTag.setAttribute("src",arrayOfSongs[i].preurl);
			var atag = document.createElement("a");
			atag.setAttribute("href",arrayOfSongs[i].url);
			atag.setAttribute("target","_blank");
			atag.className = "collection-item";
			atag.textContent = arrayOfSongs[i].artistName + " - " + arrayOfSongs[i].trackName ;
			audioTag.setAttribute("controls","");
			litag.appendChild(atag);
			diven.appendChild(atag);
		}

		load.loadCheck();

	},

    getCoverArt: function(){

		for (var i = 0; i < 4; i++) {
			if(songAndPlaylistHandler.bigArray[i] != undefined || songAndPlaylistHandler.bigArray[i] != null ){
			     document.getElementById(i).setAttribute("src",songAndPlaylistHandler.bigArray[i].img);
            }
            else{
                document.getElementById(i).setAttribute("src","../pics/1.png");
            }
		}
	},

	setCardName: function() {
		document.getElementById("cTitle").textContent = "Heres The List Of All Spotify Tracks About "+songAndPlaylistHandler.townName+":";
	},

	emptyResponse: function() {
//        console.log("tömer");
        songAndPlaylistHandler.bigArray = [];
		document.getElementById("songs").innerHTML = "";


	}
};
window.onload = songAndPlaylistHandler.initButton();
