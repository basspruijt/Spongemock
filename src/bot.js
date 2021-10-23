const { Telegraf } = require("telegraf");

const { token } = require("../token/token.js");

const bot = new Telegraf(token);

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
}

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
}

bot.launch();
console.log("Bot launched");
