import { SlashCommandBuilder } from "discord.js";
import type { CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Queries the bot");

export const execute = async (interaction: CommandInteraction) => {
    await interaction.reply("Pong!");
};