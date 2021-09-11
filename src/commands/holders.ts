import { SlashCommand} from 'slash-create';
import {MillionStatsService} from '../services/MillionStatsService';
import * as Discord from 'discord.js';

module.exports = class HelloCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'holders',
      description: 'Get holder count (as a millionaire).',
      guildIDs: [process.env.GUILD_ID],
    });

    // Not required initially, but required for reloading with a fresh file.
    this.filePath = __filename;
  }

  async run(ctx) {
    let exampleEmbed;
    try {
      exampleEmbed = new Discord.MessageEmbed()
            .setColor('#C51162')//Pink50 (A700)
            .addField(
              `Getting Holder's Count...`, `\u200B`,
              false
            );
      const msg = await ctx.send({embeds: [exampleEmbed], ephemeral: true}).then(async (msg) =>{
        //your code here! msg.edit will work here.
        const {data, hasError, error} = await MillionStatsService.getHolders();
      if (hasError) throw error;

      exampleEmbed = new Discord.MessageEmbed()
            .setColor('#C51162')//Pink50 (A700)
            .addField(
              `Total MM Hodlers <:pepeholdmm:861835461458657331>`, 
              `${data.totalHodlers}`, 
              false
            )
            .addField(
              `Uniswap`,
              data.uniswap,
              false
            )
            .addField(
              'BSC',
              data.bsc,
              false
            )
            .addField(
              'Polygon',
              data.polygon,
              false
            )
            .addField(
              'Solana',
              data.solana,
              false
            );
        await msg.edit({embeds: [exampleEmbed], ephemeral: true})
    })

    /*
      const {data, hasError, error} = await MillionStatsService.getHolders();
      if (hasError) throw error;

      exampleEmbed = new Discord.MessageEmbed()
            .setColor('#C51162')//Pink50 (A700)
            .addField(
              `Total MM Hodlers <:pepeholdmm:861835461458657331>`, 
              `${data.totalHodlers}`, 
              false
            )
            .addField(
              `Uniswap`,
              data.uniswap,
              false
            )
            .addField(
              'BSC',
              data.bsc,
              false
            )
            .addField(
              'Polygon',
              data.polygon,
              false
            )
            .addField(
              'Solana',
              data.solana,
              false
            );
            
            await msg.edit({embeds: [exampleEmbed], ephemeral: true})
        //await ctx.send({embeds: [exampleEmbed], ephemeral: true});
        */
    } catch (error) {
      console.log('"holders" command error: \n', error);
      exampleEmbed = new Discord.MessageEmbed()
      .setColor('#C51162')//Pink50 (A700)
      .addField(`Something went wrong`, `try again a bit later.`)
      await ctx.send({embeds: [exampleEmbed], ephemeral: true});
    }
  }
};
