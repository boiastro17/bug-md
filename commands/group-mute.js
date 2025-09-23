module.exports = {
    name: "mute",
    category: "group",
    usage: "Silence a noisy member.\nExample: `/mute` (reply to a user)",
    groupOnly: true,
    botDeveloperOnly: false,
    groupAdminOnly: true,

    execute: async (ctx) => {
        if (!ctx.message.reply_to_message) {
            return ctx.reply("❌ Ara~ Ara~! Who needs to be tamed?");
        }

        const user = ctx.message.reply_to_message.from;
        const userName = user.username ? `@${user.username}` : user.first_name || user.id;

        try {
            await ctx.telegram.restrictChatMember(ctx.chat.id, user.id, {
                can_send_messages: false
            });

            ctx.reply(`🔇 Ara~ Ara~! ${userName} has been silenced! A little discipline never hurt, right~? 💜`);
        } catch (error) {
            console.error("Mute Error:", error);
            ctx.reply("❌ Ara~ Ara~! Oh my... They resist my control! Make sure I have admin rights~ 💜");
        }
    }
};