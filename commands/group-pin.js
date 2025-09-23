module.exports = {
    name: "pin",
    category: "group",
    usage: "Pin a message to the chat.\nExample: `/pin` (reply to a message)",
    groupOnly: true,
    botDeveloperOnly: false,
    groupAdminOnly: true,
    execute: async (ctx) => {
        if (!ctx.message.reply_to_message) return ctx.reply("❌ *Ara~ Ara~* Which message shall I make shine, darling?");

        try {
            await ctx.telegram.pinChatMessage(ctx.chat.id, ctx.message.reply_to_message.message_id);
            ctx.reply("📌 *Ara~ Ara~!* This message has been marked as important~ 💜");
        } catch (error) {
            ctx.reply("❌ *Ara~ Ara~!* Oops~ It seems I don't have permission to pin messages, darling.");
        }
    }
};