import { Player } from '../models/player';
import * as Discord from 'discord.js';

let players: Player[] = [];

export function Initialise(message: Discord.Message) {
    const messages: string[] = [];
    messages.push("Initialising");

    if (players.length > 0) {
        messages.push("Fate already initialised. Please use !reset before initialising a new session.");
        SendMessages(messages, message);
        return;
    }

    InitialisePlayers(message);
    SendMessages(messages, message);
}

export function Reset(message: Discord.Message) {
    players = [];
    message.reply("Fate reset. Use !init to initialise a new session.")
}

export function Chips(message: Discord.Message) {
    const messages: string[] = [];
    messages.push("There are " + players.length + " players");

    players.forEach(player => {
        messages.push(player.ID + " has " + player.ChipCount + " chips");
    });

    SendMessages(messages, message);
}

export function GiveChip(message: Discord.Message) {
    const messages: string[] = [];

    const regex = /<@\![0-9]+>/g;
    const matchedIDs = Array.from(message.content.matchAll(regex), m => m[0]);
    
    if (matchedIDs.length != 1) {
        messages.push("Expected 1 player, got " + matchedIDs.length + ". Correct usage is `!give <player>`.");
        SendMessages(messages, message);
        return;
    }

    const player = players.find(p => p.ID === matchedIDs[0]);
    player.ChipCount++;

    messages.push("Chip given to " + player.ID + ". They now have " + player.ChipCount + " chips.");
    SendMessages(messages, message);
}

export function TakeChip(message: Discord.Message) {
    const messages: string[] = [];
    
    const regex = /<@\![0-9]+>/g;
    const matchedIDs = Array.from(message.content.matchAll(regex), m => m[0]);
    
    if (matchedIDs.length != 1) {
        messages.push("Expected 1 player, got " + matchedIDs.length + ". Correct usage is `!give <player>`.");
        return;
    }

    const player = players.find(p => p.ID === matchedIDs[0]);
    player.ChipCount--;

    messages.push("Chip taken from " + player.ID + ". They now have " + player.ChipCount + " chips.");
    SendMessages(messages, message);
}

function InitialisePlayers(message: Discord.Message) {
    const regex = /<@\![0-9]+>/g;
    const matchedIDs = Array.from(message.content.matchAll(regex), m => m[0]);

    for (const matchedID of matchedIDs) {
        players.push(new Player(matchedID, 4));
    }
}

function GetChipStatusMessage(player: Player) {
    return (player.ID + " has " + player.ChipCount + " chips");
}

function SendMessages(messages: string[], message: Discord.Message) {
    const messageToSend = messages.join('\n');
    message.channel.send(messageToSend);
}