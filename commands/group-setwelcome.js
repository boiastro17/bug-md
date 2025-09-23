const fs = require("fs");
const path = require("path");

const welcomeFile = path.join(__dirname, "../welcome.json");

// Load welcome messages
let welcomeMessages = fs.existsSync(welcomeFile) ? JSON.parse(fs.readFileSync(welcomeFile)) : {};

module.exports = {
    name: "setwelcome",
    category: "group",
    usage: "Set a custom welcome message. Example: `/setwelcome Welcome to the group!`",
    groupOnly: true,
    groupAdminOnly: true,
    execute: async (ctx) => {
        const groupId = ctx.chat.id.toString();
        const message = ctx.message.text.split(" ").slice(1).join(" ");

        if (!message) return ctx.reply("⚠️ *Provide a welcome message, Master!*");

        welcomeMessages[groupId] = message;
        fs.writeFileSync(welcomeFile, JSON.stringify(welcomeMessages, null, 2));

        ctx.reply(`💜 *Welcome message set successfully!*`);
    }
};