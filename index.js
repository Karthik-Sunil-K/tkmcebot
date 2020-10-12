// const Telegraf = require('telegraf')
// const bot = new Telegraf('1129048108:AAG0hrQhTwqNHyed5159EyTpk0TeM4E9q0E')
const { Composer } = require('micro-bot')
const bot = new Composer

bot.start((ctx) => {
    ctx.reply()
})

// bot.action('lcd',(ctx) =>{
//     ctx.reply('hai  /sus is here')     
// })

bot.on('sticker',(ctx) =>{
    ctx.reply("Sorry!!!\nthis bot can perform the following command \n -/start -/help")

})
// bot.hears('bug',(ctx) =>{
//     ctx.reply('Got bug!!!!!   https://wa.me/918606683287 \n https://t.me/918606683287')
// })
    

//Hi
bot.hears('Hi',(ctx) =>{
    ctx.telegram.sendMessage(ctx.chat.id,'Click here to select you department', 
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "Civil",callback_data:"cv"},{text:"Mechanical",callback_data:"me"}],
                [{text: "Electronics&Communication",callback_data:"ec"},{text:"Electrical&Electronics",callback_data:"ee"}],
                [{text: "Computer Science",callback_data:"cs"},{text:"Chemical",callback_data:"ch"}],
                [{text: "Mech Production",callback_data:"cs"},{text:"Admin Pannel",callback_data:"ap"}]
            ]
        }
    })
})

//hi
bot.hears('hi',(ctx) =>{
    ctx.telegram.sendMessage(ctx.chat.id,'Click here to select you department', 
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "Civil",callback_data:"cv"},{text:"Mechanical",callback_data:"me"}],
                [{text: "Electronics&Communication",callback_data:"ec"},{text:"Electrical&Electronics",callback_data:"ee"}],
                [{text: "Computer Science",callback_data:"cs"},{text:"Chemical",callback_data:"ch"}],
                [{text: "Mech Production",callback_data:"cs"},{text:"Admin Pannel",callback_data:"ap"}]
            ]
        }
    })
})

//Hii
bot.hears('Hii',(ctx) =>{
    ctx.telegram.sendMessage(ctx.chat.id,'Click here to select you department', 
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "Civil",callback_data:"cv"},{text:"Mechanical",callback_data:"me"}],
                [{text: "Electronics&Communication",callback_data:"ec"},{text:"Electrical&Electronics",callback_data:"ee"}],
                [{text: "Computer Science",callback_data:"cs"},{text:"Chemical",callback_data:"ch"}],
                [{text: "Mech Production",callback_data:"mp"},{text:"Admin Pannel",callback_data:"ap"}]
            ]
        }
    })
})

//hii
bot.hears('hii',(ctx) =>{
    ctx.telegram.sendMessage(ctx.chat.id,'Click here to select you department', 
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "Civil",callback_data:"cv"},{text:"Mechanical",callback_data:"me"}],
                [{text: "Electronics&Communication",callback_data:"ec"},{text:"Electrical&Electronics",callback_data:"ee"}],
                [{text: "Computer Science",callback_data:"cs"},{text:"Chemical",callback_data:"ch"}],
                [{text: "Mech Production",callback_data:"cs"},{text:"Admin Pannel",callback_data:"ap"}]
            ]
        }
    })
})

//hai
bot.hears('hai',(ctx) =>{
    ctx.telegram.sendMessage(ctx.chat.id,'Click here to select you department', 
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "Civil",callback_data:"cv"},{text:"Mechanical",callback_data:"me"}],
                [{text: "Electronics&Communication",callback_data:"ec"},{text:"Electrical&Electronics",callback_data:"ee"}],
                [{text: "Computer Science",callback_data:"cs"},{text:"Chemical",callback_data:"ch"}],
                [{text: "Mech Production",callback_data:"cs"},{text:"Admin Pannel",callback_data:"ap"}]

            ]
        }
    })
})
//Hai
bot.hears('Hai',(ctx) =>{
    ctx.telegram.sendMessage(ctx.chat.id,'Click here to select you department', 
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "Civil",callback_data:"cv"},{text:"Mechanical",callback_data:"me"}],
                [{text: "Electronics&Communication",callback_data:"ec"},{text:"Electrical&Electronics",callback_data:"ee"}],
                [{text: "Computer Science",callback_data:"cs"},{text:"Chemical",callback_data:"ch"}],
                [{text: "Mech Production",callback_data:"cs"},{text:"Admin Pannel",callback_data:"ap"}]
            ]
        }
    })
})
//admin pannel
bot.action('ap',(ctx) =>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id,'Got bug!!!! Contact Admin ',  
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "Connect Whatsapp",url:"https://wa.me/918606683287"}],
               
            ]
        }
    })   
    
})


