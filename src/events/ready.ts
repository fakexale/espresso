import { Events } from "discord.js";
import type { Client } from "discord.js";

export const name = Events.ClientReady;
export const once = true;

export const execute = (client: Client<true>) => {
    console.log(`Ready as ${client.user.displayName}`);
}