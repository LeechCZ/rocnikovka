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
    .setName("roles5")
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
    // Second button
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
    )
    // Third button
    .addRoleOption((option) =>
      option
        .setName("role3")
        .setDescription("Selet role for the third button")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("emoji3")
        .setDescription("Emoji for the third button")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description3")
        .setDescription("Description for the third button")
        .setRequired(true)
    )
    // Fourth button
    .addRoleOption((option) =>
      option
        .setName("role4")
        .setDescription("Selet role for the fourth button")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("emoji4")
        .setDescription("Emoji for the fourth button")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description4")
        .setDescription("Description for the fourth button")
        .setRequired(true)
    )
    // Fifth button
    .addRoleOption((option) =>
      option
        .setName("role5")
        .setDescription("Selet role for the fifth button")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("emoji5")
        .setDescription("Emoji for the fifth button")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description5")
        .setDescription("Description for the fifth button")
        .setRequired(true)
    ),

  async execute(interaction) {
    // Button 1
    const role1 = interaction.options.getRole("role1");
    const emoji1 = interaction.options.getString("emoji1");
    const description1 = interaction.options.getString("description1");
    // Button 2
    const role2 = interaction.options.getRole("role2");
    const emoji2 = interaction.options.getString("emoji2");
    const description2 = interaction.options.getString("description2");
    // Button 3
    const role3 = interaction.options.getRole("role3");
    const emoji3 = interaction.options.getString("emoji3");
    const description3 = interaction.options.getString("description3");
    // Button 4
    const role4 = interaction.options.getRole("role4");
    const emoji4 = interaction.options.getString("emoji4");
    const description4 = interaction.options.getString("description4");
    // Button 5
    const role5 = interaction.options.getRole("role5");
    const emoji5 = interaction.options.getString("emoji5");
    const description5 = interaction.options.getString("description5");

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
        .setEmoji(emoji2),

      new ButtonBuilder()
        .setCustomId("button3")
        .setLabel(`${role3.name}`)
        .setStyle(ButtonStyle.Primary)
        .setEmoji(emoji3),

      new ButtonBuilder()
        .setCustomId("button4")
        .setLabel(`${role4.name}`)
        .setStyle(ButtonStyle.Primary)
        .setEmoji(emoji4),

      new ButtonBuilder()
        .setCustomId("button5")
        .setLabel(`${role5.name}`)
        .setStyle(ButtonStyle.Primary)
        .setEmoji(emoji5)
    );

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Select your roles")
      .setDescription(
        `
        ${emoji1} ${description1}\n
        ${emoji2} ${description2}\n
        ${emoji3} ${description3}\n
        ${emoji4} ${description4}\n
        ${emoji5} ${description5}\n
        `
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

      if (i.guild.members.me.roles.highest.position < role3.position) {
        return i.update({
          content: `I do not have permission to give you the role ${role3.name}`,
          embeds: [],
          components: [],
        });
      }

      if (i.guild.members.me.roles.highest.position < role4.position) {
        return i.update({
          content: `I do not have permission to give you the role ${role4.name}`,
          embeds: [],
          components: [],
        });
      }

      if (i.guild.members.me.roles.highest.position < role5.position) {
        return i.update({
          content: `I do not have permission to give you the role ${role5.name}`,
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

      if (i.customId === "button3") {
        if (i.member.roles.cache.has(role3.id)) {
          await i.member.roles.remove(role3);
          return i.reply({
            content: `You have been removed from the role ${role3.name}`,
            embeds: [],
            components: [],
            ephemeral: true,
          });
        } else {
          await i.member.roles.add(role3);
          return i.reply({
            content: `You have been added to the role ${role3.name}`,
            embeds: [],
            components: [],
            ephemeral: true,
          });
        }
      }

      if (i.customId === "button4") {
        if (i.member.roles.cache.has(role4.id)) {
          await i.member.roles.remove(role4);
          return i.reply({
            content: `You have been removed from the role ${role4.name}`,
            embeds: [],
            components: [],
            ephemeral: true,
          });
        } else {
          await i.member.roles.add(role4);
          return i.reply({
            content: `You have been added to the role ${role4.name}`,
            embeds: [],
            components: [],
            ephemeral: true,
          });
        }
      }

      if (i.customId === "button5") {
        if (i.member.roles.cache.has(role5.id)) {
          await i.member.roles.remove(role5);
          return i.reply({
            content: `You have been removed from the role ${role5.name}`,
            embeds: [],
            components: [],
            ephemeral: true,
          });
        } else {
          await i.member.roles.add(role5);
          return i.reply({
            content: `You have been added to the role ${role5.name}`,
            embeds: [],
            components: [],
            ephemeral: true,
          });
        }
      }
    });
  },
};
