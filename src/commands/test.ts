import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";
import { CommandInt } from "../interfaces/CommandInt";
import { getUserData } from "../modules/getUserData";
import { updateUserData } from "../modules/updateUserData";

export const test: CommandInt = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Test the bot.")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to go in your test update.")
        .setRequired(true)
    ),
  run: async (interaction) => {
    await interaction.deferReply();
    const { user } = interaction;
    const text = interaction.options.get("message", true).value as string;

    const targetUser = await getUserData(user.id);
    const updatedUser = await updateUserData(targetUser);

    const testEmbed = new EmbedBuilder();
    testEmbed.setTitle("Basic Embed");
    testEmbed.setDescription(text);
    testEmbed.setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL(),
    });
    testEmbed.addFields(
      { name: "Round", value: updatedUser.round.toString(), inline: true },
      { name: "Day", value: updatedUser.day.toString(), inline: true }      
    );
    testEmbed.setFooter({
      text:
        "Day completed: " +
        new Date(updatedUser.timestamp).toLocaleDateString(),
    });

    await interaction.editReply({ embeds: [testEmbed] });
  },
};

