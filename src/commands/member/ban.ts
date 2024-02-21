import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import type { APIInteractionGuildMember, ChatInputCommandInteraction, User, GuildMember } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans the specified user")
    .addUserOption(option => option.setName("target")
        .setDescription("The user to ban")
        .setRequired(true)
    )
    .addStringOption(option => option.setName("reason")
        .setDescription("The reason specified for the kick")
    )
    .addBooleanOption(option => option.setName("alert")
        .setDescription("Whether the user should be alerted by the bot")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false);

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const moderator: GuildMember | APIInteractionGuildMember | null  = interaction.member;
    const target: User | null = interaction.options.getUser("target");
    const guildMember: GuildMember | undefined = await interaction.guild?.members.fetch(target as User);

    const reason: string = interaction.options.getString("reason") ?? "No reason was provided.";
    const willAlert: boolean = interaction.options.getBoolean("alert") ?? false;

    switch(guildMember?.bannable) {
        case true: {
            const embedData = {
                color: 0xff284c,
                title: "Member banned",
                author: { 
                    name: "espresso", 
                    iconURL: "https://i.imgur.com/AfFp7pu.png" 
                },
                description: "Member banned successfully, data provided:",
                fields: [
                    {
                        name: "Member",
                        value: target?.username as string,
                        inline: true
                    },
                    {
                        name: "Reason",
                        value: reason,
                        inline: true
                    },
                ],
                thumbnail: {
                    url: "https://i.imgur.com/AfFp7pu.png",
                },
                timestamp: new Date().toISOString(),
            }

            guildMember?.ban({reason: `Banned by ${moderator?.user.username}\nReason provided: "${reason}"`})
                .catch(console.error);

            if (willAlert) {
                const embedMessageData = {
                    color: 0xff284c,
                    title: "You've been banned",
                    author: { name: "espresso", iconURL: "https://i.imgur.com/AfFp7pu.png" },
                    description: `You were banned in ${interaction.guild?.name}, data provided:`,
                    fields: [
                        {
                            name: "Moderator",
                            value: moderator?.user.username as string,
                            inline: true
                        },
                        {
                            name: "Reason",
                            value: reason,
                            inline: true
                        }
                    ],
                    timestamp: new Date().toISOString()
                }
                guildMember.send({embeds: [embedMessageData]});
            }

            await interaction.reply({embeds: [embedData]})
            break; 
        }
        case false: {
            await interaction.reply("I don't seem to have the permissions to kick this user.")
            break;
        }
        default: {
            await interaction.reply("Failed to kick this user!");
            break;
        }
    };
};