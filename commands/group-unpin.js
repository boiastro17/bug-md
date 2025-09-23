module.exports = {
    name: "unpin",
    category: "group",
    usage: "Unpin the most recent pinned message.\nExample: `/unpin`",
    groupOnly: true,
    botDeveloperOnly: false,
    groupAdminOnly: true,
    execute: async (ctx) => {
        try {
            await ctx.telegram.unpinChatMessage(ctx.chat.id);
            ctx.reply("📍 *Ara~ Ara~!* The pinned message has been removed~ 💜");
        } catch (error) {
            ctx.reply("❌ *Ara~ Ara~!* Hmm... It seems I lack the power to unpin messages. Check my permissions, darling~");
        }
    }
};