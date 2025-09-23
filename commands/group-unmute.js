module.exports = {
    name: "unmute",
    category: "group",
    usage: "Restore a silenced member's voice.\nExample: `/unmute` (reply to a user)",
    groupOnly: true,
    botDeveloperOnly: false,
    groupAdminOnly: true,

    execute: async (ctx) => {
        if (!ctx.message.reply_to_message) {
            return ctx.reply("❌ Ara~ Ara~! Who do you wish to free from silence?");
        }

        const user = ctx.message.reply_to_message.from;
        const userName = user.username ? `@${user.username}` : user.first_name || user.id;

        try {
            await ctx.telegram.restrictChatMember(ctx.chat.id, user.id, {
                can_send_messages: true
            });

            ctx.reply(`🔊 Ara~ Ara~! ${userName} is free to speak again! But behave, okay~? 💜`);
        } catch (error) {
            console.error("Unmute Error:", error);
            ctx.reply("❌ Ara~ Ara~! Oh my... I can't lift the silence! Make sure I have admin rights~ 💜");
        }
    }
};