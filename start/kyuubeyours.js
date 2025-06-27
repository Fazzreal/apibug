
/*─────────────────────────────────────────
  GitHub   : https://github.com/kiuur    
  YouTube  : https://youtube.com/@kyuurzy
  Rest API : https://laurine.site        
  Telegram : https://kyuucode.t.me       
──────────────────────────────────────────*/

const fs = require('fs');
const chalk = require("chalk");
const util = require("util");
const moment = require("moment-timezone");
const path = require("path")
const { fromBuffer } = require('file-type');

const { 
    downloadContentFromMessage, 
    emitGroupParticipantsUpdate,
    emitGroupUpdate, 
    generateWAMessageContent,
    generateWAMessage, 
    makeInMemoryStore, 
    prepareWAMessageMedia, 
    generateWAMessageFromContent, 
    MediaType, 
    areJidsSameUser,
    WAMessageStatus,
    downloadAndSaveMediaMessage,
    AuthenticationState,
    GroupMetadata,
    initInMemoryKeyStore, 
    getContentType,
    MiscMessageGenerationOptions, 
    useSingleFileAuthState,
    BufferJSON, 
    WAMessageProto, 
    MessageOptions,
    WAFlag, WANode,
    WAMetric,
    ChatModification,
    MessageTypeProto,
    WALocationMessage, 
    ReconnectMode,
    WAContextInfo,
    proto,
    WAGroupMetadata,
    ProxyAgent,
    waChatKey,
    MimetypeMap,
    MediaPathMap,
    WAContactMessage, 
    WAContactsArrayMessage, 
    WAGroupInviteMessage,
    WATextMessage,
    WAMessageContent, 
    WAMessage,
    BaileysError,
    WA_MESSAGE_STATUS_TYPE,
    MediaConnInfo, 
    URL_REGEX,
    WAUrlInfo,
    WA_DEFAULT_EPHEMERAL,
    WAMediaUpload, 
    mentionedJid,
    processTime,
    Browser,
    MessageType,
    Presence,
    WA_MESSAGE_STUB_TYPES, 
    Mimetype,
    relayWAMessage, 
    Browsers,
    GroupSettingChange,
    DisconnectReason,
    WASocket,
    getStream, WAProto,
    isBaileys, 
    AnyMessageContent,
    fetchLatestBaileysVersion,
    templateMessage, 
    InteractiveMessage,
    Header
} = require('@whiskeysockets/baileys')

module.exports = client = async (client, m, chatUpdate, store) => {
    try {
        const body = (
            m.mtype === "conversation" ? m.message.conversation :
            m.mtype === "imageMessage" ? m.message.imageMessage.caption :
            m.mtype === "videoMessage" ? m.message.videoMessage.caption :
            m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
            m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
            m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
            m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
            m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
            m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
            m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : "");

        const kontributor = JSON.parse(fs.readFileSync('./start/lib/database/owner.json'));
        const contacts = JSON.parse(fs.readFileSync("./start/lib/database/contacts.json"))
        
        const sender = m.key.fromMe ? client.user.id.split(":")[0] + "@s.whatsapp.net" || client.user.id
: m.key.participant || m.key.remoteJid;
        
        const senderNumber = sender.split('@')[0];
        const budy = (typeof m.text === 'string' ? m.text : '');
        const prefa = ["", "!", ".", ",", "🐤", "🗿"];

        const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
        const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
        const from = m.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        
        const botNumber = await client.decodeJid(client.user.id);
        const Access = [botNumber, ...kontributor].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const command2 = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const text = q = args.join(" ");
        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);
        const isMedia = /image|video|sticker|audio/.test(mime);
        
        if (m.message) {
            console.log('\x1b[30m--------------------\x1b[0m');
            console.log(chalk.bgHex("#4a69bd").bold(`▢ New Message`));
            console.log(
                chalk.bgHex("#ffffff").black(
                    `   ▢ Tanggal: ${new Date().toLocaleString()} \n` +
                    `   ▢ Pesan: ${body} \n` +
                    `   ▢ Pengirim: ${pushname} \n` +
                    `   ▢ Mtype: ${m.mtype}`
                )
            );
            
            if (m.isGroup) {
                console.log(
                    chalk.bgHex("#ffffff").black(
                        `   ▢ GroupJid: ${m.chat}`
                    )
                );
            }
            console.log();
        }
        
        switch (command) {
        //isi fitur bebas mau apa aja
            default:
        }
    } catch (err) {
        console.log(require("util").format(err));
    }
};

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})