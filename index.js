const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
//dotenv
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

//Importação dos comandos
const fs = require('node:fs')
const path = require('node:path')

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`Esse comando em ${filePath} esta com "data" ou "execute" ausentes`)
    }
}

client.once(Events.ClientReady, c => { console.log(`Ready! Logged in as ${c.user.tag}`) });

client.login(TOKEN);

// Listenner de interaçoes com o bot
client.on(Events.InteractionCreate, async interacation => {

    if (interacation.isStringSelectMenu()) {
        const selected = interacation.values[0];
        switch (selected) {
            case 'javascript':
                await interacation.reply('documentaçao do Javascript:https://developer.mozilla.org/pt-BR/docs/Web/JavaScript')
                break;
            case 'python':
                await interacation.reply('documentaçao do Python:https://www.python.org')
                break;
            case 'csharp': await interacation.reply('documentaçao do c#:https://learn.microsoft.com/en-us/dotnet/csharp/')
                break;
            case 'discordjs': await interacation.reply('documentaçao do discord.js:https://discordjs.guide/#before-you-begin')
                break;
        }

    }

    if (!interacation.isChatInputCommand()) return

    const command = interacation.client.commands.get(interacation.commandName)
    if (!command) {
        console.error('comando não encontrado')
        return
    }
    try {
        await command.execute(interacation)
    }
    catch {
        console.error(error)
    }
})