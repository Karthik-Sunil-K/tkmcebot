/* TESTING START */
const { Telegraf } = require('telegraf');
// const bot = new Telegraf('1129048108:AAG0hrQhTwqNHyed5159EyTpk0TeM4E9q0E');
const bot = new Telegraf('927312041:AAHS_s1hYTrPup8zO4tyKaS-Vwh9x8Px_ok');
/* TESTING END */

/* PRODUCTION START */
// const { Composer } = require('micro-bot');
// const bot = new Composer;
/* PRODUCTION END */

const axios = require('axios');
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
var { subjectsData, studyMaterials } = require('./data')
var admins = [{ chatId: 625310795, userId: 'elab_innovations', name: 'e-lab innovations' }, { chatId: 591998055, userId: 'KarthikSunilK', name: 'Karthik Sunil K' }]

// const api = "https://script.google.com/a/tkmce.ac.in/macros/s/AKfycby_dH5yS_23YXDLGuAp-B0uH3H3UVYTW9onliiq5DLw9JB7y85hP8LjwCTL56kegkSxKA/exec"
const api = "https://script.google.com/a/tkmce.ac.in/macros/s/AKfycbysbSOP4OO4XJ96jsp6hzIvDA7f06PrqORkLWR7X6iueHyhIC7TnSZm2vSacy6IWwTPSw/exec"
const updateData = (ctx) => {
    axios.get(api + '?action=getSubjects')
        .then(function(response) {
            subjectsData = response.data ? response.data : subjectsData

            if (ctx) {
                ctx.telegram.sendMessage(ctx.chat.id, 'subjectsData updated, ' + subjectsData.length, +' items')
            }
        })
        .catch(function(error) {
            console.log(error);
            if (ctx) {
                ctx.telegram.sendMessage(ctx.chat.id, 'subjectsData updation failed, ' + subjectsData.length, +' items')
            }
        });

    axios.get(api + '?action=getMaterials')
        .then(function(response) {
            studyMaterials = response.data ? response.data : studyMaterials
            if (ctx) {
                ctx.telegram.sendMessage(ctx.chat.id, 'studyMaterials updated, ' + studyMaterials.length, +' items')
            }
        })
        .catch(function(error) {
            console.log(error);
            if (ctx) {
                ctx.telegram.sendMessage(ctx.chat.id, 'studyMaterials updation failed, ' + studyMaterials.length, +' items')
            }
        });
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
    ctx.telegram.sendMessage(ctx.chat.id, 'Got bug!!!! Report to Admin ', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Karthik", url: "https://wa.me/918606683287?text=Got but\n" + msg }],
                [{ text: "e-lab innovations", url: "https://wa.me/918089931063?text=Got but\n" + msg }]
            ]
        }
    })
}

const sendSemesters = (code, ctx) => {
    ctx.editMessageText(`*${codeToName(code)}*\nSelect your Semester`, {
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

    ctx.editMessageText(`*${codeToName(dept)}* \\- ${sem}\nSelect your Subject`, {
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
                (material.modules.includes(module + ''))
        }).length
    }

    if (subject) {
        ctx.editMessageText(`*${codeToName(dept)}* \\- ${sem}\n*${subCode}* \\- ${subject.name}\nSelect module`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: `Module 1 📚 [${mateCount(1)}]`, callback_data: ['mod', subCode, '1', dept, sem].join('_') }, { text: `Module 2 📚 [${mateCount(2)}]`, callback_data: ['mod', subCode, '2', dept, sem].join('_') }],
                    [{ text: `Module 3 📚 [${mateCount(3)}]`, callback_data: ['mod', subCode, '3', dept, sem].join('_') }, { text: `Module 4 📚 [${mateCount(4)}]`, callback_data: ['mod', subCode, '4', dept, sem].join('_') }],
                    [{ text: `Module 5 📚 [${mateCount(5)}]`, callback_data: ['mod', subCode, '5', dept, sem].join('_') }, { text: "◀️ Back", callback_data: [dept, sem].join('_') }]
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
                (material.modules.includes(module + '')) &&
                material.type == type
        }).length
    }

    if (subject) {
        ctx.editMessageText(`*${codeToName(dept)}* \\- ${sem}\n*${subCode}* \\- ${subject.name}\nMedule ${module}\nSelect your type`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: `🗒 Class Notes [${mateCount('CN')}]`, callback_data: ['mate_CN', subCode, module, dept, sem].join('_') }, { text: `📄 Printed Notes [${mateCount('PN')}]`, callback_data: ['mate_PN', subCode, module, dept, sem].join('_') }],
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
            material.modules.includes(module + '') &&
            material.type == mateType
    })

    materials.forEach(async material => {
        if (material.type == 'CN' ||
            material.type == 'PN' ||
            material.type == 'TB' ||
            material.type == 'QP') {
            try {
                await ctx.telegram.sendDocument(ctx.chat.id, material.content, {
                    caption: `${material.name}\n\n @tkmcebot`
                })
            } catch (error) {
                reportError(`sendDocument - ${material.content}`, ctx)
                console.log(error);
            }
        }

        if (material.type == 'V') {
            try {
                await ctx.telegram.sendMessage(ctx.chat.id, `*${material.name}*\n${material.content}\n\n @tkmcebot`, Extra.markdown())
            } catch (error) {
                reportError(`sendMessage - ${content}`, ctx)
            }
        }
    })
}

