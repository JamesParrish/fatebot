import { Player } from './models/player';
import { Initialise, Chips, GiveChip, TakeChip, Reset } from './magic/chips'
import * as Discord from 'discord.js';

const client = new Discord.Client();

const config = require('./fatebot.config.json');
const { createThisTypeNode } = require('typescript');

const chips: Player[] = [];

client.once('ready', () => {
    if (!client.user) {
        client.channels.fetch
    } else {
        console.log('Boot successful. Model ' + client.user.tag + ' online.');
    }
});

client.on('message', (msg: Discord.Message) => {
    if (msg.content === 'I am not a Cylon') {
        msg.reply('Oh snap, neither am I!');
    } else if (msg.content.startsWith('!init')) {
        Initialise(msg);
    } else if (msg.content.startsWith('!chips')) {
        Chips(msg);
    } else if (msg.content.startsWith('!give')) {
        GiveChip(msg);
    } else if (msg.content.startsWith('!take')) {
        TakeChip(msg);
    } else if (msg.content === '!reset') {
        Reset(msg);
    } else if (msg.content === '!help' || msg.content === '!commands') {
        msg.reply('Commands are:\n\n`!init [players]` - Start a new session with the specified players\n`!chips` - Show the current chip status\n`!give <player>` - Give a chip to the player\n`!take <player>` - Take a chip from the player\n`!reset` - End the session\n\nAll player commands (eg !initialise, !give) use @ tagging');
    }
});

client.login(config.token);