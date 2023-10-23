const { SlashCommandBuilder } = require('discord.js');

module.exports = {
data: new SlashCommandBuilder()
    .setName('playlist')
    .setDescription('Ouça a playlist de estudos'),

async execute(interaction) {
    await interaction.reply('https://open.spotify.com/playlist/37i9dQZF1DX4dyzvuaRJ0n?si=f3a3027aa3924296')
}
}