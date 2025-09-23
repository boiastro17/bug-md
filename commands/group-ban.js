module.exports = {
    name: "ban",
    category: "group",
    usage: "Ban a user permanently from the group.\nExample: `/ban @username`",
    groupOnly: true,
    groupAdminOnly: true,
    execute: async (ctx) => {
        const user = ctx.message.reply_to_message?.from;
        if (!user) return ctx.reply("❌ Ara~ Ara~! Who shall I banish, darling?");

        try {
            await ctx.telegram.banChatMember(ctx.chat.id, user.id);
            ctx.reply(`🛑 Ara~ Ara~! ${user.first_name} has been exiled from this realm! 💜`);
        } catch (error) {
            ctx.reply("❌ Oh my~ I lack permission to ban, darling~");
        }
    }
};