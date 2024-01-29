import { EmbedBuilder } from "discord.js";

export class GostInfoEmbed extends EmbedBuilder {
  constructor() {
    super({
      color: 0x0099ff,
      title: "Conheça a G.O.S.T <:Gost2:1187452556276936804>",
      // author: {
      //   name: "Comando G.O.S.T",
      // },
      // description:
      //   "O que você acha de fazer parte da elite da nosso corporação? Apresento a vocês a G.O.S.T",
      fields: [
        {
          name: "<:armaL:1187452710639915130> Deem as boas-vindas à sua inevitável submissão, mortais insensatos, preparem seus corpos por que suas almas ja nos pertence! <:armaR:1187452787307585627>",
          value: "",
        },
        {
          name: "",
          value:
            "<:Gost1:1187452959093698641> Sujeite-se a responder às nossas indagações, e talvez, apenas talvez, será considerado digno o suficiente para integrar as fileiras dos escolhidos. <:Gost1:1187452959093698641>",
        },
        // { name: "Inline field title", value: "Some value here", inline: true },
      ],
      footer: {
        text: "Ass. Comando G.O.S.T",
      },
    });
  }

  setThumbnail(url: string | null): this {
    return super.setThumbnail(url);
  }
}
