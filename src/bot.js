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
    console.log(ctx.from);
    console.log("Sent by: " + ctx.from.first_name + " " + ctx.from.last_name + " // " + ctx.from.username);

    var mockStart = ctx.message.text.indexOf(' ');

    const sponge = "\u{1F9FD}";

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