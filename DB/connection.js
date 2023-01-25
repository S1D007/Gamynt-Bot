const mongoose = require("mongoose")

const url = "mongodb+srv://bot_gmt:LLaVFoJDswbDXC1T@bot.czfqc72.mongodb.net/BOT?retryWrites=true&w=majority"

const connect = async () => {
    mongoose.connect(url).then((e)=>{
        console.log("Database Connected")
    })
}

module.exports = connect