import { SlashCommandBuilder } from "discord.js";
import type { ChatInputCommandInteraction, User } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Get information for the specified user")
    .addUserOption(option => option.setName("user")
        .setDescription("The user to identify")
        .setRequired(true)
    )
    .setDMPermission(false);

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const target: User = interaction.options.getUser("user") as User;
    const creationDate = target.createdAt.toUTCString();

    const embedData = {
        color: 0xa0e362,
        title: "User Information",
        author: { 
            name: "espresso", 
            iconURL: "https://i.imgur.com/AfFp7pu.png"
        },
        description: `Information for ${target}`,
        fields: [
            {
                name: "Username",
                value: target.username,
                inline: true
            },
            {
                name: "Display Name",
                value: target.displayName,
                inline: true
            },
            {
                name: "Account Created",
                value: creationDate,
                inline: false
            },
        ],
        footer: { text: `User ID ${target.id}` },
        thumbnail: { "url": `${ target?.avatarURL( { extension: "png" } ) }` },
        timestamp: new Date().toISOString()
    };

    await interaction.reply({ embeds: [embedData] });
};