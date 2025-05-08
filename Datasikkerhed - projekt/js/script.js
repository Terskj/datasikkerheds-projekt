'use strict';

//Henter container-elementet hvor alt indhold vises
const container = document.getElementById("scenario-container");

//Variabler til at holde styr på scenariet
let currentScenario = null;
let currentIndex = 0;
let userChoices = [];

//Funktionen som viser startsiden, med introduktion og emnevalg
function showStartScreen() {
  userChoices = []; // nulstiller brugerens valg

  // HTML strukturen til introduktion og emneknapper
  container.innerHTML = `
    <section class="intro">
      <h2>Interaktiv læring om datasikkerhed</h2>
      <p>
        Forestil dig det her: Du sidder på en café, kobler dig på det gratis WiFi og tjekker lige hurtigt din netbank. 
        Eller du får en venneanmodning fra en person, du ikke kender, men i har en fællesven, så du klikker "accepter".
      </p>
      <p>
        I en digital hverdag kan selv de mindste klik føre til store konsekvenser. Det handler ikke om at være ekspert, 
        men om at kunne gennemskue de situationer, hvor noget føles en smule forkert, og handle klogt, når det gælder.
      </p>
      <p>
        Her kan du spille fire scenarier: <strong>phishing</strong>, <strong>adgangskoder</strong>, 
        <strong>offentligt WiFi</strong> og <strong>sociale medier</strong>. Dine valg former, hvad der sker 
        og hvad du lærer.
      </p>
      <p>
        Det handler ikke om at svare rigtigt, men om at blive bevidst om dine digitale vaner. Til sidst får du et overblik 
        over dine beslutninger og konsekvenser og måske ser du din onlineadfærd med nye øjne.
      </p>
      <p>
        Er du klar til at prøve? Vælg et scenarie og se, hvordan du klarer dig.
      </p>
    </section>
    <div class="button-group">
      <button id="btn-phishing">Phishing</button>
      <button id="btn-adgangskode">Adgangskoder</button>
      <button id="btn-wifi">Offentligt WiFi</button>
      <button id="btn-sociale">Sociale medier</button>
    </div>
  `;

  // Event listeners der starter scenarier ud fra det emne som brugeren vælger
  document.getElementById("btn-phishing").addEventListener("click", () => startScenario("phishing"));
  document.getElementById("btn-adgangskode").addEventListener("click", () => startScenario("adgangskode"));
  document.getElementById("btn-wifi").addEventListener("click", () => startScenario("wifi"));
  document.getElementById("btn-sociale").addEventListener("click", () => startScenario("sociale"));
}

// en funktion som henter scenariedata og viser første trin
function startScenario(name) {
  currentScenario = getScenario(name); // kalder på funktionen fra scenarios.js vha. switch
  currentIndex = 0;
  renderStep();
}

//Funktionen viser et enkelt trin i et scenarie
function renderStep() {
  const step = currentScenario.steps[currentIndex];
  container.innerHTML = "";

  const card = document.createElement("div");
  card.className = "scenario-card";

  const title = document.createElement("h2");
  title.textContent = currentScenario.title;
  card.appendChild(title);

  // Tilføjer billeder, hvis de findes
  if (step.image) {
    const img = document.createElement("img");
    img.src = step.image;
    img.alt = "illustration";
    img.className = "scenario-image";
    card.appendChild(img);
  }

  const text = document.createElement("p");
  text.textContent = step.text;
  card.appendChild(text);

  //oprettet en knap-gruppe og loop igennem valgmuligheder
  const buttonGrid = document.createElement("div");
  buttonGrid.className = "button-group";

  for (let i = 0; i < step.options.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = step.options[i].text;
    btn.id = "option" + i;

    //Hver knap har en event listener der kalder handleChioce med brugerens valg
    btn.addEventListener("click", function () {
      handleChoice(step.options[i].text, step.options[i].next);
    });
    buttonGrid.appendChild(btn);
  }

  card.appendChild(buttonGrid);

  //Navigationsknapper for at vælge et nyt scenarie eller nulstille
  const navGroup = document.createElement("div");
  navGroup.className = "button-group";

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Vælg et nyt scenarie";
  restartBtn.addEventListener("click", showStartScreen);

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Nulstil alt";
  resetBtn.addEventListener("click", clearChoices);

  navGroup.appendChild(restartBtn);
  navGroup.appendChild(resetBtn);
  card.appendChild(navGroup);

  container.appendChild(card);
}

//Funktion der håndtere brugerens valg og navigere videre eller vise opsummering
function handleChoice(answer, nextIndex) {
  const nextStep = currentScenario.steps[nextIndex];
  const isEnd = nextStep.options.length === 0;
  const consequence = nextStep.consequence || "Scenariet afsluttet.";

  //Gemmer brugerens valg
  const valg = {
    scenarie: currentScenario.title,
    valg: answer,
    konsekvens: isEnd ? consequence : "Valget førte videre."
  };

  userChoices.push(valg);

  if (isEnd) {
    localStorage.setItem("brugerdata", JSON.stringify(userChoices)); //Gem data i browseren
    showSummary(); // Viser oversigt
  } else {
    currentIndex = nextIndex;
    renderStep(); // Viser næste trin
  }
}


// En funktion som viser brugerens valg og konsekvemser i slutningen
function showSummary() {
  container.innerHTML = "";

  const card = document.createElement("div");
  card.className = "scenario-card";

  const heading = document.createElement("h2");
  heading.textContent = "Dine valg og konsekvenser";
  card.appendChild(heading);

  const list = document.createElement("ul");
  const data = JSON.parse(localStorage.getItem("brugerdata")) || [];

  for (let i = 0; i < data.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${data[i].scenarie}</strong><br>
      Valg: ${data[i].valg}<br>
      Konsekvens: ${data[i].konsekvens}
    `;
    list.appendChild(li);
  }

  card.appendChild(list);

  const navGroup = document.createElement("div");
  navGroup.className = "button-group";

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Vælg et nyt scenarie";
  restartBtn.addEventListener("click", showStartScreen);

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Nulstil alt";
  resetBtn.addEventListener("click", clearChoices);

  navGroup.appendChild(restartBtn);
  navGroup.appendChild(resetBtn);
  card.appendChild(navGroup);

  container.appendChild(card);
}

// Funktion til at nulstille data og gå tilbage til start
function clearChoices() {
  localStorage.removeItem("brugerdata");
  userChoices = [];
  showStartScreen();
}

//Viser indlæsnings-animationen og loader siden efter 2 sek
document.addEventListener("DOMContentLoaded", () => {
  container.innerHTML = `
    <div class="loading-screen">
      <p>Intering cyberspace…</p>
      <p>Indlæser datastrømme...</p>
    </div>
  `;
  setTimeout(() => {
    showStartScreen();
  }, 2000);
});
