async function githubCommand(sock, chatId) {
    const repoInfo = `*CRISPYSTORM-BUG-V1*

*SCRIPT ON SALE*
CONTACT OWNER FOR DEALS
*📢 Official NUMB:*
https://wa.me/263719806064


I Hope you liked it

_Star ⭐ the repository if you like the bot!_`;

    try {
        await sock.sendMessage(chatId, {
            text: repoInfo,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363330180223606@newsletter',
                    newsletterName: 'CRISPYSTORM-XMD',
                    serverMessageId: -1
                }
            }
        });
    } catch (error) {
        console.error('Error in github command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Error fetching repository information.' 
        });
    }
}

module.exports = githubCommand; 