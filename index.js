//{for testing
const { Telegraf } = require('telegraf')
    // const bot = new Telegraf('1129048108:AAG0hrQhTwqNHyed5159EyTpk0TeM4E9q0E')
const bot = new Telegraf('927312041:AAHS_s1hYTrPup8zO4tyKaS-Vwh9x8Px_ok')
    //}
    //{for heroku
const { Composer } = require('micro-bot')
    // const bot = new Composer
    //}
const { subjectsData, studyMaterials } = require('./data')


bot.start((ctx) => {
    ctx.reply(`Hi ${ctx.message.chat.first_name} ${ctx.message.chat.last_name}
Send me a Hi`)
})

// bot.action('lcd',(ctx) =>{
//     ctx.reply('hai  /sus is here')     
// })

bot.on('sticker', (ctx) => {
    ctx.reply("Sorry!!!\nthis bot can't perform the this command please send a Hi \nWe will update soon")

})

const codeToName = code => {
    switch (code) {
        case 'ce':
            return 'CIVIL ENGINEERING'
        case 'mech':
            return 'MECHANICAL ENGINEERING'
        case 'eee':
            return 'ELECTRICAL & ELECTRONICS ENGINEERING'
        case 'ece':
            return 'ELECTRONICS & COMMUNICATION ENGINEERING'
        case 'cse':
            return 'COMPUTER SCIENCE AND ENGINEERING'
        case 'ce':
            return 'CHEMICAL ENGINEERING'
        case 'archi':
            return 'ARCHITECTURE'
        default:
            return 'UNKNOWN'
    }
}
const sendSemesters = (code, ctx) => {
    ctx.editMessageText(`*${codeToName(code)}*\nSelect your Semester`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "SEMESTER 1", callback_data: code + "_S1" }, { text: "SEMESTER 2", callback_data: code + "_S2" }],
                [{ text: "SEMESTER 3", callback_data: code + "_S3" }, { text: "SEMESTER 4", callback_data: code + "_S4" }],
                [{ text: "SEMESTER 5", callback_data: code + "_S5" }, { text: "SEMESTER 6", callback_data: code + "_S6" }],
                [{ text: "SEMESTER 7", callback_data: code + "_S7" }, { text: "SEMESTER 8", callback_data: code + "_S8" }],
                [{ text: "MAIN MENU", callback_data: "menu" }],
            ]
        },
        parse_mode: "MarkdownV2"
    })
}

const sendSubjectList = (code, ctx) => {
    let dipt = code.split('_')[0]
    let sem = code.split('_')[1]
    let subjects = subjectsData[dipt][sem] || []
    let inline_keyboard = subjects.map(suject => {
        return [{ text: '📘 ' + suject.code + ' - ' + suject.name, callback_data: 'sub_' + suject.code + '_' + code }]
    })

    inline_keyboard.push([{ text: "◀️ Back", callback_data: dipt }])

    ctx.editMessageText(`*${codeToName(dipt)}* \\- ${sem}\nSelect your Subject`, {
        reply_markup: {
            inline_keyboard: inline_keyboard
        },
        parse_mode: "MarkdownV2"
    })
}

const sendSubjectDetails = (code, ctx) => {
    let subCode = code.split('_')[1]
    let dipt = code.split('_')[2]
    let sem = code.split('_')[3]

    if (studyMaterials[subCode]) {
        ctx.editMessageText(`*${codeToName(dipt)}* \\- ${sem}\n*${subCode}* \\- ${studyMaterials[subCode].name}\nSelect medule`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Module 1", callback_data: 'mod_' + subCode + '_1_' + dipt + '_' + sem }, { text: "Module 2", callback_data: 'mod_' + subCode + '_2_' + dipt + '_' + sem }],
                    [{ text: "Module 3", callback_data: 'mod_' + subCode + '_3_' + dipt + '_' + sem }, { text: "Module 4", callback_data: 'mod_' + subCode + '_4_' + dipt + '_' + sem }],
                    [{ text: "Module 5", callback_data: 'mod_' + subCode + '_5_' + dipt + '_' + sem }, { text: "◀️ Back", callback_data: dipt + '_' + sem }]
                ]
            },
            parse_mode: "MarkdownV2"
        })
    }
}

