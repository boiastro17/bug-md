module.exports = {
    name: "ping",
    category: "general",
    usage: "Check 𝙰𝙺𝙴𝙽𝙾 𝙷𝙸𝙼𝙴𝙹𝙸𝙼𝙰💜's response speed.\nExample: `/ping`",
    groupOnly: false,
    botDeveloperOnly: false,
    groupAdminOnly: false,
    execute: async (ctx) => {
        const start = Date.now();
        let sentMessage = await ctx.replyWithPhoto(
            { url: "https://files.catbox.moe/rg8zw5.jpg" },
            { caption: "💜 *Ara~ Ara~* Let me check~..." }
        );

        const latency = Date.now() - start;

        await ctx.telegram.editMessageCaption(
            ctx.chat.id,
            sentMessage.message_id,
            undefined,
            `✨ *𝙰𝙺𝙴𝙽𝙾 𝙷𝙸𝙼𝙴𝙹𝙸𝙼𝙰💜 is faster than lightning!* ⚡\n📶 Response time: *${latency}ms*`
        );
    }
};