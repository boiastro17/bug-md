module.exports = {
    name: "demote",
    category: "group",
    usage: "Strip admin privileges from a user.\nExample: `/demote` (reply to an admin)",
    groupOnly: true,
    botDeveloperOnly: false,
    groupAdminOnly: true,

    execute: async (ctx) => {
        if (!ctx.message.reply_to_message) {
            return ctx.reply("❌ Ara~ Ara~! Who's losing their crown today?");
        }

        const user = ctx.message.reply_to_message.from;
        const userName = user.username ? `@${user.username}` : user.first_name || user.id; 

        try {
            await ctx.telegram.promoteChatMember(ctx.chat.id, user.id, {
                can_manage_chat: false,
                can_delete_messages: false,
                can_invite_users: false,
                can_restrict_members: false,
                can_pin_messages: false,
                can_promote_members: false,
                is_anonymous: false
            });

            ctx.reply(`💔 Ara~ Ara~! Poor ${userName}, it seems your reign has ended... Such a shame~ 💜`);
        } catch (error) {
            console.error("Demote Error:", error);
            ctx.reply("❌ Ara~ Ara~! I can't demote this user. Maybe they still have some power left? 💜");
        }
    }
};