const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spsmbsearch")
    .setDescription("Posts a link to SPSMB homepage or searched query")
    .addStringOption((option) =>
      option.setName("query").setDescription("Query")
    ),

  async execute(interaction) {
    const topic = interaction.options.getString("query");
    if (!topic) {
      await interaction.reply("https://www.spsmb.cz/");
    } else {
      await interaction.reply(`https://www.spsmb.cz/?s=${topic}`);
    }
  },
};
