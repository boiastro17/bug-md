module.exports = {
    name: "unban",
    category: "group",
    usage: "Unban a previously banned user.\nExample: `/unban <user_id>`",
    groupOnly: true,
    groupAdminOnly: true,

    execute: async (ctx) => {
        const args = ctx.message.text.split(" ").slice(1);
        if (args.length === 0) {
            return ctx.reply("❌ *Ara~ Ara~!* Provide a user ID to unban, darling~ 💜");
        }

        const userId = args[0];

        try {
            await ctx.telegram.unbanChatMember(ctx.chat.id, userId, { only_if_banned: true });

            ctx.replyWithMarkdownV2(`✨ *Ara~ Ara~!* Welcome back, dear [${userId}](tg://user?id=${userId})\! Try not to cause trouble this time~ 💜`);
        } catch (error) {
            console.error("Unban Error:", error);
            ctx.reply("❌ *Oh my~* I couldn't unban them, darling~ Make sure the ID is correct~ 💜");
        }
    }
};