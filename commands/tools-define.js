const axios = require('axios');

module.exports = {
    name: "define",
    category: "tools",
    usage: ".define <word>",
    execute: async (ctx) => {
        const word = ctx.message.text.split(" ").slice(1).join(" ");
        if (!word) return ctx.reply("❌ Provide a word to define.");

        try {
            const response = await axios.get(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(word)}`);
            const definition = response.data.list[0];

            if (!definition) return ctx.reply("❌ No definition found.");

            ctx.reply(`📖 *${word}*\n\n📝 ${definition.definition}\n\n`);
        } catch (error) {
            console.error("Define Command Error:", error);
            ctx.reply("❌ Failed to fetch definition.");
        }
    }
};