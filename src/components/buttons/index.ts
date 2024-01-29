import { ButtonBuilder, ButtonStyle } from "discord.js";

export class GostButtons extends ButtonBuilder {
  constructor(gostButtonLabel: string, gostButtonStyle: ButtonStyle) {
    super({
      label: gostButtonLabel,
      style: gostButtonStyle,
    });
  }
}