const sendModuleDetails = (code, ctx) => {
    let subCode = code.split('_')[1]
    let module = code.split('_')[2]
    let dipt = code.split('_')[3]
    let sem = code.split('_')[4]

    if (studyMaterials[subCode]) {
        ctx.editMessageText(`*${codeToName(dipt)}* \\- ${sem}\n*${subCode}* \\- ${studyMaterials[subCode].name}\nMedule ${module}\nSelect your type`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "◀️ Back", callback_data: 'sub_' + subCode + '_' + dipt + '_' + sem }]
                ]
            },
            parse_mode: "MarkdownV2"
        })
    }
}


// bot.hears('bug',(ctx) =>{
//     ctx.reply('Got bug!!!!!   https://wa.me/918606683287?text=Hii+Karthik+I+Found+a+bug+in+bot!!!! \n https://t.me/918606683287')
// })


//Hi
bot.hears(['Hi', 'hi', 'Hii', 'hii', 'hai', 'Hai'], (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Click here to select your department', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "CIVIL", callback_data: "ce" }, { text: "MECHANICAL", callback_data: "mech" }],
                [{ text: "ELECTRICAL & ELECTRONICS", callback_data: "eee" }, { text: "ELECTRONICS & COMMUNICATION", callback_data: "ece" }],
                [{ text: "COMPUTER SCIENCE", callback_data: "cse" }, { text: "CHEMICAL", callback_data: "ce" }],
                [{ text: "ARCHITECTURE", callback_data: "archi" }]
            ]
        }
    })
})

/*menu*/
bot.action('menu', (ctx) => {
    ctx.editMessageText('Click here to select you department', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "CIVIL", callback_data: "ce" }, { text: "MECHANICAL", callback_data: "mech" }],
                [{ text: "ELECTRICAL & ELECTRONICS", callback_data: "eee" }, { text: "ELECTRONICS & COMMUNICATION", callback_data: "ece" }],
                [{ text: "COMPUTER SCIENCE", callback_data: "cse" }, { text: "CHEMICAL", callback_data: "ce" }],
                [{ text: "ARCHITECTURE", callback_data: "archi" }]
            ]
        }
    })
})

bot.command('ContactAdmin', (ctx) => {
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Got bug!!!! Contact Admin ', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Connect Whatsapp", url: "https://wa.me/918606683287" }],

            ]
        }
    })

})

bot.on('callback_query', (ctx) => {
    let qData = ctx.callbackQuery.data
    if (qData.startsWith('ce_') ||
        qData.startsWith('mech_') ||
        qData.startsWith('eee_') ||
        qData.startsWith('ece_') ||
        qData.startsWith('cse_') ||
        qData.startsWith('ce_') ||
        qData.startsWith('archi_')
    ) {
        sendSubjectList(qData, ctx)
    }
    if (qData == 'ce' ||
        qData == 'mech' ||
        qData == 'eee' ||
        qData == 'ece' ||
        qData == 'cse' ||
        qData == 'ce' ||
        qData == 'archi'
    ) {
        sendSemesters(qData, ctx)
    }
    if (qData.startsWith('sub_')) {
        sendSubjectDetails(qData, ctx)
    }
    if (qData.startsWith('mod_')) {
        sendModuleDetails(qData, ctx)
    }

    // Explicit usage
    ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

    // Using context shortcut
    ctx.answerCbQuery()
})


