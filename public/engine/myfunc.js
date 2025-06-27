require('../../settings/config')
const axios = require('axios');

async function getRequest(req) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const method = req.method;
    const url = req.originalUrl;
    const query = JSON.stringify(req.query);
    const headers = JSON.stringify(req.headers, null, 2);
    const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
    
    let location = 'Tidak diketahui';
    try {
        const res = await axios.get(`http://ip-api.com/json/${ip}`);
        location = `${res.data.city}, ${res.data.regionName}, ${res.data.country}`;
    } catch {}
    
    return {
        ip,
        userAgent,
        method,
        url,
        query,
        headers,
        location,
        timestamp
    };
};

function escapeMarkdownV2(text) {
    return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

async function sendTele(message) {
const escapedMessage = escapeMarkdownV2(message);
    await axios.post(`https://api.telegram.org/bot${global.token}/sendMessage`, {
        chat_id: `${global.chatid}`,
        text: escapedMessage,
        parse_mode: 'MarkdownV2'
    })
}

module.exports = { 
    getRequest, 
    sendTele 
}
