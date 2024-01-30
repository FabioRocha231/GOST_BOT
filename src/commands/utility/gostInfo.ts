import {
  CommandInteraction,
  SlashCommandBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  PermissionFlagsBits,
} from "discord.js";
import { GostInfoEmbed } from "../../components/embeds/gostInfo";
import { GostButtons } from "../../components/buttons/";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gost_announcement")
    .setDescription("Anuncio gost")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers),

  async execute(interaction: CommandInteraction) {
    const meetGost = new GostButtons("Sobre a G.O.S.T", ButtonStyle.Link)
      .setEmoji({ name: "Gost2", id: "1187452556276936804" })
      .setURL(
        "https://discord.com/channels/1057349671716130997/1191070036094361752",
      );

    const announcementGost = new GostButtons(
      "Video apresentação",
      ButtonStyle.Primary,
    )
      .setEmoji({ name: "Gost2", id: "1187452556276936804" })
      .setCustomId("announcement");

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      meetGost,
      announcementGost,
    );

    await interaction.reply({
      embeds: [new GostInfoEmbed().setThumbnail(interaction.guild?.iconURL()!)],
      components: [row],
    });
  },
};
