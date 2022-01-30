require('dotenv').config();
/* TESTING START */
const { Telegraf, Markup } = require('telegraf');
// const bot = new Telegraf(process.env.BOT_TOKEN);
/* TESTING END */

/* PRODUCTION START */
const { Composer } = require('micro-bot');
const bot = new Composer;
/* PRODUCTION END */

const axios = require('axios');
var firebaseAdminSdk = require("firebase-admin")
var { subjectsData, studyMaterials } = require('./data')
var admins = [{ chatId: 625310795, userId: 'elab_innovations', name: 'e-lab innovations' }, { chatId: 591998055, userId: 'KarthikSunilK', name: 'Karthik Sunil K' }]
var uploadMaterials = {}

firebaseAdminSdk.initializeApp({
    credential: firebaseAdminSdk.credential.cert(
        JSON.parse(Buffer.from(process.env.GOOGLE_CONFIG_BASE64, 'base64').toString('ascii'))),
    databaseURL: "https://tkmcebot-default-rtdb.firebaseio.com/"
});
var db = firebaseAdminSdk.database()



const updateData = (ctx) => {
    if (ctx) {
        ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
    }

    let _subjectsData = []
    db.ref("subjects").once("value", snapshot => {
        Object.keys(snapshot.val()).forEach(sub => _subjectsData.push(snapshot.val()[sub]))
        subjectsData = _subjectsData

        if (ctx) {
            ctx.telegram.sendMessage(ctx.chat.id, 'subjectsData updated, ' + subjectsData.length, +' items')
        }
    }, (errorObject) => {
        console.log('subjectsData updation failed, ' + errorObject.name);
        if (ctx) {
            ctx.telegram.sendMessage(ctx.chat.id, 'subjectsData updation failed, ' + errorObject.name)
        }
    })

    let _studyMaterials = []
    db.ref("studyMaterials").once("value", snapshot => {
        Object.keys(snapshot.val()).forEach(material => _studyMaterials.push(snapshot.val()[material]))
        studyMaterials = _studyMaterials

        if (ctx) {
            ctx.telegram.sendMessage(ctx.chat.id, 'studyMaterials updated, ' + studyMaterials.length, +' items')
        }
    }, (errorObject) => {
        console.log('studyMaterials updation failed, ' + errorObject.name);
        if (ctx) {
            ctx.telegram.sendMessage(ctx.chat.id, 'studyMaterials updation failed, ' + errorObject.name)
        }
    })

    let _admins = []
    db.ref("admins").once("value", snapshot => {
        Object.keys(snapshot.val()).forEach(admin => _admins.push(snapshot.val()[admin]))
        admins = _admins

        if (ctx) {
            ctx.telegram.sendMessage(ctx.chat.id, 'admins updated, ' + admins.length, +' items')
        }
    }, (errorObject) => {
        console.log('admins updation failed, ' + errorObject.name);
        if (ctx) {
            ctx.telegram.sendMessage(ctx.chat.id, 'admins updation failed, ' + errorObject.name)
        }
    })
}

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
const reportError = (msg, ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, '🪲 Got bug!\nReport to Developer 👨🏻‍💻', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Karthik", url: "https://wa.me/918606683287?text=Got Bug\n" + msg }],
                [{ text: "e-lab innovations", url: "https://wa.me/918089931063?text=Got Bug\n" + msg }]
            ]
        }
    })
}

const sendSemesters = (code, ctx) => {
    ctx.editMessageText(`*${codeToName(code)}*\n\nSelect your *Semester* 👇`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "SEMESTER 1", callback_data: code + "_1" }, { text: "SEMESTER 2", callback_data: code + "_2" }],
                [{ text: "SEMESTER 3", callback_data: code + "_3" }, { text: "SEMESTER 4", callback_data: code + "_4" }],
                [{ text: "SEMESTER 5", callback_data: code + "_5" }, { text: "SEMESTER 6", callback_data: code + "_6" }],
                [{ text: "SEMESTER 7", callback_data: code + "_7" }, { text: "SEMESTER 8", callback_data: code + "_8" }],
                [{ text: "◀️ Back", callback_data: "menu" }],
            ]
        },
        parse_mode: "MarkdownV2"
    })
}

