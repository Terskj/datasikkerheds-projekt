'use strict';

//Funktionen der returnere et scenarie baseret på valgt ID
function getScenario(scenarioId) {
  let scenario = { // Grundstruktur for hvert scenarie
    title: "",
    steps: []
  };


  //Brig af switch til at vælge det rigtige scenarie baseret på ID
  switch (scenarioId) {
    case "phishing": //Phishing scenariet
      scenario.title = "Phishing-mail";
      scenario.steps = [
        {
          text: "Du får en mail fra din 'bank', der beder dig logge ind via et link. Hvad gør du?",
          image: "img/phishing.jpg", //Alle billeder som fremgår i projektet er genereret i Adobe Firefly
          options: [
            { text: "Klik på linket", next: 1 },
            { text: "Undersøg mailen nærmere", next: 2 },
            { text: "Slet mailen med det samme", next: 3 }
          ]
        },
        {
          text: "Du lander på en side, der ligner banken. Hvad gør du?",
          options: [
            { text: "Indtast oplysninger", next: 4 },
            { text: "Luk siden og kontakt banken", next: 5 },
            { text: "Ignorer og glem det", next: 6 }
          ]
        },
        {
          text: "Du opdager fejl i afsenderadressen og mærkelige links. Hvad gør du?",
          options: [
            { text: "Rapporter mailen", next: 5 },
            { text: "Slet den og tjek din konto", next: 6 },
            { text: "Klik alligevel – den virker ægte", next: 1 }
          ]
        },
        {
          text: "Du sletter mailen og overvejer, om du skal gøre mere. Hvad vælger du?",
          options: [
            { text: "Tjek netbank og aktivér 2FA", next: 7 },
            { text: "Rapportér mailen", next: 5 },
            { text: "Gør ikke mere", next: 8 }
          ]
        },
        {
          text: "Dine oplysninger er nu sendt. Hvad gør du efterfølgende?",
          options: [
            { text: "Skift adgangskode med det samme", next: 7 },
            { text: "Aktivér to-faktor login", next: 7 },
            { text: "Ignorer det – ingen skade sket", next: 9 }
          ]
        },
        {
          text: "Du rapporterede phishing-mailen. Vil du tage yderligere forholdsregler?",
          options: [
            { text: "Aktivér to-faktor login", next: 7 },
            { text: "Tjek din konto for aktivitet", next: 7 },
            { text: "Intet – det er ikke mit ansvar", next: 8 }
          ]
        },
        {
          text: "Du tjekker din konto og ser ingen mærkelige aktiviteter. Hvad gør du?",
          options: [
            { text: "Aktivér 2FA og skift kode", next: 7 },
            { text: "Sørger for backup af dine konti", next: 7 },
            { text: "Lader det være", next: 9 }
          ]
        },
        {
          text: "Du handlede sikkert og beskyttede dine konti mod svindel.",
          consequence: "Du aktiverede 2FA og skiftede kode – flot arbejde!",
          options: []
        },
        {
          text: "Du slap heldigt, men uden ekstra sikkerhed forbliver du sårbar.",
          consequence: "Du undgik angrebet, men tog ikke yderligere forholdsregler.",
          options: []
        },
        {
          text: "Dine data blev misbrugt til svindel. Du opdagede det for sent.",
          consequence: "Din konto blev kompromitteret, fordi du ikke handlede i tide.",
          options: []
        }
      ];
      break;

      //Adgangskode-scenariet
    case "adgangskode":
      scenario.title = "Adgangskoder";
      scenario.steps = [
        {
          text: "Du skal vælge en adgangskode til en ny konto. Hvad vælger du?",
          image: "img/password.jpg",
          options: [
            { text: "123456", next: 1 },
            { text: "D1g!taL#Tiger2025", next: 2 },
            { text: "Den samme adgangskode som du altid bruger", next: 3 }
          ]
        },
        {
          text: "Du får en advarsel om, at din kode er meget svag. Hvad gør du?",
          options: [
            { text: "Skift adgangskode", next: 4 },
            { text: "Ignorer advarslen", next: 5 },
            { text: "Aktivér 2-faktor login", next: 6 }
          ]
        },
        {
          text: "Din kode er stærk. Vil du gøre mere for sikkerheden?",
          options: [
            { text: "Gem adgangskoden i browseren", next: 5 },
            { text: "Brug en password manager", next: 4 },
            { text: "Tilføj 2-faktor login", next: 6 }
          ]
        },
        {
          text: "Din adgangskode er blevet lækket i et tidligere databrud. Hvad gør du?",
          options: [
            { text: "Skift koden på alle sider", next: 4 },
            { text: "Brug password manager", next: 6 },
            { text: "Ignorer det", next: 5 }
          ]
        },
        {
          text: "Du har valgt en stærk løsning. Vil du tage et sidste skridt?",
          options: [
            { text: "Aktivér 2FA", next: 7 },
            { text: "Opdater sikkerhed på andre konti også", next: 7 },
            { text: "Gem kode offline", next: 7 }
          ]
        },
        {
          text: "Du ignorerer advarsler og gemmer koden i browseren uden beskyttelse.",
          options: [
            { text: "Gør ikke mere", next: 8 },
            { text: "Installer antivirus", next: 7 },
            { text: "Skift kode senere", next: 8 }
          ]
        },
        {
          text: "Du tager nogle forholdsregler, men ikke alle. Hvad gør du nu?",
          options: [
            { text: "Opdater kode regelmæssigt", next: 7 },
            { text: "Gør ikke mere", next: 8 },
            { text: "Installer password manager", next: 7 }
          ]
        },
        {
          text: "Du sikrede din konto med stærk kode, 2FA og god password-håndtering.",
          consequence: "Du har god digital adfærd og høj datasikkerhed. Flot!",
          options: []
        },
        {
          text: "Din konto virker sikker, men du mangler stadig nogle tiltag.",
          consequence: "Du gjorde noget, men ikke alt. Der er stadig risiko for brud.",
          options: []
        },
        {
          text: "Din konto blev kompromitteret pga. svag eller genbrugt kode.",
          consequence: "Din manglende reaktion førte til et reelt angreb.",
          options: []
        }
      ];
      break;

    case "wifi": //Offentligt wifi scenarie
      scenario.title = "Offentligt WiFi";
      scenario.steps = [
        {
          text: "Du sidder på en café og skal tjekke din netbank. Hvilket netværk vælger du?",
          image: "img/wifi.jpg",
          options: [
            { text: "Offentligt WiFi uden beskyttelse", next: 1 },
            { text: "Offentligt WiFi med VPN", next: 2 },
            { text: "Mobildata", next: 3 }
          ]
        },
        {
          text: "Du logger ind på netbank, men forbindelsen er usikker. Hvad gør du?",
          options: [
            { text: "Klikker videre – det haster", next: 4 },
            { text: "Logger ud og lukker netværket", next: 5 },
            { text: "Skifter til mobildata", next: 6 }
          ]
        },
        {
          text: "Din VPN er aktiv. Alt virker normalt. Hvad gør du efter login?",
          options: [
            { text: "Logger ud og lukker forbindelsen", next: 7 },
            { text: "Tjekker mail med følsomme data", next: 5 },
            { text: "Deler WiFi med andre", next: 6 }
          ]
        },
        {
          text: "Du logger sikkert ind via mobildata. Hvad gør du bagefter?",
          options: [
            { text: "Aktiverer 2FA på netbank", next: 7 },
            { text: "Gør ingenting – det virkede jo fint", next: 8 },
            { text: "Logger ud og slår mobilen i flytilstand", next: 7 }
          ]
        },
        {
          text: "Din netbank-session virker ustabil, og du får en mærkelig popup. Hvad gør du?",
          options: [
            { text: "Ignorer og klik videre", next: 8 },
            { text: "Lukker alt og ændrer kode", next: 7 },
            { text: "Installer antivirus og scanner", next: 7 }
          ]
        },
        {
          text: "Du har læst følsomme mails over usikker forbindelse. Hvad gør du?",
          options: [
            { text: "Aktiver 2FA og skift kode", next: 7 },
            { text: "Lad det være – ingen skete noget", next: 8 },
            { text: "Installer VPN på mobilen også", next: 7 }
          ]
        },
        {
          text: "En ven spørger om kode til netværket. Hvad gør du?",
          options: [
            { text: "Deler koden, men advarer om usikkerhed", next: 7 },
            { text: "Anbefaler VPN i stedet", next: 7 },
            { text: "Gør ikke mere", next: 8 }
          ]
        },
        {
          text: "Du navigerede sikkert og tog de rigtige forholdsregler.",
          consequence: "Du brugte VPN/mobildata, aktiverede 2FA og undgik risici. Godt gået!",
          options: []
        },
        {
          text: "Der skete ikke noget denne gang, men dine data var udsatte.",
          consequence: "Du reagerede ikke aktivt, men slap heldigt fra det. Overvej ekstra sikkerhed fremover.",
          options: []
        },
        {
          text: "Dine data blev opsnappet på det åbne netværk. Du opdagede det for sent.",
          consequence: "Du brugte usikret WiFi og handlede ikke hurtigt nok. Det kostede data.",
          options: []
        }
      ];
      break;

    case "sociale": //Sociale medier scenarie
      scenario.title = "Sociale medier";
      scenario.steps = [
        {
          text: "Du får en venneanmodning fra en person, du ikke kender. Hvad gør du?",
          image: "img/sociale.jpg",
          options: [
            { text: "Accepterer anmodningen", next: 1 },
            { text: "Tjekker profilen først", next: 2 },
            { text: "Ignorerer og blokerer", next: 3 }
          ]
        },
        {
          text: "Kort efter får du underlige beskeder og links. Hvad gør du?",
          options: [
            { text: "Klikker på linksene", next: 4 },
            { text: "Blokerer personen", next: 5 },
            { text: "Rapporterer kontoen", next: 6 }
          ]
        },
        {
          text: "Profilen har ingen opslag og ingen fælles venner. Hvad vælger du?",
          options: [
            { text: "Rapporter profilen som falsk", next: 6 },
            { text: "Accepter alligevel", next: 1 },
            { text: "Slet anmodningen og luk appen", next: 3 }
          ]
        },
        {
          text: "Du blokerer med det samme. Hvad gør du derefter?",
          options: [
            { text: "Opdaterer dine privatlivsindstillinger", next: 7 },
            { text: "Tilføjer 2-faktor login", next: 7 },
            { text: "Gør ikke mere", next: 8 }
          ]
        },
        {
          text: "Linket aktiverede noget mistænkeligt. Hvad gør du nu?",
          options: [
            { text: "Logger ud og ændrer kode", next: 7 },
            { text: "Ignorerer det", next: 8 },
            { text: "Installer antivirus og scanner", next: 7 }
          ]
        },
        {
          text: "Du har blokeret og føler dig mere tryg. Hvad vælger du nu?",
          options: [
            { text: "Sletter gamle opslag", next: 7 },
            { text: "Tjekker hvem der kan finde din profil", next: 7 },
            { text: "Ignorerer det og går videre", next: 8 }
          ]
        },
        {
          text: "Du rapporterede og kontoen blev fjernet. Hvad gør du yderligere?",
          options: [
            { text: "Tjekker adgangslog og ændrer kode", next: 7 },
            { text: "Aktivér privat profil", next: 7 },
            { text: "Intet – problemet er løst", next: 8 }
          ]
        },
        {
          text: "Du handlede sikkert og proaktivt. Din konto er godt beskyttet.",
          consequence: "Du aktiverede 2FA, ændrede indstillinger og fjernede falske forbindelser. God digital adfærd!",
          options: []
        },
        {
          text: "Du ignorerede profilen og reagerede ikke. Men dine oplysninger er stadig offentligt tilgængelige.",
          consequence: "Du undgik kontakt, men kunne have øget din sikkerhed ved at ændre dine privatlivsindstillinger.",
          options: []
        },
        {
          text: "Du klikkede på mistænkelige links fra en falsk profil, og din konto blev misbrugt.",
          consequence: "Du blev offer for phishing og mistede kontrol over din konto.",
          options: []
        }
      ];
      break;

      //Hvis ID ikke matcher noget, returnere tomt scenarie
    default:
      scenario.title = "Ukendt scenarie";
      scenario.steps = [];
      break;
  }
// Returnere det færdige svenarie til script.js
  return scenario;
}
