const { Telegraf } = require("telegraf");

const token = "2065000283:AAGRq1ObTlb2NM-ObUVBL2438zjKXhklf2c";

const bot = new Telegraf(token);

bot.command("loser", ctx => {
    var resp = "Jij ja.";
    bot.telegram.sendMessage(ctx.chat.id, resp, {});
});

bot.command("mock", ctx => {
    var resp = mock(ctx);
    send(ctx, resp);
});

bot.command("sneakymock", ctx => {
    var resp = mock(ctx);
    send(ctx, resp, false, true);
});

bot.command("spongemock" , ctx => {
    var resp = mock(ctx);
    send(ctx, resp, true, true);
});

function mock(ctx) {
    console.log(ctx);
    console.log(ctx.message.text.length);
    console.log(ctx.message.text.indexOf(' '));

    var mockStart = ctx.message.text.indexOf(' ');

    const sponge = "\u{1F9FD}";

    if (ctx.message.reply_to_message != null) {
        if (ctx.message.reply_to_message.text != null) {
            var split = ctx.message.reply_to_message.text.toLowerCase().split("");
        } else if (ctx.message.reply_to_message.caption != null) {
            var split = ctx.message.reply_to_message.caption.toLowerCase().split("");
        } else {
            var split = "i can't mock that.".split("");
        }
    } else if (mockStart > 0) {
        var tempStr = ctx.message.text.slice(mockStart,ctx.message.text.length);
        var split = tempStr.split("");
    } else if (mockStart == -1) {
        var split = "you need to give me something to mock, silly".split("");
    }else {
        var split = "you messed something up.".split("");
    }

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