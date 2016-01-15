[Projekt Film](https://www.youtube.com/watch?v=k124yHHJ3PU&feature=youtu.be)
[Länk till aplikationene](http://dagsförkaffe.nu:1337)

##Inledning 
 
Jag har gjort en applikation som heter Honor Your Town. Man kan använda den för att hitta låtar som handlar om staden man befiner sig i. Den hämtar ut användarens position och söker på låtar som har namnet på staden användaren befiner sig i inkluderad i titeln.
Anväandren kan lyssna på låtarna och spara dom som en spotify lista. Använaderrn kan också söka på andra städer än den hen befiner sig i. 

Det tekniker jag har annvänt är:

På servern: 

NodeJS - Node JSs är det server språk som jag känenr mig mest bekväm att arbeta med. Det är också det som jag tycker är roligast.

Express - Som är en Node Modul som underlättar routing och på så viss udnerlättas anropp från klienten til lservern

spotify-web-api-node - Är en Node Modul som jag änvänder för att underlätta koplingen mellan servern och spotify


På Klientent:

Jacascript - Det är det språk jag är mest bekväm i och även det jag tycker är rolgiast att skriva i

Geolocation - För att hämta användarens postition

Materialize - Ett bibliotek jag använder för att få sidan responsiv och snygg

Offline.js - Ett bibliotek jag använder för att tala om för användaren om hen tappar upkopling


APIer:

Spotify Web API - För att kunna använda spotifys funktionalitet. 

Google Maps API - För att med en karta vissa användarens position

Google Geocode API - För att kunna tolka latituder och longituder till stadsnamn och tävrt om. 

##Schematiska bilder över applikationens beståndsdelar

En använadren öppnar sidan och sparar en lista över låtar basserat på sin position

<img src="1.png">

En sökning 

<img src="2.png">

##Säkerhet och prestandaoptimering 

Prestanda optimering är något jag verkligen har försökt jobba med då sidan gör relativt många requests mot servern. Men jag har cachat alla statiska resurser på servern så att den hämtar dom snabbare och när man som användare besöker sidan en andra gång så laddar den betydligt mycket snabbare. Jag har även en laddnings sida som vissas när man loggar in så att användaren ska slippa se när sidan långsamt växer fram. 

Jag har även komprimerat resurser med hjälp av http://refresh-sf.com/. För att få mindre mer snabb lästa filer sidan får 74/100 i betyg av Google PageSpeed Insights (https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fxn--dagsfrkaffe-vfb.nu%3A1337%2Finloggad%3Fcode%3DAQDa9JY6sQYrqbWg3MFmU4xbOEq_JvPSllwEqTbsoVIDs-KOmhTld-KXi24NsIPSFve7vMMe5hhl-rLUpWriCUaBhp2C0SlTvyIZz8Ms_SfJGbePDtP2hwmwCYsIuKd8r70F-ZB-HH6NoH8L4pfm8OwumXyiEfw0wFlRI_Qq29qsFLf9kQcEkC7KT9UHDrTuc5VwOXj_Pl_WzKst6MRY3Z6OhTF2ZhdoGEM8RoERKUIBpR-bPVutnk9TOQL5oMoRWD4QRm-E4CdSMsCSn4gZBIO0f9GgbRfqsMUD4INp6syDKNcAhFJcjws%23&tab=desktop)

##Offline-first: Hur har du tänkt kring offline-first?

Att göra applikationen användbar utan internet uppkopling har varit ett stort problem. Då det är svårt att söka och komma åt spotify utan internet. Dock så har jag annvänt biblioteket offline.js(http://github.hubspot.com/offline/docs/welcome/) för att vissa 
användaren om hen är kopplad till internet eller inte. Detta kollar det genom att med jämna mellan rum försöka hämta faviconen på sidan. Så länge detta inte går så vissas en text som berättar att anväandren är offline.

Laddar man om sidan så kommer man tappa listan och sidan gör en ny sökning på användarens plats. Detta har jag funderat på och kommit fram till inte är en mer avacnerad process än att det gott kan vara så. För att spara sökningar och liknande i localstorage känns meningslöst då man behvöer informationen så pass kort stund. 

##Risker med applikationen tekniskt, säkerhet, etiskt m.m.

Med tanke på att jag använder OATH så hanterar min applikation inga driket kännsliga data så som användarnnamn och lösenord. Det ända som hanteras med koppling till användarens spotify konto,  är en token som används för att auktorisera användaren mot spotify. Denna token gäller bara en viss tid vilket gör att om någon mot förmodan skulle få tag på den så har dom en begränsad tid att använda den. Applikationen är också inställd på så sätt att den bara begär rättigheter att göra sökningar och spellistor. 

Sökrutan fungerar på så sätt att den hämtar värdet och inte HTMLen ur rutan. Detta gör att om användaren skriver en scripttag så hanteras den som en sträng som sedan används i  sökningen istället för att hanteras som en script tag. 

Om man ska se på aplikationen rent etiskt så det alltid lite speciellt när man använder användares positioner. jag själv kan känna mig övervakad när en applikation hämtar min position utan att jag vet om det. Därför tycker jag att det är jätte bra att Geolocation automatiskt frågar om användaren tycker att det är okej att appliaktionen använder platsen.

##Egen reflektion kring projektet: Här tar du upp hur projektet har gått. Vilka eventuella problem har du stött på? Finns det funktioner som du velat implementera men inte hunnit? Hur skulle du vilja jobba vidare med din applikation?

Detta har varit en av mina favorit projekt hititls under utbildningen. Det är alltid roligt att själv få välja vad manska göra. Och med tanke på hur mycket tid vi fick så kunde man göra någor som blev en riktigt appliaktion, till skillnad från gallerier och 
gissa det "hemliga talet"-spel som vi i vanliga fall gör. Det var också väldigt roligt att jobba mot spotify som jag personligen använder varje dag och inte vet hur jag skulle kunna klara mig utan. Det var också roligt att göra en applikation som hjälper en uptäcka nya låtar då jag under utvecklingen har gjort nya fynd nästan dagligen. 

Mitt största problem under utveckligen har varit att jag inte kan super mycekt om NodeJS. Jag tycker det både är intresant och skoj att jobba med, men med tanke på att jag är självlärd är där mycket jag inte kan. Så mycket tid har gått till att förstå 
hur jag ska göra saker som jag vill göra. Men jag kan helt klart säga att jag har lärt mig massor. 

En grej som jag känner har varit väldigt givande är att jag har i ett väldigt tidigt stadie haft versioner som legat live. Vilket har gjort att jag har kunnat skicka länkar till vänner som kunnat testa appliaktionen. Detta har gjort att jag många gånger har haft 
fler ögon än mina egna på projektet och på så viss fått tips om nya funktioner och buggar. 

Jag ville att bakgrunden på startsidan skulle vara ett collage av bilder från google places på de mest sökta platserna. Dock så kan man inte hämta ut bilder från städer utan måste hämta specifica platser i staden. Detta blev problematiskt då jag bara 
använder städer och inte specifica platser. Dock så har jag inte gett upp och hoppas kunna implementera funktionalitet för detta i framtiden. 

Sen så har jag ett probelm som ligger mer i min personlighet än i kodkunskaper. Som är att jag oftast använder dokumentationen som en sista utvägg. Jag provar mig hellre fram än jag läser på. Vilket ibland leder till att onödiga buggar kommer fram. Dett är något
 som jag öfsöker jobba på konstant. OCh det går framåt. I detta projekt har min nyfikenhet inte förstört något viktigt, vilket har hänt i tidigare projekt.

##Skriv också om de eventuella delar du anser vara betygshöjande med din applikation. Motivera varför du anser dessa vara betygshöjande.

Jag har som instruktionerna föreslår använt mig av HTML 5 APIet geolocation, för att hämta ut användarens posititon. Jag har också använt mig av ett ramverk som heter Materialize(http://materializecss.com/). Det är ett ramverk som i mångt och mycket liknar bootrstrap då det percis som bootstrap underlättar att skapa en responsiv design på sidan. Den stora skillnaden är att Materialize är mer specificerat mot det som kallas material design som är googles design språk(https://design.google.com/). 

Dessa två tekniker har gjort att min applikation känns mycket profsigare. Utan geolocation skulle min applikation bara vara en sök ruta utan någon dirket finess. Materialize har gjort så att sidan har fått en mycket proffsigare finish. Den funkar helt problem fritt på mobiler och andra mindre skärmar. Båda dessa tekniker har varit roliga att jobba med och lära känna. Materialize tänker jag garanterat använda igen, då det är så extremt smidigt. Geolocation kan jag också tänka mig att jobba med igen, men det beror ju lite på vad man ska bygga för något.  
