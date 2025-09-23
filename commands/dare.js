const dares = [
    "Send me ur nude!",
    "Tell me ur depth secret.",
    "Lets have a sex chat.",
    "Send a selfie doing a funny face.",
    "Lets date."
];

async function dareCommand(sock, chatId) {
    const randomDare = dares[Math.floor(Math.random() * dares.length)];
    await sock.sendMessage(chatId, { text: `🔥 Dare: ${randomDare}` });
}

module.exports = { dareCommand };
