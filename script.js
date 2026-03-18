const input = document.getElementById("input");
const send = document.getElementById("send");
const messages = document.getElementById("messages");

let brukernavn = "";

// Sjekk at alt finnes
if (!input || !send || !messages) {
  console.error("Feil: Fant ikke #input, #send eller #messages i HTML.");
}

// Lager melding i chatten
function addMessage(message, sender) {
  const msg = document.createElement("p");
  msg.textContent = message;

  if (sender === "bot") {
    msg.className = "bot-message";
  } else {
    msg.className = "user-message";
  }

  messages.appendChild(msg);

  // Scroll helt ned
  messages.scrollTop = messages.scrollHeight;
}

// Bot-svar
function getBotResponse(originalTekst) {
  const tekst = originalTekst.toLowerCase().trim();

  if (tekst.includes("jeg heter")) {
    brukernavn = originalTekst.replace(/jeg heter/i, "").trim();

    if (brukernavn === "") {
      return "Du må skrive navnet ditt etter 'jeg heter' 😄";
    }

    return "Hyggelig å møte deg, " + brukernavn + " 👋";
  }

  if (tekst.includes("hvem er jeg")) {
    if (brukernavn !== "") {
      return "Du heter " + brukernavn + " 😊";
    } else {
      return "Jeg vet ikke navnet ditt ennå!";
    }
  }

  if (tekst.includes("hei")) {
    return "Hei på deg! 👋";
  }

  if (tekst.includes("hva heter du")) {
    return "Jeg er en chatbot! 🤖";
  }

  if (tekst.includes("hallo")) {
    return "Hallo hallo 😄";
  }

  if (tekst.includes("hvordan går det")) {
    return "Det går veldig bra 😎 Hva med deg?";
  }

  if (tekst.includes("bra")) {
    return "Nice 😎";
  }

  if (tekst.includes("dårlig")) {
    return "Rip 😭 håper det blir bedre snart";
  }

  if (tekst.includes("lange flate bæller")) {
    return "╰(*°▽°*)╯";
  }

  if (tekst.includes(":)")) {
    return "😏";
  }

  if (tekst.includes("lol")) {
    return "😂";
  }

  if (tekst.includes("ha det")) {
    return "Snakkes 👋";
  }

  return "NEI!";
}

// Sender melding
function sendMessage() {
  const originalTekst = input.value.trim();

  if (originalTekst === "") return;

  // Vis brukerens melding
  addMessage("Du: " + originalTekst, "user");

  // Få bot-svar
  const botSvar = getBotResponse(originalTekst);

  // Litt forsinkelse så det føles mer ekte
  setTimeout(() => {
    addMessage(botSvar, "bot");
  }, 300);

  // Tøm input
  input.value = "";
  input.focus();
}

// Klikk på knapp
send.addEventListener("click", sendMessage);

// Enter = send
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});
