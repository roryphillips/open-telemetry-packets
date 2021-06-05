const {Parser} = require('binary-parser');
const {Header, Enums: HeaderEnums} = require('./header');
const {MotionPacket} = require('./motion');
const {SessionPacket, Enums: SessionEnums} = require('./session');
const {LapDataPacket, Enums: LapDataEnums} = require('./lapData');
const {EventPacket, Enums: EventEnums} = require('./event');
const {ParticipantsPacket} = require('./participants');
const {CarSetupsPacket} = require('./carSetups');
const {CarTelemetryPacket, Enums: CarTelemetryEnums} = require('./carTelemetry');
const {CarStatusPacket, Enums: CarStatusEnums} = require('./carStatus');
const {FinalClassificationPacket, Enums: FinalClassificationEnums} = require('./finalClassification');
const {LobbyInfoPacket, Enums: LobbyInfoEnums} = require('./lobbyInfo');

const packet = new Parser()
    .nest('header', {
        type: Header
    })
    .choice('packet', {
        tag: "header.packetId",
        choices: {
            [HeaderEnums.PacketType.Motion]: MotionPacket,
            [HeaderEnums.PacketType.Session]: SessionPacket,
            [HeaderEnums.PacketType.LapData]: LapDataPacket,
            [HeaderEnums.PacketType.Event]: EventPacket,
            [HeaderEnums.PacketType.Participants]: ParticipantsPacket,
            [HeaderEnums.PacketType.CarSetups]: CarSetupsPacket,
            [HeaderEnums.PacketType.CarTelemetry]: CarTelemetryPacket,
            [HeaderEnums.PacketType.CarStatus]: CarStatusPacket,
            [HeaderEnums.PacketType.FinalClassification]: FinalClassificationPacket,
            [HeaderEnums.PacketType.LobbyInfo]: LobbyInfoPacket,
        },
    });

module.exports = {
    Packet: packet,
    Enums: {
        Header: HeaderEnums,
        Session: SessionEnums,
        LapData: LapDataEnums,
        Event: EventEnums,
        CarTelemetry: CarTelemetryEnums,
        CarStatus: CarStatusEnums,
        FinalClassification: FinalClassificationEnums,
        LobbyInfo: LobbyInfoEnums,
    },
};
