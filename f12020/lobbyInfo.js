const { Parser } = require('binary-parser');

const lobbyPlayer = new Parser()
    .uint8('aiControlled')
    .uint8('teamId')
    .uint8('nationality')
    .string('name', {
        length: 48
    })
    .uint8('readyStatus');

const lobbyInfoPacket = new Parser()
    .uint8('numPlayers')
    .array('data', {
        length: 22,
        type: lobbyPlayer,
    });

module.exports = {
    LobbyInfoPacket: lobbyInfoPacket,
    Enums: {},
};