//Start
bot.start((ctx) => {

    axios.get(`https://script.google.com/a/tkmce.ac.in/macros/s/AKfycbysbSOP4OO4XJ96jsp6hzIvDA7f06PrqORkLWR7X6iueHyhIC7TnSZm2vSacy6IWwTPSw/exec?action=newUser&userId=${ctx.chat.username?ctx.chat.username:''}&chatId=${ctx.chat.id}&name=${ctx.message.chat.first_name} ${ctx.message.chat.last_name}`)
        .then(function(response) {
            // console.log(response);
            let isNew = response.data.success
            ctx.reply(`Hi ${ctx.message.chat.first_name} ${ctx.message.chat.last_name}
${isNew?'Welcome 😍': 'Welcome back 😍'}
I'm tkmce bot`)
        })
        .catch(function(error) {
            console.log(error);
            ctx.reply(`Hi ${ctx.message.chat.first_name} ${ctx.message.chat.last_name}
Welcome back 😍
I'm tkmce bot`)
        }).then(function() {
            ctx.telegram.sendMessage(ctx.chat.id, 'Click here to select your department', {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "CIVIL", callback_data: "ce" }, { text: "MECHANICAL", callback_data: "mech" }],
                        [{ text: "ELECTRICAL & ELECTRONICS", callback_data: "eee" }, { text: "ELECTRONICS & COMMUNICATION", callback_data: "ece" }],
                        [{ text: "COMPUTER SCIENCE", callback_data: "cse" }, { text: "CHEMICAL", callback_data: "ce" }],
                        [{ text: "ARCHITECTURE", callback_data: "archi" }, { text: "🧑‍💻 Contact Admin", callback_data: "contactAdmin" }]
                    ]
                }
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
                [{ text: "ARCHITECTURE", callback_data: "archi" }, { text: "🧑‍💻 Contact Admin", callback_data: "contactAdmin" }]
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
                [{ text: "ARCHITECTURE", callback_data: "archi" }, { text: "🧑‍💻 Contact Admin", callback_data: "contactAdmin" }]
            ]
        }
    })
})

//Conact admin option
bot.action('contactAdmin', ctx => {
    ctx.editMessageText('Contact Admin', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Karthik", url: "https://wa.me/918606683287?text=Hello from tkmce bot" }],
                [{ text: "e-lab innovations", url: "https://t.me/elab_innovations" }],
                [{ text: "◀️ Back", callback_data: "menu" }]
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
    if (qData.startsWith('mate_')) {
        sendMeterialDetails(qData, ctx)
    }

    // console.log(qData);

    // Explicit usage
    ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

    // Using context shortcut
    ctx.answerCbQuery()
})

bot.on('sticker', (ctx) => {
    ctx.reply("Sorry!!!\nthis bot can't perform the this command please send a Hi \nWe will update soon")

})

bot.command('updateDB', ctx => {
    let isAdmin = admins.find(admin => admin.chatId == ctx.chat.id)
    if (isAdmin) {
        updateData(ctx);
    } else {
        ctx.telegram.sendMessage(ctx.chat.id, '❗️ You can\'t do that')
    }
})

bot.command('getid', ctx => {
    if (ctx.update.message.reply_to_message) {
        if (ctx.update.message.reply_to_message.document) {
            ctx.reply("`" + ctx.update.message.reply_to_message.document.file_id + "`", Extra.markdownV2())
        } else {
            ctx.reply("That is not a document")
        }
    } else {
        ctx.reply("Send as a reply to a document")
    }
})


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
// module.exports = bot;
/* PRODUCTION END */

/* TEST START */
bot.launch();
/* TEST END */