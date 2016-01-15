[Projekt Film](https://www.youtube.com/watch?v=k124yHHJ3PU&feature=youtu.be)   -- Den är 5.05 hoppas att det är lugnt, annars får ni spola 5 sekunder medans spotify laddar

[Länk till aplikationene](http://dagsförkaffe.nu:1337)

##Inledning 
 
Jag har gjort en applikation som heter Honor Your Town. Man kan använda den för att hitta låtar som handlar om staden man befinner sig i. Den hämtar ut användarens position och söker på låtar som har namnet på staden användaren befinner sig i inkluderat i titeln.
Användaren kan lyssna på låtarna och spara dom i en spotify lista. Användaren kan också söka på andra städer. 

Det tekniker jag har använt är:

På servern: 

NodeJS - NodeJS är det serverspråk som jag känner mig mest bekväm att arbeta med. Det är också det som jag tycker är roligast.

Express - Som är en nodemodul som underlättar routing och på så viss udnerlättas anrop från klienten till servern

spotify-web-api-node - Är en nodemodul som jag änvänder för att skapa querrys till spotifys api. 


På Klientent:

Javascript - Det är det språk jag är mest bekväm i och även det jag tycker är roligast att skriva.

Geolocation - För att hämta användarens position

Materialize - Ett bibliotek jag använder för att få sidan responsiv och snygg

Offline.js - Ett bibliotek jag använder för att tala om för användaren om hen tappar uppkoppling


APIer:

Spotify Web API - För att kunna använda spotifys funktionalitet. 

Google Maps API - För att med en karta vissa användarens position

Google Geocode API - För att kunna tolka latitude och longitude till stadsnamn och tvärt om. 

##Schematiska bilder över applikationens beståndsdelar

En använadren öppnar sidan och sparar en lista över låtar basserat på sin position

<img src="1.png">

En använadren gör en sökning 

<img src="2.png">

##Säkerhet och prestandaoptimering 

Prestanda optimering är något jag verkligen har försökt jobba med då sidan gör relativt många requests mot servern. Men jag har cachat alla statiska resurser på servern så att den hämtar dom snabbare och när man som användare besöker sidan en andra gång så laddar den betydligt mycket snabbare. Jag har även en laddnings sida som visas när man loggar in så att användaren ska slippa se när sidan långsamt växer fram. 

Jag har även försökt att använda CDNer i den mån det har gått, också för att få en snabbare inladdning av resurser.

Jag har även komprimerat resurser med hjälp av http://refresh-sf.com/. För att få mindre mer snabblästa filer sidan får 74/100 i betyg av Google PageSpeed Insights (https://goo.gl/EB1Q8g)

##Offline-first

Att göra applikationen användbar utan internetuppkoppling har varit ett stort problem. Då det är svårt att söka och komma åt spotify utan internet. Dock så har jag annvänt biblioteket offline.js(http://github.hubspot.com/offline/docs/welcome/) för att vissa 
användaren om hen är kopplad till internet eller inte. Detta kollar det genom att med jämna mellanrum försöka hämta faviconen på sidan. Så länge detta inte går så visas en text som berättar att användaren är offline.

Laddar man om sidan så kommer man tappa listan och sidan gör en ny sökning på användarens plats. Detta har jag funderat på och kommit fram till inte är en mer avancerad process än att det gott kan vara så. För att spara sökningar och liknande i localstorage känns meningslöst då man behvöer informationen så pass kort stund. 

##Risker med applikationen tekniskt, säkerhet, etiskt m.m.

Med tanke på att jag använder OATH så hanterar min applikation inga dirket kännsliga data så som användarnnamn och lösenord. Istället för användarnamn och lösenord så använder applikationen en accestoken, för att legitimera sig mot spotify. Denna token gäller bara en viss tid vilket gör att om någon mot förmodan skulle få tag på den så har dom en begränsad tid att använda den. Applikationen är också inställd på så sätt att den bara begär rättigheter att ändra och skapa spellistor. 

Sökrutan fungerar på så sätt att den hämtar värdet och inte HTMLen ur sökrutan. Detta gör att om användaren skriver en script-tag så hanteras den som en sträng som sedan används i  sökningen istället för att hanteras som en script-tag. 

Om man ska se på aplikationen rent etiskt så det alltid lite speciellt när man använder användares positioner. Personligen kan jag känna mig övervakad när en applikation hämtar min position utan att jag vet om det. Därför tycker jag att det är jätte bra att Geolocation automatiskt frågar om användaren tycker att det är okej att applikationen använder platsen.

##Egen reflektion kring projektet

Detta har varit en av mina favorit projekt hittills under utbildningen. Det är alltid roligt att själv få välja vad man ska göra. Och framför allt är det roligt att göra något som är så här pass stort. För då Känns det som att man mer är en utvecklare på riktigt som gör något som inte finns/bhevös. Det var också väldigt roligt att jobba mot spotify som jag personligen använder varje dag och inte vet hur jag skulle kunna klara mig utan. Framför allt i denna uppgift där jag snapapde upp en del musik tips längs vägen.  

Mitt största problem under utveckligen är att jag är mer eller mindre självlärd när det kommer till NodeJS och ibland kan det vara så att man har missat något i själv utlärningen. Jag tycker dock att  det  är en teknik som både intressant och väldigt roligt att arbeta med. Och det kombinerat med att jag är en sån som hellre provar än läser på har gjort att en del tid har gått till att lista ut hur jag ska få Node att göra som jag vill. Men å andra sidan så har jag under utvecklinges gång lärt mig väldigt mycket som jag garanterat kommer ha nytta av i framtiden.

En grej som jag känner har varit väldigt givande är att jag har i ett väldigt tidigt stadie haft versioner som legat live. Vilket har gjort att jag har kunnat skicka länkar till vänner som kunnat testa applikationen. Detta har gjort att jag många gånger har haft 
fler ögon än mina egna på projektet och på så viss fått tips om nya funktioner och buggar. 

En funktion som jag inte har lyckats implementera var att jag ville att bakgrunden på startsidan skulle vara ett collage av bilder från google places på de mest sökta platserna. Dock så kan man inte hämta ut bilder från städer utan måste hämta specifica platser i staden. Detta blev problematiskt då jag bara använder städer och inte specifica platser. Dock så har jag inte gett upp och hoppas kunna implementera funktionalitet för detta i framtiden. Jag har också under de sista skällvande timmarna funderat på om man kanske borde flytta upp knappen för att spara listan till toppen av listan istället för botten. Detta är något som med största sannolikhet kommer att ändras i framtiden. 

Jag är också sugen på att göra en sorterings funktion så att man kan välja specifica genere. Detta var dock aldrig något som jag tänkte till projektet utan mer som en vidare utveckling. 


##Betygshöjande komponenter

Jag har som instruktioner föreslår använt mig av HTML 5 APIet geolocation, för att hämta ut användarens position. Jag har också använt mig av ett ramverk som heter Materialize(http://materializecss.com/). Det är ett ramverk som i mångt och mycket liknar bootrstrap då det precis som bootstrap underlättar att skapa en responsiv design på sidan. Den stora skillnaden är att Materialize är mer specificerat mot det som kallas material design som är googles design språk(https://design.google.com/). 

Dessa två tekniker har gjort att min applikation känns mycket profsigare. Utan geolocation skulle min applikation bara vara en sök ruta utan någon direkt fines. Materialize har gjort så att sidan har fått en mycket proffsigare finish. Den funkar helt problem fritt på mobiler och andra mindre skärmar. Båda dessa tekniker har varit roliga att jobba med och lära känna. Materialize tänker jag garanterat använda igen, då det är så extremt smidigt. Geolocation kan jag också tänka mig att jobba med igen, men det beror ju lite på vad man ska bygga för något.  