//ecs3ssd
bot.action('ssd', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'SOLID STATE DEVICES\n\nMODULE 1 IMPORTANT VIDEO LINKS\n1. https://rb.gy/xanoko\n2. https://rb.gy/d28di4\n3. https://rb.gy/j97e8j\n4. https://rb.gy/coniys\n5. https://rb.gy/cgagnq\n6. https://rb.gy/6qikn3\n7. https://rb.gy/hqmx8s\n8. https://rb.gy/wtnith\n9. https://rb.gy/we1jb2\nYou can directely download TEXTBOOK by taping below\nTEXTBOOK=/SSDTXT\nNOTE\nModule1\n  /SSD11\n  /SSD12\nModule2\n  /SSD21\n  /SSD22\n  /SSD23\nModule3\n  /SSD31')
})

bot.command('SSDTXT', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file', )
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAIClV99tyjS1GN4h8x-G0LcoYpq4k0QAAJMAQAC4rjxV3UhsV8XHsy5GwQ', { "reply_to_message_id": ctx.message.message_id }
    )
})
bot.command('SSD11', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file', )
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAPCX4slfktf8bu2_3pUPZ2EStH-VcAAAkUBAAJ1m_FX9dxVfIIsrfgbBA', { "reply_to_message_id": ctx.message.message_id }
    )
})

bot.command('SSD12', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file', )
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAIC71-AgyGmBP1kcF-PK07-HYkDN55UAAJFAQACdZvxVz6nW25u8mE-GwQ', { "reply_to_message_id": ctx.message.message_id }
    )
})

bot.command('SSD21', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file', )
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAPFX4slzpeSS5tp0Jj35kRF5YoohwsAAhoBAAI6oghUKCN7Y8APq60bBA', { "reply_to_message_id": ctx.message.message_id }
    )
})

bot.command('SSD22', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file', )
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAP3X4vyS2JcnSzJa4jNNnA8L0Riy8cAAgwCAAK_LmFU6NGo65pHpoAbBA', { "reply_to_message_id": ctx.message.message_id }
    )
})
bot.command('SSD23', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file', )
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAPZX4vvbGrvg3mz030aik30S6MYVPoAApMBAAJQ7GBUffPgmrswH10bBA', { "reply_to_message_id": ctx.message.message_id }
    )
})

bot.command('SSD31', (ctx) => {
        ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file', )
        ctx.telegram.sendDocument(ctx.chat.id,
            'BQACAgUAAxkBAAIBF1-L90csrUVrpCEmozPAdRIXZ5FwAAINAgACvy5hVKNqUCtYSPfhGwQ', { "reply_to_message_id": ctx.message.message_id }
        )
    })
    //LCD ECE
bot.action('lcd', (ctx) => {
        ctx.telegram.sendMessage(ctx.chat.id, 'LOGIC CIRCUIT DESIGN\nIMPORTANT VIDEO LINKS\n\n1.https://youtu.be/ai59DBrifRM\n2.https://youtu.be/0RR0ZGXHURI\n2.https://youtu.be/0RR0ZGXHURI\n4.https://youtu.be/Q7kMyCn_wmg\n5.https://youtu.be/7onqsel1D-U\n6.https://youtu.be/bfvnAm-ItD4\n7.https://youtu.be/pVih5FSNdks\n8.https://youtu.be/rQHsmImLXHY\n9.https://youtu.be/jKG62CNCzy0\n10.https://youtu.be/oe5zUWHuFRY\n11.https://youtu.be/QpUcG0lsIGg')
    })
    //NT ECE
bot.action('nt', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, '\nNETWORK THEORY\nYou can directely download TEXTBOOK by taping below\nTEXTBOOK=/NTTXT1  /NTTXT2')
})
bot.command('NTTXT1', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file', )
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAMPX4RNT_9sgRut9VZb1h3ahVj49qkAAlUBAAKPCRBUzhQM1jCx960bBA', { "reply_to_message_id": ctx.message.message_id }
    )
})

bot.command('NTTXT2', (ctx) => {
        ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file', )
        ctx.telegram.sendDocument(ctx.chat.id,
            'BQACAgUAAxkBAAMQX4RNavmoNJqewuqccVc9lB7XYAMAAusBAAKnmyFUWp71sXdDpR8bBA', { "reply_to_message_id": ctx.message.message_id }
        )
    })
    //PE ECE
