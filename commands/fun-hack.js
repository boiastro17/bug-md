const fs = require('fs');
const path = require('path');

module.exports = {
    name: "hack",
    category: "fun",
    usage: ".hack <target>\nSimulates a quick hacking process (fake).",
    
    execute: async (ctx) => {
        const target = ctx.message.text.split(' ').slice(1).join(' ') || ctx.from.username || "unknown target";

        const fakeProcess = [
            `🛠 Initiating breach on *${target}*...`,
            `🔍 Establishing secure connection...`,
            `🔑 Bypassing security protocols...`,
            `💾 Extracting sensitive data...`,
            `⚠️ Firewall detected! Attempting to override...`,
            `✅ Access to *${target}* granted! Retrieving information...`,
            `📂 Packing data and encrypting files...`,
            `📡 Sending extracted files to remote server...`,
        ];

        let sentMessage = await ctx.replyWithMarkdown(fakeProcess[0]);

        for (let i = 1; i < fakeProcess.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            await ctx.telegram.editMessageText(ctx.chat.id, sentMessage.message_id, undefined, fakeProcess[i], { parse_mode: "Markdown" });
        }

        const fakeData = Array.from({ length: 100 }, () =>
            Math.random().toString(16).substring(2, 10).toUpperCase()
        ).join('\n');

        const filePath = path.join(__dirname, `hacked_data_${Date.now()}.txt`);
        fs.writeFileSync(filePath, fakeData);

        await new Promise(resolve => setTimeout(resolve, 2000));
        await ctx.telegram.editMessageText(ctx.chat.id, sentMessage.message_id, undefined, `🕵️ Hack complete! *${target}'s* data extracted successfully.`, { parse_mode: "Markdown" });

        await ctx.replyWithDocument({ source: filePath }, {
            caption: `📁 *Classified Information* extracted from *${target}*.\n\n🔐 *Status:* Encrypted & Ready.`,
            parse_mode: "Markdown"
        });

        fs.unlinkSync(filePath);
    }
};