/*civil----------------------------------------------------------------------------------------------*/
bot.action('cv',(ctx) =>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id,'CIVIL-Select your Semester', 
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "SEMESTER 1",callback_data:"cvs1"},{text: "SEMESTER 3",callback_data:"cvs3"}],
                [{text: "SEMESTER 5",callback_data:"cvs5"},{text: "SEMESTER 7",callback_data:"cvs7"}],
                [{text: "MAIN MENU",callback_data:"menu"}],
            ]
        }
    })
})



//cv S3
bot.action('cvs3',(ctx) =>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id,'CIVIL-Select your Subject', 
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "MOS",callback_data:"mos"},{text: "SUR",callback_data:"sur"}],
                [{text: "FM",callback_data:"fm"},{text: "MAT",callback_data:"ecmat"}],
                [{text: "SE",callback_data:"se"},{text: "PE",callback_data:"pe"}],
                [{text: "MAIN MENU",callback_data:"menu"}],
            ]
        }
    })
})
/*ELECTRONICS-------------------------------------------------------------------------------------*/
bot.action('ec',(ctx) =>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id,'ECE-Select your Semester', 
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "SEMESTER 1",callback_data:"ecs1"},{text: "SEMESTER 3",callback_data:"ecs3"}],
                [{text: "SEMESTER 5",callback_data:"ecs5"},{text: "SEMESTER 7",callback_data:"ecs7"}],
                [{text: "MAIN MENU",callback_data:"menu"},{text:"Admin Pannel",callback_data:"ap"}],
            ]
        }
    })
})
//ECE S3
bot.action('ecs3',(ctx) =>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id,'ECE-Select your Subject', 
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "SSD",callback_data:"ssd"},{text: "NT",callback_data:"nt"}],
                [{text: "LCD",callback_data:"lcd"},{text: "MAT",callback_data:"ecmat"}],
                [{text: "PE",callback_data:"pe"},{text: "SE",callback_data:"se"}],
                [{text: "MAIN MENU",callback_data:"menu"}],
            ]
        }
    })
})


//ecs3ssd
bot.action('ssd',(ctx) =>{
    ctx.telegram.sendMessage(ctx.chat.id,'SOLID STATE DEVICES\n\nMODULE 1 IMPORTANT VIDEO LINKS\n1. https://rb.gy/xanoko\n2. https://rb.gy/d28di4\n3. https://rb.gy/j97e8j\n4. https://rb.gy/coniys\n5. https://rb.gy/cgagnq\n6. https://rb.gy/6qikn3\n7. https://rb.gy/hqmx8s\n8. https://rb.gy/wtnith\n9. https://rb.gy/we1jb2\nYou can directely download TEXTBOOK by taping below\nTEXTBOOK=/SSDTXT\nNOTE=/SSD1 /SSD2 /SSD3 /SSD4 /SSD5')     
})

bot.command('SSDTXT', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file',)
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAIClV99tyjS1GN4h8x-G0LcoYpq4k0QAAJMAQAC4rjxV3UhsV8XHsy5GwQ',
        {"reply_to_message_id":ctx.message.message_id}
    )
})
bot.command('SSD1', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file',)
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAIC7V-Agm-Ud5lAeQLdXcpG1qPSUgtzAAJDAQACdZvxV8IT70GsGIoCGwQ',
        {"reply_to_message_id":ctx.message.message_id}
    )
})

bot.command('SSD2', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file',)
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAIC71-AgyGmBP1kcF-PK07-HYkDN55UAAJFAQACdZvxVz6nW25u8mE-GwQ',
        {"reply_to_message_id":ctx.message.message_id}
    )
})

