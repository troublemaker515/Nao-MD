// Don't delete this credit!!!
// Script by ShirokamiRyzen

import { snapsave } from '@bochilteam/scraper'

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw 'Please provide a Instagram video URL';
    const sender = m.sender.split('@')[0];
    const url = args[0];

    m.reply(wait);

    try {
        const data = await snapsave(url);
        
        // Find the HD video
        let video = data.results[0];

        if (video) {
            const videoBuffer = await fetch(video.url).then(res => res.buffer());
            const caption = `Ini kak videonya @${sender}`;

            await conn.sendMessage(
                m.chat, {
                    video: videoBuffer,
                    mimetype: "video/mp4",
                    fileName: `video.mp4`,
                    caption: caption,
                    mentions: [m.sender],
                }, {
                    quoted: m
                }
            );
        } else {
            throw 'No available video found';
        }
    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `An error occurred: ${error}`, m);
    }
}

handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(ig(dl)?)$/i
handler.limit = true
handler.register = true

export default handler