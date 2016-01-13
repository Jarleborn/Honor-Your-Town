"use strict";
var songAndPlaylistHandler = {
    playlistid: null,
    bigArray: [],
    townName: null,
    urlToUserPlaylist: null,

    initButton: function () {
        var sLink = document.getElementById("savelink");
        sLink.addEventListener("click", function () {
            songAndPlaylistHandler.createPlaylist();
        });
    },
	getSongs: function () {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var res = JSON.parse(xhr.responseText);
                console.log(res);
                for (var i = 0; i < res["tracks"]["items"].length; i++){
//                    var array = [];
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
                    
                    
                    if(trackname.indexOf(songAndPlaylistHandler.townName) > -1){
                        var trackObject = { artistName:artistname, trackName:trackname, id:id, preurl:preurl, uri:uri, img:img, url:url};
                        console.log(trackObject.trackName);
                        songAndPlaylistHandler.bigArray.push(trackObject);
                    }
                    //console.log(res["tracks"]["items"][i].name+ "  med   "+res["tracks"]["items"][i].artists[0].name );

                    //bigArray.push(array)
                }
                console.log(songAndPlaylistHandler.bigArray);
                songAndPlaylistHandler.loopout(songAndPlaylistHandler.bigArray);
                //songAndPlaylistHandler.initButton()
                //console.log(res["results"][0]["address_components"][3]["long_name"]);

            }
        };	
        //xhr.open("GET", "https://api.spotify.com/v1/search?q="+townName+"&type=track&limit=50", true);
        xhr.open("GET", 'https://api.spotify.com/v1/search?q='+songAndPlaylistHandler.townName+'&type=track&limit=50', true);
        xhr.send();

	},

	createPlaylist: function(){
		console.log("Gör Lista");
		var xhr = new XMLHttpRequest();
		//xhr2 = new XMLHttpRequest();
//		console.log("The child is crying do sometihing about that")
		var songstrings = [];
		xhr.onreadystatechange = function() {
			console.log(xhr.readyState);
        	if (xhr.readyState == 4 && xhr.status == 200) {
        		console.log(JSON.parse(xhr.responseText));
        		var linkAndId = JSON.parse(xhr.responseText);
        		songAndPlaylistHandler.urlToUserPlaylist = linkAndId.link;
        		songAndPlaylistHandler.playlistid = linkAndId.id;
        		console.log("VAD STÅR DET HÄR????"+songAndPlaylistHandler.playlistid);
        		
        		for (var i = 0; i < songAndPlaylistHandler.bigArray.length; i++) {

        			songstrings.push(songAndPlaylistHandler.bigArray[i].uri);
        			
        		}
        		console.log(songstrings);
        		 songAndPlaylistHandler.addTracksToplaylist(songstrings);
      		}
      		 	
    	};
  
	    //xhr.open("GET", "https://api.spotify.com/v1/search?q="+townName+"&type=track&limit=50", true);
	   
	    xhr.open("POST", 'http://xn--dagsfrkaffe-vfb.nu:1337/createplaylist', true);
	    xhr.send(

	    	JSON.stringify({"name":"Låtar om " + songAndPlaylistHandler.townName})
				);
	},

	addTracksToplaylist: function(song){
		
		var xhr = new XMLHttpRequest();
		//xhr2 = new XMLHttpRequest();
		
		
		xhr.onreadystatechange = function() {
			
        	if (xhr.readyState == 4 && xhr.status == 200) {
        		var v = xhr.responseText;
        		var sLink = document.getElementById("savelink");
        		sLink.textContent = "The Playslist Is Saved, Click Here To View It";
        		sLink.setAttribute("href",songAndPlaylistHandler.urlToUserPlaylist);
        		sLink.setAttribute("target","_blank");
      		}
    	};	
	    var pit = song;
	   var tracks = JSON.stringify({"plid":songAndPlaylistHandler.playlistid, pit});
	    xhr.open("POST", 'http://xn--dagsfrkaffe-vfb.nu:1337/addTracksToPlayList', true);
	    xhr.send(
				tracks
			);
	},

	loopout: function(arrayOfSongs){
		songAndPlaylistHandler.setCardName();
		songAndPlaylistHandler.getCoverArt();
		console.log("kör");
		var diven = document.getElementById("songs");
		if(arrayOfSongs.length <= 0){
			console.log("hoj");
			diven.textContent = "Tyvärr hittades inga låtar, vänlige se till att spendera din tid i en riktig stad";
		}
		console.log(diven);
		for(var i = 0; i < arrayOfSongs.length; i++){
			var litag = document.createElement("li");
			
			var audioTag = document.createElement("audio");
			audioTag.setAttribute("src",arrayOfSongs[i].preurl);
			var atag = document.createElement("a");
			atag.setAttribute("href",arrayOfSongs[i].url);
			atag.setAttribute("target","_blank");
			atag.className = "collection-item";
			atag.textContent = arrayOfSongs[i].artistName + " - " + arrayOfSongs[i].trackName ;
			//audioTag.setAttribute("autoplay","false")
			audioTag.setAttribute("controls","");
			litag.appendChild(atag);
			diven.appendChild(atag); 
			//diven.appendChild(audioTag) 
		}

		load.loadCheck();
		
	},

	getCoverArt: function(){
	
		for (var i = 0; i < 4; i++) {
			if(songAndPlaylistHandler.bigArray[i] !== undefined || songAndPlaylistHandler.bigArray[i] !== null ){
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
		document.getElementById("songs").innerHTML = "";
		songAndPlaylistHandler.bigArray = [];
		
	}
};
window.onload = songAndPlaylistHandler.initButton();