bot.action('pe', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, '\nPROF.ETHICS\nYou can directely download TEXTBOOK by taping below\nTEXTBOOK=/PETXT')
})
bot.command('PETXT', (ctx) => {
        ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file', )
        ctx.telegram.sendDocument(ctx.chat.id,
            'BQACAgUAAxkBAAMcX4RPuepXjFVdE-XY0JYzGkdScFEAAswBAALQ8iBUVfJZcZ3WqHwbBA', { "reply_to_message_id": ctx.message.message_id }
        )
    })
    //SE ECE
bot.action('se', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, '\nSUSTAINABLE ENGG.\nYou can directely download Scanned textbook by taping below\nTEXTBOOK=/SETXT1 /SETXT2 /SETXT3')
})
bot.command('SETXT1', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file', )
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAMkX4Ra2kjnrvabx0lYijbqjsW76vcAAvcBAAKnmyFUpV-senTUDS8bBA', { "reply_to_message_id": ctx.message.message_id }
    )
})
bot.command('PETXT2', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file', )
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAMlX4Ra_3EY7kW9kp8aoSqbKFxwU7AAAvgBAAKnmyFUN-E7lRxskc0bBA', { "reply_to_message_id": ctx.message.message_id }
    )
})
bot.command('PETXT3', (ctx) => {
        ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file', )
        ctx.telegram.sendDocument(ctx.chat.id,
            'BQACAgUAAxkBAAMmX4RbMo5dZfe9KUci-nFUuVu1LBMAAvkBAAKnmyFUXwABKAonK9AJGwQ', { "reply_to_message_id": ctx.message.message_id }
        )
    })
    // ece maths

bot.action('ecmat', (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Maths materials Will be available soon!!!!!!\n\n\n\n\nGot bug!!! /ContactAdmin')
})


/*mechanical--------------------------------------------------------------------------------------------*/
bot.action('me', (ctx) => {
    sendSemesters('me', ctx);
})



//me S3
bot.action('mes3', (ctx) => {
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'ECE-Select your Semester', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "MOF", callback_data: "mof" }, { text: "MOS", callback_data: "mos" }],
                [{ text: "DE", callback_data: "de" }, { text: "SE", callback_data: "se" }],
                [{ text: "MMS", callback_data: "mms" }, { text: "MAT", callback_data: "memat" }],
                [{ text: "MAIN MENU", callback_data: "menu" }],
            ]
        }
    })
})


/*electrical*/
bot.action('ee', (ctx) => {
    sendSemesters('ee', ctx);
})


//ee S3
bot.action('ees3', (ctx) => {
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'ECE-Select your Semester', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "AEC", callback_data: "mof" }, { text: "CN", callback_data: "mos" }],
                [{ text: "DE", callback_data: "de" }, { text: "SE", callback_data: "se" }],
                [{ text: "MI", callback_data: "mms" }, { text: "MAT", callback_data: "memat" }],
                [{ text: "MAIN MENU", callback_data: "menu" }],
            ]
        }
    })
})

/*computer*/
bot.action('cs', (ctx) => {
    sendSemesters('cs', ctx);
})

/*chemical*/
bot.action('ch', (ctx) => {
    sendSemesters('ch', ctx);
})


// bot.command('lcd', (ctx) => {
//         ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file',)
//         ctx.telegram.sendDocument(ctx.chat.id,
//             'BQACAgUAAxkBAAIBdV92CAABhqEaku1dFaimg2FzrZRz9AACUgEAAhIUsFd8ZnlcCEy3SBsE',
//             {"reply_to_message_id":ctx.message.message_id}
//         )
// })


//---------------------------------------------------------------{for both maintains and testing
bot.on('document', (ctx) => {
        console.log(JSON.stringify(ctx.update.message.document))
    })
    //---------------------------------------------------------------}

//shrouded-brushlands-98310
//https://shrouded-brushlands-98310.herokuapp.com/

//---------------------
// module.exports = bot // "start": "micro-bot",
//---------------------
bot.launch()