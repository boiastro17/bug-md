const fs = require("fs");
const path = require("path");

const warnFile = path.join(__dirname, "../warnings.json");

// Load warnings data
let warnings = fs.existsSync(warnFile) ? JSON.parse(fs.readFileSync(warnFile)) : {};

module.exports = {
    name: "resetwarns",
    category: "group",
    usage: "Reset warnings for a user. Example: `/resetwarns` (reply to user)",
    groupOnly: true,
    groupAdminOnly: true,
    execute: async (ctx) => {
        const reply = ctx.message.reply_to_message;
        if (!reply) return ctx.reply("⚠️ *Reply to a user’s message to reset their warnings, Master!*");

        const groupId = ctx.chat.id.toString();
        const userId = reply.from.id.toString();
        const userName = reply.from.first_name;

        if (!warnings[groupId] || !warnings[groupId][userId]) {
            return ctx.reply(`💜 *${userName} has no warnings, Master!*`);
        }

        delete warnings[groupId][userId];
        fs.writeFileSync(warnFile, JSON.stringify(warnings, null, 2));

        ctx.reply(`💜 *Warnings for ${userName} have been reset, Master!*`);
    }
};