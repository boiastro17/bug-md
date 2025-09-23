module.exports = {
    name: "kick",
    category: "group",
    usage: "Banish a user from the group.\nExample: `/kick` (reply to a user)",
    groupOnly: true,
    botDeveloperOnly: false,
    groupAdminOnly: true,

    execute: async (ctx) => {
        if (!ctx.message.reply_to_message) {
            return ctx.reply("❌ Ara~ Ara~! Who dares to challenge my authority?");
        }

        const user = ctx.message.reply_to_message.from;
        const userName = user.username ? `@${user.username}` : user.first_name || "Unknown Warrior"; // Fallback name

        try {
            await ctx.telegram.banChatMember(ctx.chat.id, user.id);
            ctx.reply(`⚡ Ara~ Ara~! Divine punishment has been delivered! ${userName} has been erased from existence! 💜`);
        } catch (error) {
            console.error("Kick Error:", error);
            ctx.reply("❌ Ara~ Ara~! Hmm... This one is resistant to my powers. Make sure I'm an admin, darling~ 💜");
        }
    }
};