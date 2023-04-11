const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a member")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The reason for the ban")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const banMember = await interaction.guild.members.fetch(target.id);
    const reason = interaction.options.getString("reason") ?? "No reason given";

    if (!banMember.bannable)
      return await interaction.reply({
        content: "I can't ban that member",
        ephemeral: true,
      });
    await interaction.reply(`${target.tag} has been banned for ${reason}`);
    await interaction.guild.members.ban(target, { reason }).catch((err) => {
      console.log(err);
      return interaction.reply({
        content: "There was an error trying to ban that member",
        ephemeral: true,
      });
    });
  },
};
