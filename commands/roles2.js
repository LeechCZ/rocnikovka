const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roles2")
    .setDescription("Message with buttons to select roles")
    // First button
    .addRoleOption((option) =>
      option
        .setName("role1")
        .setDescription("Selet role for the first button")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("emoji1")
        .setDescription("Emoji for the first button")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description1")
        .setDescription("Description for the first button")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role2")
        .setDescription("Selet role for the second button")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("emoji2")
        .setDescription("Emoji for the second button")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description2")
        .setDescription("Description for the second button")
        .setRequired(true)
    ),

  async execute(interaction) {
    const role1 = interaction.options.getRole("role1");
    const emoji1 = interaction.options.getString("emoji1");
    const description1 = interaction.options.getString("description1");

    const role2 = interaction.options.getRole("role2");
    const emoji2 = interaction.options.getString("emoji2");
    const description2 = interaction.options.getString("description2");

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    ) {
      return interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("button1")
        .setLabel(`${role1.name}`)
        .setStyle(ButtonStyle.Primary)
        .setEmoji(emoji1),

      new ButtonBuilder()
        .setCustomId("button2")
        .setLabel(`${role2.name}`)
        .setStyle(ButtonStyle.Primary)
        .setEmoji(emoji2)
    );

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Select your roles")
      .setDescription(
        `${emoji1} ${description1}\n ${emoji2} ${description2}\n`
      );

    await interaction.reply({ embeds: [embed], components: [button] });

    const collector =
      await interaction.channel.createMessageComponentCollector();

    collector.on("collect", async (i) => {
      if (i.guild.members.me.roles.highest.position < role1.position) {
        return i.update({
          content: `I do not have permission to give you the role ${role1.name}`,
          embeds: [],
          components: [],
        });
      }

      if (i.guild.members.me.roles.highest.position < role2.position) {
        return i.update({
          content: `I do not have permission to give you the role ${role2.name}`,
          embeds: [],
          components: [],
        });
      }

      if (i.customId === "button1") {
        if (i.member.roles.cache.has(role1.id)) {
          await i.member.roles.remove(role1);
          return i.reply({
            content: `You have been removed from the role ${role1.name}`,
            embeds: [],
            components: [],
            ephemeral: true,
          });
        } else {
          await i.member.roles.add(role1);
          return i.reply({
            content: `You have been added to the role ${role1.name}`,
            embeds: [],
            components: [],
            ephemeral: true,
          });
        }
      }

      if (i.customId === "button2") {
        if (i.member.roles.cache.has(role2.id)) {
          await i.member.roles.remove(role2);
          return i.reply({
            content: `You have been removed from the role ${role2.name}`,
            embeds: [],
            components: [],
            ephemeral: true,
          });
        } else {
          await i.member.roles.add(role2);
          return i.reply({
            content: `You have been added to the role ${role2.name}`,
            embeds: [],
            components: [],
            ephemeral: true,
          });
        }
      }
    });
  },
};