const sendSubjectList = (code, ctx) => {
    let dept = code.split('_')[0]
    let sem = code.split('_')[1]
    let subjects = subjectsData.filter(subject => {
        return subject.department == dept && subject.sem == sem
    })

    const mateCount = subCode => {
        return studyMaterials.filter(material => material.subjectCode == subCode).length
    }

    let inline_keyboard = subjects.map(Subject => {
        return [{ text: `📚 [${mateCount(Subject.code)}] ${Subject.code} - ${Subject.name}`, callback_data: ['sub', Subject.code, code].join('_') }]
    })

    inline_keyboard.push([{ text: "◀️ Back", callback_data: dept }])

    ctx.editMessageText(`*${codeToName(dept)}*\n*Semester ${sem}*\n\nSelect a *Subject* 👇`, {
        reply_markup: {
            inline_keyboard: inline_keyboard
        },
        parse_mode: "MarkdownV2"
    })
}

const sendSubjectDetails = (code, ctx) => {
    let subCode = code.split('_')[1]
    let dept = code.split('_')[2]
    let sem = code.split('_')[3]

    let subject = subjectsData.find(subject => {
        return subject.code == subCode
    })

    const mateCount = module => {
        return studyMaterials.filter(material => {
            return material.subjectCode == subCode &&
                (material.modules.includes(module + '') || module == 'A')
        }).length
    }

    if (subject) {
        ctx.editMessageText(`*${codeToName(dept)}*\n*Semester ${sem}*\n*${subCode}* \\- ${subject.name}\n\nSelect *Module*`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: `Module 1 📚 [${mateCount(1)}]`, callback_data: ['mod', subCode, '1', dept, sem].join('_') }, { text: `Module 2 📚 [${mateCount(2)}]`, callback_data: ['mod', subCode, '2', dept, sem].join('_') }],
                    [{ text: `Module 3 📚 [${mateCount(3)}]`, callback_data: ['mod', subCode, '3', dept, sem].join('_') }, { text: `Module 4 📚 [${mateCount(4)}]`, callback_data: ['mod', subCode, '4', dept, sem].join('_') }],
                    [{ text: `Module 5 📚 [${mateCount(5)}]`, callback_data: ['mod', subCode, '5', dept, sem].join('_') }, { text: `All 📚 [${mateCount('A')}]`, callback_data: ['mod', subCode, 'A', dept, sem].join('_') }],
                    [{ text: "◀️ Back", callback_data: [dept, sem].join('_') }]
                ]
            },
            parse_mode: "MarkdownV2"
        })
    }
}

const sendModuleDetails = (code, ctx) => {
    let subCode = code.split('_')[1]
    let module = code.split('_')[2]
    let dept = code.split('_')[3]
    let sem = code.split('_')[4]

    let subject = subjectsData.find(subject => {
        return subject.code == subCode
    })

    const mateCount = type => {
        return studyMaterials.filter(material => {
            return material.subjectCode == subCode &&
                (material.modules.includes(module + '') || module == 'A') &&
                material.type == type
        }).length
    }

    if (subject) {
        ctx.editMessageText(`*${codeToName(dept)}*\n*Semester ${sem}*\n*${subCode}* \\- ${subject.name}\n*Medule ${module}*\n\nSelect a type 👇`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: `✍️ Class Notes [${mateCount('CN')}]`, callback_data: ['mate_CN', subCode, module, dept, sem].join('_') }, { text: `📄 Printed Notes [${mateCount('PN')}]`, callback_data: ['mate_PN', subCode, module, dept, sem].join('_') }],
                    [{ text: `📚 Text Books [${mateCount('TB')}]`, callback_data: ['mate_TB', subCode, module, dept, sem].join('_') }, { text: `📃 Q Papers [${mateCount('QP')}]`, callback_data: ['mate_QP', subCode, module, dept, sem].join('_') }],
                    [{ text: `🎞 Videos [${mateCount('V')}]`, callback_data: ['mate_V', subCode, module, dept, sem].join('_') }, { text: "◀️ Back", callback_data: ['sub', subCode, dept, sem].join('_') }]
                ]
            },
            parse_mode: "MarkdownV2"
        })
    }
}

const sendMeterialDetails = (code, ctx) => {
    let mateType = code.split('_')[1]
    let subCode = code.split('_')[2]
    let module = code.split('_')[3]

    let materials = studyMaterials.filter(material => {
        return material.subjectCode == subCode &&
            (material.modules.includes(module + '') || module == 'A') &&
            material.type == mateType
    })

    materials.forEach(async material => {
        if (material.type == 'CN' ||
            material.type == 'PN' ||
            material.type == 'TB' ||
            material.type == 'QP') {
            try {
                await ctx.telegram.sendDocument(ctx.chat.id, material.content, {
                    caption: `<b>${material.name}</b>\n\n @tkmcebot`,
                    parse_mode: 'HTML'
                })
            } catch (error) {
                reportError(`sendDocument - ${material.content}`, ctx)
                console.log(error);
            }
        }

        if (material.type == 'V') {
            try {
                await ctx.replyWithHTML(`<b>${material.name}</b>\n\n${material.content}\n\n @tkmcebot`)
            } catch (error) {
                console.log(error);
                reportError(`sendMessage - ${material.content}`, ctx)
            }
        }
    })
}

