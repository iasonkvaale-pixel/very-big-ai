const MODEL = "llama-3.1-8b-instant";

document.getElementById("send").addEventListener("click", sendMessage);

async function sendMessage() {
    const input = document.getElementById("input");
    const text = input.value.trim();
    if (!text) return;

    addMessage("user-message", text);
    input.value = "";

    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: MODEL,
                messages: [{ role: "user", content: text }]
            })
        });

        const data = await response.json();

        if (!data.choices) {
            addMessage("bot-message", "Error: " + JSON.stringify(data));
            return;
        }

        const reply = data.choices[0].message.content;
        addMessage("bot-message", reply);

    } catch (err) {
        addMessage("bot-message", "Network error: " + err.message);
    }
}

function addMessage(className, text) {
    const box = document.getElementById("messages");

    const p = document.createElement("p");
    p.className = className;
    p.textContent = text;

    box.appendChild(p);
    box.scrollTop = box.scrollHeight;
}
