const fs = require("fs");
const path = require("path");

const warnFile = path.join(__dirname, "../warnings.json");

let warnings = fs.existsSync(warnFile) ? JSON.parse(fs.readFileSync(warnFile)) : {};

module.exports = {
    name: "warn",
    category: "group",
    usage: "Warn a user. Example: `/warn` (reply to user)",
    groupOnly: true,
    groupAdminOnly: true,
    execute: async (ctx) => {
        const reply = ctx.message.reply_to_message;
        if (!reply) return ctx.reply("⚠️ *Reply to a user’s message to warn them, Master!*");

        const groupId = ctx.chat.id.toString();
        const userId = reply.from.id.toString();
        const userName = reply.from.first_name;

        if (!warnings[groupId]) warnings[groupId] = {};
        if (!warnings[groupId][userId]) warnings[groupId][userId] = 0;

        warnings[groupId][userId]++;

        fs.writeFileSync(warnFile, JSON.stringify(warnings, null, 2));

        ctx.reply(`💜 *Warning issued! ${userName} now has ${warnings[groupId][userId]} warning(s).*`);

        if (warnings[groupId][userId] >= 3) {
            try {
                await ctx.kickChatMember(userId);
                ctx.reply(`🔥 *Enough is enough! ${userName} has been removed from the group.*`);
                delete warnings[groupId][userId]; 
                fs.writeFileSync(warnFile, JSON.stringify(warnings, null, 2));
            } catch {
                ctx.reply("🚫 *I need admin permissions to kick users, Master!*");
            }
        }
    }
};