bot.command('SSD3', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file',)
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAIC-V-Ag9hgkbMfF1vSQauzy1oPeoYGAAIaAQACOqIIVIEzit3fOp2uGwQ',
        {"reply_to_message_id":ctx.message.message_id}
    )
})

bot.command('SSD4', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file',)
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAIC-l-AhfMfGCS5QJBpiV2QJMLoI0HwAAIaAQACOqIIVIEzit3fOp2uGwQ',
        {"reply_to_message_id":ctx.message.message_id}
    )
})
bot.command('SSD5', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file',)
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAIDDV-Ah5LnQL3nUu2d8Znn-T1olusZAAIbAQACOqIIVIecJ2aeGxHnGwQ',
        {"reply_to_message_id":ctx.message.message_id}
    )
})
//LCD ECE
bot.action('lcd',(ctx) =>{
    ctx.telegram.sendMessage(ctx.chat.id,'LOGIC CIRCUIT DESIGN\nIMPORTANT VIDEO LINKS\n\n1.https://youtu.be/ai59DBrifRM\n2.https://youtu.be/0RR0ZGXHURI\n2.https://youtu.be/0RR0ZGXHURI\n4.https://youtu.be/Q7kMyCn_wmg\n5.https://youtu.be/7onqsel1D-U\n6.https://youtu.be/bfvnAm-ItD4\n7.https://youtu.be/pVih5FSNdks\n8.https://youtu.be/rQHsmImLXHY\n9.https://youtu.be/jKG62CNCzy0\n10.https://youtu.be/oe5zUWHuFRY\n11.https://youtu.be/QpUcG0lsIGg')     
})  
//NT ECE
bot.action('nt',(ctx) =>{
    ctx.telegram.sendMessage(ctx.chat.id,'\nNETWORK THEORY\nYou can directely download TEXTBOOK by taping below\nTEXTBOOK=/NTTXT1  /NTTXT2')     
})
bot.command('NTTXT1', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file',)
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAMPX4RNT_9sgRut9VZb1h3ahVj49qkAAlUBAAKPCRBUzhQM1jCx960bBA',
        {"reply_to_message_id":ctx.message.message_id}
    )
})

bot.command('NTTXT2', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file',)
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAMQX4RNavmoNJqewuqccVc9lB7XYAMAAusBAAKnmyFUWp71sXdDpR8bBA',
        {"reply_to_message_id":ctx.message.message_id}
    )
})
//PE ECE
bot.action('pe',(ctx) =>{
    ctx.telegram.sendMessage(ctx.chat.id,'\nPROF.ETHICS\nYou can directely download TEXTBOOK by taping below\nTEXTBOOK=/PETXT')     
})
bot.command('PETXT', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file',)
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAMcX4RPuepXjFVdE-XY0JYzGkdScFEAAswBAALQ8iBUVfJZcZ3WqHwbBA',
        {"reply_to_message_id":ctx.message.message_id}
    )
})
//SE ECE
bot.action('se',(ctx) =>{
    ctx.telegram.sendMessage(ctx.chat.id,'\nPROF.ETHICS\nYou can directely download Scanned textbook by taping below\nTEXTBOOK=/PETXT1 /PETXT2 /PETXT3')     
})
bot.command('PETXT1', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file',)
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAMkX4Ra2kjnrvabx0lYijbqjsW76vcAAvcBAAKnmyFUpV-senTUDS8bBA',
        {"reply_to_message_id":ctx.message.message_id}
    )
})
bot.command('PETXT2', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file',)
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAMlX4Ra_3EY7kW9kp8aoSqbKFxwU7AAAvgBAAKnmyFUN-E7lRxskc0bBA',
        {"reply_to_message_id":ctx.message.message_id}
    )
})
bot.command('PETXT3', (ctx) => {
    ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file',)
    ctx.telegram.sendDocument(ctx.chat.id,
        'BQACAgUAAxkBAAMmX4RbMo5dZfe9KUci-nFUuVu1LBMAAvkBAAKnmyFUXwABKAonK9AJGwQ',
        {"reply_to_message_id":ctx.message.message_id}
    )
})

