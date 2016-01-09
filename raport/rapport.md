##Inledning 
 
Jag har gjort en applikation som heter Honor Your Town. man kan använda den för att hitta låtar som handlar om staden man befiner sig i. Den hämtar ut användarens position med geolocation. Med den informationen så renderar den en google maps karta med användarens position utplacerad med en marker. 

Jag använder också Google maps Geocoding API för att få reda på vilken stad platsen som hämtats är i. Sen söker jag på spotify efter låtar som innehåller stadens namn i sin titel. Dessa kan sedan lyssnas på eller spras som en lista. Geocoding APIet används också om man vill söka på en stad som man inte för i, för då kollar den upp latitud och longitud till staden som användaren har sökt på så att den nya platsen också kan presenteras med en karta och en marker. 

Det ekniker jag har använt är:


På servern: 
NodeJS - Node JSs är det server språk som jag känenr mig mest bekväm med. 
Express - För att förenkla anroppen mot servern från klientetn
spotify-web-api-node - För att underlätta koplingen mellan servern och spotify
Spotify Web API - För att kunna anävdna sporitdy

På Klientent
Jacascript - Det är det språk jag är mest bekväm i och även det jag tycker är rolgiast att skriva i
Geolocation - För att hämta användarens postition
Materialize - För att få sidan responsiv och snygg
Google Maps API - För att med en karta vissa användarens position
Google Geocode API - För att tolka latitud och longitiude till ett stads namn och tvärt om. 

##Inkludera en schematisk bild över applikationens beståndsdelar 
<img src="utkast.png">
##Säkerhet och prestandaoptimering 

##Offline-first: Hur har du tänkt kring offline-first?
Offline.js

##Risker med din applikation: Reflektera över vilka risker det finns med din applikation; rent tekniskt, säkerhet, etiskt m.m.


##Egen reflektion kring projektet: Här tar du upp hur projektet har gått. Vilka eventuella problem har du stött på? Finns det funktioner som du velat implementera men inte hunnit? Hur skulle du vilja jobba vidare med din applikation?
Bakgrund från google places - specific plats 

##Skriv också om de eventuella delar du anser vara betygshöjande med din applikation. Motivera varför du anser dessa vara betygshöjande.

Jag har ett bra funktioner som jag annser vara betygshöjande. Först och främst att jag har använt mig av HTML5 APIet Geolocaiton för att hämta användarens position.
 Och för att jag har använt ramverket Materialize (http://materializecss.com/) för att få sidan så responsiv som möjligt
Materialize
GeoLocation