const addMaterialToDB = (code, ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_document')
    let message_id = code.split('_')[1]
    let uploadData = uploadMaterials[message_id]
    if (uploadData) {
        db.ref('studyMaterials').push(uploadData, error => {
            if (!error) {
                ctx.reply(`New material added\n click /updateDB to update database`)
            } else {
                ctx.reply(`Failed from server\n ${JSON.stringify(error)}`)
                delete uploadMaterials[message_id]
                ctx.deleteMessage()
            }
            ctx.deleteMessage()
        })
    }
}


//Start
bot.start((ctx) => {
    let fname = ctx.message.chat.first_name ? ctx.message.chat.first_name : ''
    let lname = ctx.message.chat.last_name ? ctx.message.chat.last_name : ''
    let chatId = ctx.chat.id
    let userId = ctx.chat.username ? ctx.chat.username : ''
    ctx.telegram.sendChatAction(ctx.chat.id, 'typing')

    db.ref("users/" + chatId).once("value", snapshot => {
        let isNew = !snapshot.val()
        if (isNew) {
            ctx.telegram.sendMessage(chatId, `Hi ${fname} ${lname}
I'm <a href="tg://user?id=1129048108">tkmce bot</a> developed to provide study materials.
Click /help to get help.\n\nClick here to select your department`, {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "CIVIL", callback_data: "ce" }, { text: "MECHANICAL", callback_data: "mech" }],
                        [{ text: "ELECTRICAL & ELECTRONICS", callback_data: "eee" }, { text: "ELECTRONICS & COMMUNICATION", callback_data: "ece" }],
                        [{ text: "COMPUTER SCIENCE", callback_data: "cse" }, { text: "CHEMICAL", callback_data: "ce" }],
                        [{ text: "ARCHITECTURE", callback_data: "archi" }, { text: "⚙️ More Options", callback_data: "more-options" }]
                    ]
                },
                parse_mode: 'HTML'
            })

            db.ref('users').child(chatId).set({
                userId,
                chatId,
                fname,
                lname
            });
        } else {
            ctx.telegram.sendMessage(chatId, `Hi ${fname} ${lname}\nWelcome back 😍\n\nClick here to select your department`, {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "CIVIL", callback_data: "ce" }, { text: "MECHANICAL", callback_data: "mech" }],
                        [{ text: "ELECTRICAL & ELECTRONICS", callback_data: "eee" }, { text: "ELECTRONICS & COMMUNICATION", callback_data: "ece" }],
                        [{ text: "COMPUTER SCIENCE", callback_data: "cse" }, { text: "CHEMICAL", callback_data: "ce" }],
                        [{ text: "ARCHITECTURE", callback_data: "archi" }, { text: "⚙️ More Options", callback_data: "more-options" }]
                    ]
                }
            })
        }

    }, (errorObject) => {
        console.log('User read failed, ' + errorObject.name);

        ctx.telegram.sendMessage(chatId, `Hi ${fname?fname:""} ${lname?lname:""}
I'm <a href="tg://user?id=1129048108">tkmce bot</a> developed to provide study materials.
Click /help to get help.\n\nClick here to select your department`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "CIVIL", callback_data: "ce" }, { text: "MECHANICAL", callback_data: "mech" }],
                    [{ text: "ELECTRICAL & ELECTRONICS", callback_data: "eee" }, { text: "ELECTRONICS & COMMUNICATION", callback_data: "ece" }],
                    [{ text: "COMPUTER SCIENCE", callback_data: "cse" }, { text: "CHEMICAL", callback_data: "ce" }],
                    [{ text: "ARCHITECTURE", callback_data: "archi" }, { text: "⚙️ More Options", callback_data: "more-options" }]
                ]
            },
            parse_mode: 'HTML'
        })
    })
})

//Hi
bot.hears(['Hi', 'hi', 'Hii', 'hii', 'hai', 'Hai'], (ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, 'Click here to select your department', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "CIVIL", callback_data: "ce" }, { text: "MECHANICAL", callback_data: "mech" }],
                [{ text: "ELECTRICAL & ELECTRONICS", callback_data: "eee" }, { text: "ELECTRONICS & COMMUNICATION", callback_data: "ece" }],
                [{ text: "COMPUTER SCIENCE", callback_data: "cse" }, { text: "CHEMICAL", callback_data: "ce" }],
                [{ text: "ARCHITECTURE", callback_data: "archi" }, { text: "⚙️ More Options", callback_data: "more-options" }]
            ]
        }
    })
})

