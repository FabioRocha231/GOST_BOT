import {
  ActionRowBuilder,
  CommandInteraction,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
module.exports = {
  // data: {
  //   customId: "registration",
  //   title: "shows a registration modal",
  // },
  data: new SlashCommandBuilder()
    .setName("registration")
    .setDescription("shows a registration modal")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers),

  async execute(interaction: CommandInteraction) {
    const modal = new ModalBuilder({
      title: "Registro",
      customId: "Você passará pelo vale da sombra da morte",
    });

    const nameAndID = new TextInputBuilder()
      .setCustomId("nameAndID")
      .setLabel("Nome e ID")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const age = new TextInputBuilder()
      .setCustomId("age")
      .setLabel("Qual sua idade")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const necessaryCourse = new TextInputBuilder()
      .setCustomId("necessaryCourse")
      .setLabel("Você tem o curso (C.M.R) ?")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const gostQuestion = new TextInputBuilder()
      .setCustomId("gostQuestion")
      .setLabel("Porque você quer entrar para a G.O.S.T?")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const gostRepresentation = new TextInputBuilder()
      .setCustomId("gostRepresentation")
      .setLabel("oque a GOST representa pra você?")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const inputs = [
      nameAndID,
      age,
      necessaryCourse,
      gostQuestion,
      gostRepresentation,
    ].map((inputs) => {
      return new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        inputs,
      );
    });

    modal.addComponents(...inputs);

    await interaction.showModal(modal);
  },
};
export class registration extends ModalBuilder {
  public execute() {}
}