/*mechanical--------------------------------------------------------------------------------------------*/
bot.action('me',(ctx) =>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id,'MECHANICAL-Select your Semester', 
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "SEMESTER 1",callback_data:"mes1"},{text: "SEMESTER 3",callback_data:"mes3"}],
                [{text: "SEMESTER 5",callback_data:"mes5"},{text: "SEMESTER 7",callback_data:"mes7"}],
                [{text: "MAIN MENU",callback_data:"menu"}],
            ]
        }
    })
})



//me S3
bot.action('mes3',(ctx) =>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id,'ECE-Select your Semester', 
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "MOF",callback_data:"mof"},{text: "MOS",callback_data:"mos"}],
                [{text: "DE",callback_data:"de"},{text: "SE",callback_data:"se"}],
                [{text: "MMS",callback_data:"mms"},{text: "MAT",callback_data:"memat"}],
                [{text: "MAIN MENU",callback_data:"menu"}],
            ]
        }
    })
})


/*electrical*/
bot.action('ee',(ctx) =>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id,'EEE-Select your Semester', 
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "SEMESTER 1",callback_data:"ees1"},{text: "SEMESTER 3",callback_data:"ees3"}],
                [{text: "SEMESTER 5",callback_data:"ees5"},{text: "SEMESTER 7",callback_data:"ees7"}],
                [{text: "MAIN MENU",callback_data:"menu"}],
            ]
        }
    })
})


//ee S3
bot.action('ees3',(ctx) =>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id,'ECE-Select your Semester', 
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "AEC",callback_data:"mof"},{text: "CN",callback_data:"mos"}],
                [{text: "DE",callback_data:"de"},{text: "SE",callback_data:"se"}],
                [{text: "MI",callback_data:"mms"},{text: "MAT",callback_data:"memat"}],
                [{text: "MAIN MENU",callback_data:"menu"}],
            ]
        }
    })
})

/*computer*/
bot.action('cs',(ctx) =>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id,'CS-Select your Semester', 
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "SEMESTER 1",callback_data:"css1"},{text: "SEMESTER 3",callback_data:"css3"}],
                [{text: "SEMESTER 5",callback_data:"css5"},{text: "SEMESTER 7",callback_data:"css7"}],
                [{text: "MAIN MENU",callback_data:"menu"}],
            ]
        }
    })
})

/*chemical*/
bot.action('ch',(ctx) =>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id,'CHEMICAL-Select your Semester', 
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "SEMESTER 1",callback_data:"chs1"},{text: "SEMESTER 3",callback_data:"chs3"}],
                [{text: "SEMESTER 5",callback_data:"chs5"},{text: "SEMESTER 7",callback_data:"chs7"}],
                [{text: "MAIN MENU",callback_data:"menu"}],
            ]
        }
    })
})

/*menu*/
bot.action('menu',(ctx) =>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id,'Click here to select you department',
    { 
        reply_markup:{
            inline_keyboard:[
                [{text: "Civil",callback_data:"cv"},{text:"Mechanical",callback_data:"me"}],
                [{text: "Electronics&Communication",callback_data:"ec"},{text:"Electrical&Electronics",callback_data:"ee"}],
                [{text: "Computer Science",callback_data:"cs"},{text:"Chemical",callback_data:"ch"}],
                [{text: "Mech Production",callback_data:"cs"},{text:"Admin Pannel",callback_data:"ap"}]
            ]
        }
    })
})


// bot.command('lcd', (ctx) => {
//         ctx.telegram.sendChatAction(ctx.chat.id, 'upload_file',)
//         ctx.telegram.sendDocument(ctx.chat.id,
//             'BQACAgUAAxkBAAIBdV92CAABhqEaku1dFaimg2FzrZRz9AACUgEAAhIUsFd8ZnlcCEy3SBsE',
//             {"reply_to_message_id":ctx.message.message_id}
//         )
// })



bot.on('document',(ctx)=>{
    console.log(JSON.stringify(ctx.update.message.document))
})

//shrouded-brushlands-98310
//https://shrouded-brushlands-98310.herokuapp.com/


module.exports = bot
// bot.launch()