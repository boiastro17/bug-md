const axios = require('axios');

module.exports = {
    name: "ip",
    category: "tools",
    usage: ".ip <address>",
    execute: async (ctx) => {
        const ip = ctx.message.text.split(" ").slice(1).join(" ");
        if (!ip) return ctx.reply("❌ Provide an IP address.");

        try {
            const response = await axios.get(`https://ipapi.co/${ip}/json/`);
            const data = response.data;

            if (data.error) return ctx.reply("❌ Invalid IP address.");

            ctx.reply(`📡 *IP Info:*\n🌍 Country: ${data.country_name}\n🏙 City: ${data.city}\n📍 Region: ${data.region}\n📶 ISP: ${data.org}`);
        } catch (error) {
            ctx.reply("❌ Failed to fetch IP details.");
        }
    }
};