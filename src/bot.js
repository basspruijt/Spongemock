const { Telegraf } = require("telegraf");
const { token } = require("../important stuff/token.js");
const { admins } = require("../important stuff/admins.js");
const cron = require("node-cron");

const bot = new Telegraf(token);

var cronJobs = [];
var cronVars = [];

bot.command("loesoe", ctx => {
    var isAdmin = checkAdmin(ctx);
    if (ctx.chat.id != "-1001498548689") {
        if (isAdmin && !cronVars['gaanWeLoesoe_' + ctx.chat.id]) {
            cronJobs['test_' + ctx.chat.id] = cron.schedule("* * * * * *", () => {
                send(ctx, "We gaan loesoe");
            });
            cronVars['gaanWeLoesoe_' + ctx.chat.id] = true;
            bot.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
        } else if (isAdmin && cronVars['gaanWeLoesoe_' + ctx.chat.id] == true) {
            cronJobs['test_' + ctx.chat.id].stop();
            cronVars['gaanWeLoesoe_' + ctx.chat.id] = false;
            bot.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
        } else {
            send(ctx, "You're not allowed to do that.");
        }
    }
});

bot.command("test", ctx => {
    console.log("");
    console.log("---TESTING---");
    console.log("-------------");

    console.log(cronJobs);
    console.log("#############");
    console.log(cronVars);
});

bot.command("info", ctx => {
    console.log("-----");
    console.log(ctx.message.from);
    console.log("-----");
    console.log(ctx.chat.id);
    bot.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
});

bot.command("loser", ctx => {
    var resp = "Jij ja.";
    send(ctx, resp);
});

bot.command("mock", ctx => {
    var resp = mockContext(ctx);
    send(ctx, resp);
});

bot.command("sneakymock", ctx => {
    var resp = mockContext(ctx);
    send(ctx, resp, false, true);
});

bot.command("spongemock" , ctx => {
    var resp = mockContext(ctx);
    send(ctx, resp, true, true);
});

bot.command('tragedy', ctx => {
    var resp = mockString("Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not. It’s not a story the Jedi would tell you. It’s a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life… He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Ironic. He could save others from death, but not himself.");
    send(ctx, resp, false, true);
});

function mockContext(ctx) {
    console.log(ctx.message);
    
    var mockStart = ctx.message.text.indexOf(' ');
    
    if (ctx.message.reply_to_message != null) {
        if (ctx.message.reply_to_message.text != null) {
            var str = ctx.message.reply_to_message.text;
        } else if (ctx.message.reply_to_message.caption != null) {
            var str = ctx.message.reply_to_message.caption;
        } else {
            var str = "i can't mock that.";
        }
    } else if (mockStart > 0) {
        var str = ctx.message.text.slice(mockStart,ctx.message.text.length);
    } else if (mockStart == -1) {
        var str = "you need to give me something to mock, silly";
    }else {
        var str = "you messed something up.";
    }

    str = mockString(str);
    return str;
};

function mockString(str = "Someone fucked up.") {
    const sponge = "\u{1F9FD}";

    var split = str.toLowerCase().split("");

    for (i = 0; i < split.length; i++) {
        if (i % 2 === 0) {
            split[i] = split[i].toUpperCase();
        }
    }

    var resp = split.join("");
    resp = sponge.concat(resp).concat(sponge);
    
    return resp;
};

function send(ctx, resp, a = false, b = false) {
    // resp = text to send
    // a = true -> include image
    // b = true -> make sneaky
    
    if (a) {
        bot.telegram.sendPhoto(ctx.chat.id, {url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mocking-spongebob-1556133078.jpg"}, {caption: resp});
    } else {
        bot.telegram.sendMessage(ctx.chat.id, resp, {});
    }

    if (b) {
        bot.telegram.deleteMessage(ctx.chat.id, ctx.message.message_id);
    }
};

function checkAdmin(ctx) {
    var user = ctx.message.from.id;
    var isAdmin = false;

    for (i = 0; i < admins.length; i++) {
        if (user == admins[i]) {
            isAdmin = true;
            break;
        }
    }

    return isAdmin;
};

bot.launch();
console.log("Bot launched");

// SCHEDULING BONES DAY NOTIFICATION
// cron.schedule("* * * * * *", () => {
//     if (gaanWeLoesoe) {
//         console.log("We gaan loesoe");
//         bot.telegram.sendMessage(-1001707217121, "We gaan LOESOE");
//     }
// });
