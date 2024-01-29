import {
  BitFieldResolvable,
  Client,
  Collection,
  Events,
  GatewayIntentsString,
  IntentsBitField,
  Partials,
  REST,
  InteractionType,
  Routes,
} from "discord.js";
import dotenv from "dotenv";
import path from "node:path";
import * as fs from "fs";
dotenv.config();

class ExtendedClient extends Client {
  private commandsToPUT: Array<any>;
  public commands: Collection<string, any>;
  constructor() {
    super({
      intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<
        GatewayIntentsString,
        number
      >,
      partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildScheduledEvent,
        Partials.Reaction,
        Partials.GuildMember,
        Partials.ThreadMember,
        Partials.User,
      ],
    });
    this.commandsToPUT = [];

    this.commands = new Collection();
  }
  public async start() {
    await this.login(process.env.DISCORD_TOKEN);
  }

  commandsFilter = (filename: string) =>
    filename.endsWith(".ts") || filename.endsWith(".js");

  public loadCommands() {
    const foldersPath = path.join(__dirname, "..", "commands");
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter(this.commandsFilter);

      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ("data" in command && "execute" in command) {
          this.commandsToPUT.push(command.data.toJSON());
          this.commands.set(command.data.name, command);
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
          );
        }
      }
    }
  }

  public async registerCommands() {
    const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

    await (async () => {
      try {
        console.log(`Started refreshing application (/) commands.`);
        await rest.put(
          Routes.applicationCommands(process.env.APPLICATION_ID!),
          { body: this.commandsToPUT },
        );

        console.log(`Commandos reiniciados com sucesso!.`);
      } catch (e) {
        console.error(e);
      }
    })();
  }

  public async interactionsObserver() {
    this.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const command = this.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`,
        );
        return;
      }

      if (command) {
        try {
          await command.execute(interaction);
        } catch (error) {
          console.error(error);
          if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
              content: "There was an error while executing this command!",
              ephemeral: true,
            });
          } else {
            await interaction.reply({
              content: "There was an error while executing this command!",
              ephemeral: true,
            });
          }
        }
      }
    });
  }

  public async eternalResponses() {
    this.on(Events.InteractionCreate, async (interaction) => {
      if (interaction.type !== InteractionType.MessageComponent) return;
      const commandId = interaction?.customId!;

      if (commandId === "announcement") {
        try {
          await interaction.reply({
            files: ["./src/assets/ABERTURA_G.O.S.T.mp4"],
            ephemeral: true,
          });
          return;
        } catch (e) {
          console.error(e);
        }
      }
    });
  }
}

export const gostClient = new ExtendedClient();
