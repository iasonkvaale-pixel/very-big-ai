const MODEL = "llama-3.1-8b-instant";

async function sendMessage() {
    const input = document.getElementById("user-input");
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
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
            addMessage("bot", "Error: " + JSON.stringify(data));
            return;
        }

        const reply = data.choices[0].message.content;
        addMessage("bot", reply);

    } catch (err) {
        addMessage("bot", "Network error: " + err.message);
    }
}

function addMessage(sender, text) {
    const box = document.getElementById("chat-box");
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<span class="${sender}">${sender}:</span> ${text}`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}
