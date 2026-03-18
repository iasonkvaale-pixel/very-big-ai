const input = document.querySelector("#input");
const send = document.querySelector("#send");
const chatbot = document.querySelector("#chatbot");

send.addEventListener("click", () => {
  const tekst = input.value.toLowerCase();

  if (tekst.includes("hei")) {
    chatbot.textContent = "Hei på deg! 👋";
  } else if (tekst.includes("hva heter du")) {
    chatbot.textContent = "Jeg er en hjemmelaget chatbot 🤖";
  } else {
    chatbot.textContent = "Jeg skjønner ikke helt ennå 😅";
  }
});