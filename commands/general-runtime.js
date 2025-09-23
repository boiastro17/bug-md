const { exec } = require("child_process");
const path = require("path");

module.exports = {
    name: "runtime",
    category: "system",
    usage: "Check bot uptime, CPU usage, RAM usage, and Bot Directory Disk space.\nExample: `/runtime`",
    groupOnly: false,
    botDeveloperOnly: false,
    groupAdminOnly: false,
    execute: async (ctx) => {
        try {
           
            let uptime = process.uptime();
            let hours = Math.floor(uptime / 3600);
            let minutes = Math.floor((uptime % 3600) / 60);
            let seconds = Math.floor(uptime % 60);
            let formattedUptime = `${hours}h ${minutes}m ${seconds}s`;

          
            let cpuUsage = process.cpuUsage();
            let cpuPercent = ((cpuUsage.user + cpuUsage.system) / 1000000).toFixed(2); 

            let memoryUsage = process.memoryUsage();
            let rss = (memoryUsage.rss / 1024 / 1024).toFixed(2); 
            let heapUsed = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2); 
            let totalUsedMemory = (parseFloat(rss) + parseFloat(heapUsed)).toFixed(2); 

        
            let botDirectory = path.resolve(".");
            exec(`du -sh ${botDirectory} | awk '{print $1}'`, async (error, stdout) => {
                let botDiskUsage = error ? "N/A" : stdout.trim();

          
                let caption = `📊 *System Status*\n\n` +
                    `*⏳ Akeno Himejima Uptime:* ${formattedUptime}\n` +
                    `*💻 Akeno Himejima CPU Usage:* ${cpuPercent}%\n` +
                    `*🖥️ Akeno Himejima RAM Usage:* ${totalUsedMemory} MB\n` +
                    `   ├ 📌 RSS: ${rss} MB\n` +
                    `   └ 📌 Heap: ${heapUsed} MB\n` +
                    `*📂 Akeno Himejima Disk Usage:* ${botDiskUsage}`;

                await ctx.replyWithPhoto(
                    { url: "https://files.catbox.moe/rg8zw5.jpg" },
                    { caption }
                );
            });

        } catch (error) {
            console.error("Error fetching system stats:", error);
            await ctx.reply("❌ Failed to retrieve system status.");
        }
    }
};