module.exports = {
    name: "promote",
    category: "group",
    usage: "Grant admin powers to a member.\nExample: `/promote` (reply to a user)",
    groupOnly: true,
    botDeveloperOnly: false,
    groupAdminOnly: true,

    execute: async (ctx) => {
        if (!ctx.message.reply_to_message) {
            return ctx.reply("❌ Ara~ Ara~! Who shall I promote, darling?");
        }

        const user = ctx.message.reply_to_message.from;
        const userName = user.username ? `@${user.username}` : user.first_name || user.id; 

        try {
            await ctx.telegram.promoteChatMember(ctx.chat.id, user.id, {
                can_manage_chat: true,
                can_delete_messages: true,
                can_invite_users: true,
                can_restrict_members: true,
                can_pin_messages: true,
                can_promote_members: false,
                is_anonymous: false
            });

            ctx.reply(`💜 Ara~ Ara~! A new leader has emerged! Welcome, my dear ${userName}, to the ranks of the elites.`);
        } catch (error) {
            console.error("Promote Error:", error);
            ctx.reply("❌ Ara~ Ara~! I can't promote this user. Make sure I have the right powers, darling~ 💜");
        }
    }
};