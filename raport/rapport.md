##Inledning 
 
Jag har gjort en applikation som heter Honor Your Town. man kan använda den för att hitta låtar som handlar om staden man befiner sig i. Den hämtar ut användarens position och säger på låtar som har namnet på staden användaren befiner sig i inkluderad i titeln.
Anväandren kan lyssna på låtarna och spara dom som en spotify lista. Använaderrn kan också söka på andra städer än den hen befiner sig i. 


Det tekniker jag har annvänt är:

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
Offline.js - För att tala om för användaren om hen tappar upkopling

##Inkludera en schematisk bild över applikationens beståndsdelar 
<img src="schematiskbild.png">
##Säkerhet och prestandaoptimering 

Prestanda optimering är något jag verkligen har försökt jobba med då sidan gör relativt många requests mot servern. Men jag har cachat alla statiska resurser på servern så att den hämtar dom snabbare och när man som användare besöker sidan en andra gång så laddar den betydligt mycket snabbare. Jag har även en laddnings sida som vissas när man loggar in så att användaren ska slippa se när sidan långsamt växer fram. 

Jag har även komprimerat resurser 
________________><---------------------
sidan får ditten av datte här https://developers.google.com/speed/pagespeed/insights/?url=webbprogrammerare.se&tab=desktop

##Offline-first: Hur har du tänkt kring offline-first?

Att göra applikationen avnändbar utan internet uppkopling har varit ett stort problem. Då det är svårt att söka och komma åt spotify utan internet. Dock så har jag annvänt biblioteket offline.js(http://github.hubspot.com/offline/docs/welcome/) för att vissa 
 användaren om hen är kopplad till internet eller inte. Detta kollar det genom att med jämna mellan rum försöka hämta faviconen på sidan. Så länge detta inte går så vissas en text som berättar att anväandren är offline
Offline.js

##Risker med din applikation: Reflektera över vilka risker det finns med din applikation; rent tekniskt, säkerhet, etiskt m.m.

Med tanke på att jag använder OATH så hanterar min applikation inga driket kännsliga data så som användarnnamn och lösenord. Det ända som hanteras med spotify är en token som används för att auktorisera användaren mot spotify. Denna token gäller bara en viss tid vilket gör att om någon mot förmodan skulle få tag på dom så har dom en begränsad tid att använda dom. Applikationen är också inställd på så sätt att den bara begär rättigheter att göra sökningar och spellistor. 

Sökrutan fungerar på så sätt att den hämtar värdet och inte tillexempel innerHTML. Detta gör att om användaren skriver en scripttag så hanteras den som en sträng som sedan används i  sökningen istället för att hanteras som en script tag. 

Om man ska se på aplikationen rent etiskt så det alltid lite speciellt när man använder användares positioner. jag själv kan känna mig övervakad när en applikation hämtar min position utan att jag vet om det. Därför tycker jag att det är jätte bra att Geolocation automatiskt frågar om användaren tycker att det är okej

##Egen reflektion kring projektet: Här tar du upp hur projektet har gått. Vilka eventuella problem har du stött på? Finns det funktioner som du velat implementera men inte hunnit? Hur skulle du vilja jobba vidare med din applikation?

Bakgrund från google places - specific plats 

Detta har varit en av mina favorit projekt hititls under utbildningen. Det är alltid roligt att själv få välja vad manska göra. Och med tanke på hur mycket tid vi fick så kunde man göra någor som blev en riktigt appliaktion, till skillnad från gallerier och 
gissa det "hemliga tale" spel som vi i vanliga fall gör. Det var också väldigt roligt att jobba mot spotify som jag personligen använder varjedag och inte vet hur jag skulle kunna klara mig utan. det var också roligt att göra en applikation hjälper en uptäcka nya låtar
då jag under utvecklingen har gjort nya fynd nästan dagligen. 

Mitt största problem under utveckligen har varit att jag inte kan super mycekt om NodeJS. Jag tycker det både är intresant och skoj att jobba med, men med tanke på att jag är självlärd är där mycket jag inte kan. Så  mycket tid har gått till att förstå 
hur jag ska göra saker som jag vill göra. Men jag kan helt klart säga att jag har lärt mig massor. 

Sen så har jag ett probelm som ligger mer i min personlighet än i kodkunskaper. Som är att jag oftast använder dokumentationen som en sista utvägg. Jag provar mig hellre fram än jag läser på. Vilket ibland leder till att onödiga buggar kommer fram. Dett är något
 som jag öfsöker jobba på konstant. OCh det går framåt. I detta projekt har min nyfikenhet inte förstört något viktigt, vilket har hänt i tidigare projekt. 
 
En grej som jag känner har varit väldigt givande är att jag har i ett väldigt tidigt stadie haft versoner som legat live. vilket har gjort att jag har kunnat skicka länkar till vänner som kunnat testa appliaktionen. Detta har gjort att jag många gånger har haft 
fler ögon än mina egna på rpojektet och på så viss fått tips om nya funktioer och buggar. 

Jag ville att bakgrunden på startsidan skulle vara ett collage av bilder från google places på de mest sökta platserna. Dock så kan man inte hämta ut bilder från städer utan måste hämta specifica platser i staden. Detta blev problematiskt då jag bara 
använder städer och inte specifica platser. Dock så har jag inte gett upp och hoppas kunna implementera funktionalitet för detta i framtiden. 

##Skriv också om de eventuella delar du anser vara betygshöjande med din applikation. Motivera varför du anser dessa vara betygshöjande.

Jag har som instruktionerna föreslår använt mig av HTML 5 APIet geolocation, för att hämta ut användarens posititon. Jag har också använt mig av ett ramverk som heter Materialize(http://materializecss.com/). Det är ett ramverk som i mångt och mycket liknar bootrstrap då det percis som bootstrap underlättar att skapa en responsiv design på sidan. Den stora skillnaden är att Materialize är mer specificerat mot det som kallas material design som är googles design språk(https://design.google.com/). 

Dessa två tekniker har gjort att min applikation känns mycket profsigare. Utan geolocation skulle min applikation bara vara en sök ruta utan någon dirket finess. Materialize har gjort så att sidan har fått en mycket proffsigare finish. Den funkar helt problem fritt på mobiler och andra mindre skärmar. Båda dessa tekniker har varit roliga att jobba med och lära känna. Materialize tänker jag garanterat använda igen, då det är så extremt smidigt. Geolocation kan jag också tänka mig att jobba med igen, men det beror ju lite på vad man ska bygga för något.  
