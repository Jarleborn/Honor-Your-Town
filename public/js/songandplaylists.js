var songAndPlaylistHandler = {
playlistid: null,
   bigArray: [],
   townName: null,
   urlToUserPlaylist: null,
   

   initButton: function(){
   	console.log("lör")
   	sLink = document.getElementById("savelink")
   	sLink.addEventListener("click", function() {
   		songAndPlaylistHandler.createPlaylist()
   	});

   },
	getSongs: function(){
		xhr = new XMLHttpRequest();
		//console.log("hoj")
		
		xhr.onreadystatechange = function() {
			
        	if (xhr.readyState == 4 && xhr.status == 200) {
        		var res = JSON.parse(xhr.responseText)
        		console.log(res);
       			for(var i = 0; i < res["tracks"]["items"].length; i++){
       				var array = [];
       				// console.log("Detta är då detta som inte ska funka ---->  "+res["tracks"]["items"][i]["album"]["images"][0])
       				preurl = trackname = res["tracks"]["items"][i].preview_url
       				id = trackname = res["tracks"]["items"][i].id
       				trackname = res["tracks"]["items"][i].name
       				url = res["tracks"]["items"][i]["external_urls"].spotify
       				artistname = res["tracks"]["items"][i].artists[0].name
       				uri = res["tracks"]["items"][i].uri
       				if(res["tracks"]["items"][i]["album"]["images"][0] != null || res["tracks"]["items"][i]["album"]["images"][0] != undefined){
       				img = res["tracks"]["items"][i]["album"]["images"][0].url;
       				}
       				else{
       					img = null
       				}
       				// console.log("img   " + img)
       				// console.log("artist "  + artistname + "  " + artistname.indexOf("Kalmar"))
       				// console.log("låt "  + trackname + "  " + trackname.indexOf("Kalmar"))

       				if(trackname.indexOf(songAndPlaylistHandler.townName) > -1){
       					trackObject = { artistName:artistname, trackName:trackname, id:id, preurl:preurl, uri:uri, img:img, url:url}
       					console.log(trackObject.trackName)
       					songAndPlaylistHandler.bigArray.push(trackObject);
       				}
       				//console.log(res["tracks"]["items"][i].name+ "  med   "+res["tracks"]["items"][i].artists[0].name );
       				
       				//bigArray.push(array)
       			}
       			console.log(songAndPlaylistHandler.bigArray);
       			songAndPlaylistHandler.loopout(songAndPlaylistHandler.bigArray)
				//songAndPlaylistHandler.initButton()
       			//console.log(res["results"][0]["address_components"][3]["long_name"]);

      		}
    	}	
	    //xhr.open("GET", "https://api.spotify.com/v1/search?q="+townName+"&type=track&limit=50", true);
	    xhr.open("GET", 'https://api.spotify.com/v1/search?q='+songAndPlaylistHandler.townName+'&type=track&limit=50', true);
	    xhr.send();
	    
	},

	createPlaylist: function(){
		console.log("Gör Lista")
		xhr = new XMLHttpRequest();
		//xhr2 = new XMLHttpRequest();
		console.log("The child is crying do sometihing about that")
		songstrings = [];
		xhr.onreadystatechange = function() {
			console.log(xhr.readyState)
        	if (xhr.readyState == 4 && xhr.status == 200) {
        		console.log(JSON.parse(xhr.responseText))
        		linkAndId = JSON.parse(xhr.responseText)
        		songAndPlaylistHandler.urlToUserPlaylist = linkAndId.link
        		songAndPlaylistHandler.playlistid = linkAndId.id
        		console.log("VAD STÅR DET HÄR????"+songAndPlaylistHandler.playlistid);
        		
        		for (var i = 0; i < songAndPlaylistHandler.bigArray.length; i++) {

        			songstrings.push(songAndPlaylistHandler.bigArray[i].uri) 
        			
        		};
        		console.log(songstrings);
        		 songAndPlaylistHandler.addTracksToplaylist(songstrings)
      		}
      		 	
    	}	
  
	    //xhr.open("GET", "https://api.spotify.com/v1/search?q="+townName+"&type=track&limit=50", true);
	   
	    xhr.open("POST", 'http://xn--dagsfrkaffe-vfb.nu:1337/createplaylist', true);
	 	 //xhr.setRequestHeader("Content-Type", "application/json" ,"Authorization" ,"Bearer", "BQDJUNwSr-Zui8lyc8KZZINHj828gyb2WmAKZ_XDTy9DdTt9FJ5IkziwXzhoyaRFXHMUfiiWWZtpCb1HO-db-rWepJ6FtMwtRPwJbtwCqhUCtNkFxgt6xVmywQbfeGpjIbfLk2Q9X__juaV1Hhf4W_mDdFTuVaZoeUzg9gn5ILh_wIeZeKNfrPMn27doY-Q4TwWkU1n0ueJtOG49bjYe4mKsa9rqAbBI1wxSWXao6LNQDRJ5GD_YEOVwJNw_ogQ72DOcNjHP6Zm5sjW6UfwZDspigEAQ9-y_p0AaguZTT5Awmr8" )
	    xhr.send(

	    	JSON.stringify({"name":"Låtar om " + songAndPlaylistHandler.townName})
				//JSON.stringify({"name":"test", "public":"true","Authorization":"AQActuIEDkF8yDZgysdxbJ_LvydYNtyJh_nIhx7Xrk5UFgmbopxDNutX6SCWBIWGB7HfD0j7Vppp3vWH5Me8LuWgOLwOhzTvFjZ0YUXvgvuN6qEZP5yGttoRRneGCaT2wCGSu_lqcmMA2or3k_Tw1LLcLbRYkSLiIZBdZyvT455MDM_XD6CzIc86cGL8HmGbnDZvTGsSleYuIE4YfdrWXYIFQ2jicKaeAhNif4dQ_AwS37-lMNG3N36leGs2VgDL6Vwf_dGejjgND_BO9IYEVLOUfj9Q1UZypLAIqQ" })
			);
	},

	addTracksToplaylist: function(song){
		
		xhr = new XMLHttpRequest();
		//xhr2 = new XMLHttpRequest();
		console.log("hoj")
		
		xhr.onreadystatechange = function() {
			
        	if (xhr.readyState == 4 && xhr.status == 200) {
        		v = xhr.responseText
        		console.log("häääääääääääääär------------>        " + JSON.parse(v))
        		sLink = document.getElementById("savelink")
        		sLink.textContent = "The Playslist Is Saved, Click Here To View It"
        		sLink.setAttribute("href",songAndPlaylistHandler.urlToUserPlaylist)
        		sLink.setAttribute("target","_blank")
      		}
    	}	
	    var pit = song
	   var kuk = JSON.stringify({"plid":songAndPlaylistHandler.playlistid, pit});
	   console.log(kuk)
	   console.log(JSON.parse(kuk))
	    xhr.open("POST", 'http://xn--dagsfrkaffe-vfb.nu:1337/addTracksToPlayList', true);
	    xhr.send(
				kuk
			);
	},

	loopout: function(arrayOfSongs){
		songAndPlaylistHandler.setCardName()
		songAndPlaylistHandler.getCoverArt()
		console.log("kör")
		diven = document.getElementById("songs");
		if(arrayOfSongs.length <= 0){
			console.log("hoj")
			diven.textContent = "Tyvärr hittades inga låtar, vänlige se till att spendera din tid i en riktig stad"
		}
		console.log(diven)
		for(var i = 0; i < arrayOfSongs.length; i++){
			litag = document.createElement("li");
			
			audioTag = document.createElement("audio");
			audioTag.setAttribute("src",arrayOfSongs[i].preurl)
			atag = document.createElement("a");
			atag.setAttribute("href",arrayOfSongs[i].url)
			atag.setAttribute("target","_blank")
			atag.className = "collection-item";
			atag.textContent = arrayOfSongs[i].artistName + " - " + arrayOfSongs[i].trackName ;
			//audioTag.setAttribute("autoplay","false")
			audioTag.setAttribute("controls","")
			litag.appendChild(atag) 
			diven.appendChild(atag) 
			//diven.appendChild(audioTag) 
		}

		load.loadCheck()
		
	},

	getCoverArt: function(){
	
		for (var i = 0; i < 4; i++) {
			if(songAndPlaylistHandler.bigArray[i] != undefined || songAndPlaylistHandler.bigArray[i] != null ){
			document.getElementById(i).setAttribute("src",songAndPlaylistHandler.bigArray[i].img)
		}
		else{
			document.getElementById(i).setAttribute("src","../pics/1.png")
		}
		};
	},

	setCardName: function() {
		document.getElementById("cTitle").textContent = "Heres The List Of All Spotify Tracks About "+songAndPlaylistHandler.townName+":"
	}, 

	emptyResponse: function() {
		document.getElementById("songs").innerHTML = ""
		songAndPlaylistHandler.bigArray = []
		
	}










}


window.onload = songAndPlaylistHandler.initButton()