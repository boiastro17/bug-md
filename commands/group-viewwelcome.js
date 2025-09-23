const fs = require("fs");
        const path = require("path");
module.exports = {
    name: "viewwelcome",
    category: "group",
    usage: "View the current welcome message. Example: `/viewwelcome`",
    groupOnly: true,
    execute: async (ctx) => {
        const groupId = ctx.chat.id.toString();
       
        const welcomeFile = path.join(__dirname, "../welcome.json");

        let welcomeMessages = fs.existsSync(welcomeFile) ? JSON.parse(fs.readFileSync(welcomeFile)) : {};


        if (!welcomeMessages[groupId]) {
            return ctx.reply("⚠️ *No welcome message is set for this group, Master!*");
        }

        ctx.reply(`💜 *Current Welcome Message:*\n\n"${welcomeMessages[groupId]}"`);
    }
};