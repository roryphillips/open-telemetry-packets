const {Parser} = require('binary-parser');

const PacketType = {
    Motion: 0,
    Session: 1,
    LapData: 2,
    Event: 3,
    Participants: 4,
    CarSetups: 5,
    CarTelemetry: 6,
    CarStatus: 7,
    FinalClassification: 8,
    LobbyInfo: 9
};

const header = new Parser()
    .uint16le('packetFormat')
    .uint8('gameMajorVersion')
    .uint8('gameMinorVersion')
    .uint8('packetVersion')
    .uint8('packetId')
    .skip(8)
    .floatle('sessionTime')
    .uint32le('frameIdentifier')
    .uint8('playerCarIndex')
    .uint8('secondaryPlayerCarIndex');

module.exports = {
    Header: header,
    Enums: {
        PacketType,
    },
};
