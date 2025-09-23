const truths = [
    "What turns u on?",
    "What's ur favourite sex position?",
    "Make me feel alive?",
    "Who was your first crush?",
    "What’s one thing you’ve never told anyone?"
];

async function truthCommand(sock, chatId) {
    const randomTruth = truths[Math.floor(Math.random() * truths.length)];
    await sock.sendMessage(chatId, { text: `🔮 Truth: ${randomTruth}` });
}

module.exports = { truthCommand };
