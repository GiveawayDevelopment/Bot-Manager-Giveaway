const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

const Discord = require('discord.js');
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]})
const fs = require('fs')
const prefix = ""
client.commands = new Discord.Collection()
const commands = fs.readdirSync("./commands").filter(file => file.endsWith("js"))
for (file of commands) {
  const commandName = file.split(".")[0]
  const command = require(`./commands/${commandName}`)
  client.commands.set(commandName, command)
}

client.on("messageCreate", message => {
if(message.content.startsWith(prefix)) {
  const args = message.content.slice(prefix.length).trim().split(/ + /g)
  const commandName = args.shift()
  const command = client.commands.get(commandName)
  if(!command) return
  client.run(client, message, args)
}
});
client.login(process.env.token)
