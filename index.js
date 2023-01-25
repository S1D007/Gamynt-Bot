const token = "MTA2NzEwMDU5OTU2MjI4NTIwNw.G3IYgl.jM_bdKuPI2hjnU01l6rWflrVk6v0hVl3a0XW4M";
const prompt = require("./openai")
const axios = require("axios")
const connect = require("./DB/connection")
const { Client, Intents, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: ["Messages", "Channels", "GuildMembers", "User", "Reaction"]
});

const sendErrorMessage = (message) => {
    message.channel.send("Something went wrong!");
}

client.on("ready", () => {
    connect()
    console.log("Bot Online");
});

const url = `https://api.giphy.com/v1/gifs/search?api_key=ipi4wViu8qYxxF4jguT7en90TayqPL02&limit=5`;
client.on("messageCreate", (message) => {
    const msg = message.content.toLowerCase();
    if (msg.startsWith("gmt h")) {
        message.channel.send("Welcome to Gamynt \nThis bot is under Development\n Type `gmt pc <Your Message to Bot>`\n Type `gmt g <Your Prompt>` to get GIF related to Your Prompt\n Type `gmt advice` to Get Free Advice");
    }
    if (msg.startsWith("gmt clear")) {
        try {
            const num = msg.replace("gmt clear", "")
            console.log(num)
            message.channel.bulkDelete(100)
            message.channel.send("cleaned 100 messages succesfully")
        } catch (e) {
            sendErrorMessage(message);
        }
    }
    if (msg.startsWith("gmt g")) {
        try {
            const random = Math.floor(Math.random() * 5)

            axios.get(`${url}&q=${message.content.replace("gmt g ", "")}`)
                .then(({ data }) => {
                    const { images } = data.data[random];
                    message.channel.send(images.original.webp)
                })
        } catch (e) {
            sendErrorMessage(message);
        }
    }
    // console.log(message.author.bot)
    if (!msg.startsWith("owo"||"@"||"?"||"/"||" ")&&message.author.username !== client.user.username && !message.author.bot) {
        message.channel.sendTyping()
        const p = message.content.replace("gmt c ", "");
        prompt(p).then((e) => message.reply(e)).catch(() => sendErrorMessage(message));
    }
});
client.login(token);
