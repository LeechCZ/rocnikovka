const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a member")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The reason for the kick")
    )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
    )
    .setDMPermission(false),
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const kickMember = await interaction.guild.members.fetch(target.id);
    const reason = interaction.options.getString("reason") ?? "No reason given";

    if (!kickMember.kickable)
      return await interaction.reply({
        content: "I can't kick that member",
        ephemeral: true,
      });
      
    await interaction.reply(`${target.tag} has been kicked for ${reason}`);
    await interaction.guild.members.kick(target, { reason });
  },
};
