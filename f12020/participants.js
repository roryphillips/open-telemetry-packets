const { Parser } = require('binary-parser');

const participantData = new Parser()
    .uint8('aiControlled')
    .uint8('driverId')
    .uint8('teamId')
    .uint8('raceNumber')
    .uint8('nationality')
    .string('name', {
        length: 48
    })
    .uint8('yourTelemetry');

const participantsPacket = new Parser()
    .uint8('numActiveCars')
    .array('participants', {
        length: 22,
        type: participantData
    })

module.exports = {
    ParticipantsPacket: participantsPacket,
    Enums: {}
}