//menu
bot.action('menu', (ctx) => {
    ctx.editMessageText('Click here to select you department', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "CIVIL", callback_data: "ce" }, { text: "MECHANICAL", callback_data: "mech" }],
                [{ text: "ELECTRICAL & ELECTRONICS", callback_data: "eee" }, { text: "ELECTRONICS & COMMUNICATION", callback_data: "ece" }],
                [{ text: "COMPUTER SCIENCE", callback_data: "cse" }, { text: "CHEMICAL", callback_data: "ce" }],
                [{ text: "ARCHITECTURE", callback_data: "archi" }, { text: "⚙️ More Options", callback_data: "more-options" }]
            ]
        }
    })
    ctx.answerCbQuery()
})

//More options
bot.action('more-options', ctx => {
    ctx.editMessageText('More Options', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "🧑‍💻 Contact Developers", callback_data: "contactDevs" }],
                [{ text: "Contribute", callback_data: "contribute" }],
                [{ text: "◀️ Back", callback_data: "menu" }]
            ]
        }
    })
    ctx.answerCbQuery()
})

//Conact admin option
bot.action('contactDevs', ctx => {
    ctx.editMessageText('Contact Developers', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Karthik", url: "https://wa.me/918606683287?text=Hello from tkmce bot" }],
                [{ text: "e-lab innovations", url: "https://t.me/elab_innovations" }],
                [{ text: "◀️ Back", callback_data: "more-options" }]
            ]
        }
    })
    ctx.answerCbQuery()
})

//Delete Message
bot.action('deleteMsg', ctx => {
    ctx.deleteMessage()
})

//Contriute
bot.action('contribute', ctx => {
            let msg = `I appreciate your interest in contributing.
Contact <b>admins</b> to upload study materials.
Thank you 😍

<b>ADMINS</b>
${admins.map(admin => `🧑‍💻 <a href="tg://user?id=${admin.chatId}">${admin.userId}</a>`).join('\n')}
`
    ctx.telegram.sendMessage(ctx.chat.id, msg, {
        parse_mode: 'HTML'
    })
    ctx.answerCbQuery()
})

//contribute
bot.command('contribute', ctx => {
    let msg = `I appreciate your interest in contributing.
Contact <b>admins</b> to upload study materials.
Thank you 😍

<b>ADMINS</b>
${admins.map(admin => `🧑‍💻 <a href="tg://user?id=${admin.chatId}">${admin.userId}</a>`).join('\n')}
`
    ctx.telegram.sendMessage(ctx.chat.id, msg, {
        parse_mode: 'HTML'
    })
})

//Help
bot.command('help', ctx => {
    let fname = ctx.message.chat.first_name
    let lname = ctx.message.chat.last_name
    ctx.replyWithHTML(`Hi ${fname?fname:""} ${lname?lname:""}
I'm <a href="tg://user?id=1129048108">tkmce bot</a> developed to provide study materials.
Please send 'Hi' or click /start to get options.
For contributing study material, click /contribute
`)
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
    if (qData.startsWith('mate_')) {
        sendMeterialDetails(qData, ctx)
    }
    if (qData.startsWith('addMaterial_')) {
        addMaterialToDB(qData, ctx)
    }

    // Explicit usage
    ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

    // Using context shortcut
    ctx.answerCbQuery()
})

bot.on('sticker', (ctx) => {
    ctx.reply("Sorry!!!\nthis bot can't perform the this command please send a Hi \nWe will update soon")

})

/* ADMIN */
//Update Database
bot.command('updateDB', ctx => {
    let isAdmin = admins.find(admin => admin.chatId == ctx.chat.id)
    if (isAdmin) {
        updateData(ctx);
    } else {
        ctx.telegram.sendMessage(ctx.chat.id, '❗️ You can\'t do that')
    }
})

//Send File ID
bot.command('getid', ctx => {
    if (ctx.update.message.reply_to_message) {
        if (ctx.update.message.reply_to_message.document) {
            ctx.replyWithMarkdown("`" + ctx.update.message.reply_to_message.document.file_id + "`")
        } else {
            ctx.reply("That is not a document")
        }
    } else {
        ctx.reply("Send as a reply to a document")
    }
})

