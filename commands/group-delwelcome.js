const fs = require("fs");
const path = require("path");

const welcomeFile = path.join(__dirname, "../welcome.json");
module.exports = {
    name: "delwelcome",
    category: "group",
    usage: "Delete the welcome message. Example: `/delwelcome`",
    groupOnly: true,
    groupAdminOnly: true,
    execute: async (ctx) => {
        const groupId = ctx.chat.id.toString();
        
        let welcomeMessages = fs.existsSync(welcomeFile) ? JSON.parse(fs.readFileSync(welcomeFile)) : {};

        if (!welcomeMessages[groupId]) return ctx.reply("⚠️ *No welcome message found for this group, Master!*");

        delete welcomeMessages[groupId];
        fs.writeFileSync(welcomeFile, JSON.stringify(welcomeMessages, null, 2));

        ctx.reply("💜 *Welcome message has been deleted, Master!*");
    }
};