//Add New Material
bot.command('addMaterial', (ctx) => {
    let isAdmin = admins.find(admin => admin.chatId == ctx.chat.id)
    if (isAdmin) {
    let text = ctx.update.message.text
    text = text.replace('/addMaterial ', '')
    let parameters = text.split('&')
    let helpText = `Send like
<code>/addMaterial subjectCode&moduels&type&name</code>

<b>subjectCode</b>: Subject in capital letters
<b>modules</b>: Modules sperated by comma(,)
<b>type</b>: Type of the material
        CN - Class Note
        PN - Printed Note
        TB - Text Book
        QP - Question Paper
        V - Video link
<b>name</b>: Name of the material

eg: <code>/addMaterial HUT200&1,2&CN&Module 2 Class Note</code>`
    if (!(parameters.length >= 4)) {
        ctx.replyWithHTML('⚠️ ' + helpText)
    } else {
        if (ctx.update.message.reply_to_message) {
            let subjectCode = parameters[0]
            let modules = parameters[1].split(',')
            let type = parameters[2]
            parameters.shift() //remove subjectCode
            parameters.shift() //remove modules
            parameters.shift() //remove type
            let name = parameters.join('&amp;') // join full name

            let validModules = () => {
                let _err = false
                modules.forEach(module => {
                    _err = _err | module < 0
                    _err = _err | module > 5
                })
                return !_err
            }

            if (!(subjectsData.find(m => m.code == subjectCode))) {
                ctx.replyWithHTML("⚠️ Subject code not found\nCheck subject code or update DB\n\n" + helpText)
            } else if(!(type == 'CN' || type == 'PN' || type == 'TB' || type == 'QP' || type == 'V')) {
                ctx.replyWithHTML("⚠️ Wrong type\n\n" + helpText)
            }  else if(!(validModules())) {
                ctx.replyWithHTML("⚠️ Wrong modules\n\n" + helpText)
            } else if (ctx.update.message.reply_to_message.document) {
                let content = ctx.update.message.reply_to_message.document.file_id;
                uploadMaterials[ctx.update.message.message_id] = {subjectCode, modules, type, name, content}
                let typeName = {CN:"✍️ Class Note",  PN:"📄 Printed Note", TB:"📚 Text Book", QP:"📄 Q Paper", V:"🎞 Video"}
                ctx.replyWithHTML(`<b>Your study material is ready upload</b>\n
<b>Name:</b> ${name}
<b>Suject:</b> ${subjectCode + ' - ' + subjectsData.find(m => m.code == subjectCode).name}
<b>Modules:</b> ${modules}
<b>Type:</b> ${typeName[type]}
<b>Content:</b>\n${ctx.update.message.reply_to_message.document.file_name}\n${content}`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "❌ Cancel", callback_data: "deleteMsg" }, { text: "⬆️ Upload", callback_data: "addMaterial_" + ctx.update.message.message_id }]
                        ]
                    }
                })
            } else {
                let content = ctx.update.message.reply_to_message.text;
                let typeName = {CN:"✍️ Class Note",  PN:"📄 Printed Note", TB:"📚 Text Book", QP:"📄 Q Paper", V:"🎞 Video"}
                type = 'V'
                uploadMaterials[ctx.update.message.message_id] = {subjectCode, modules, type, name, content}
                ctx.replyWithHTML(`<b>Your study material is ready upload</b>\n
<b>Name:</b> ${name}
<b>Suject:</b> ${subjectCode + ' - ' + subjectsData.find(m => m.code == subjectCode).name}
<b>Modules:</b> ${modules}
<b>Type:</b> ${typeName[type]}
<b>Content:</b>\n${content}`, {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "❌ Cancel", callback_data: "deleteMsg" }, { text: "⬆️ Upload", callback_data: "addMaterial_" + ctx.update.message.message_id }]
                        ]
                    }
                })
            }
        } else {
            ctx.reply("⚠️ This command works only for reply.\nReply to a document or text")
        }
    }
    
} else {
    ctx.telegram.sendMessage(ctx.chat.id, '⚠️ You don\'t have permission to perform this task. For assistance, contact your account admin')
}
})

/* ADMIN */
//Testing
bot.on('document', (ctx) => {
    // ctx.telegram.sendMessage(ctx.chat.id, ctx.update.message.document.file_id)
    console.log(JSON.stringify(ctx.update.message.document))
        // console.log(ctx);
})


updateData();

//shrouded-brushlands-98310
//https://shrouded-brushlands-98310.herokuapp.com/

/* PRODUCTION START */
module.exports = bot;
/* PRODUCTION END */

/* TEST START */
// bot.launch();
/* TEST END */