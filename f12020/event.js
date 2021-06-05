const { Parser } = require('binary-parser');

const EventType = {
    SessionStarted: "SSTA",
    SessionEnded: "SEND",
    FastestLap: "FTLP",
    Retirement: "RTMT",
    DRSEnabled: "DRSE",
    DRSDisabled: "DRSD",
    TeamMateInPits: "TMPT",
    ChequeredFlag: "CHQF",
    RaceWinner: "RCWN",
    PenaltyIssued: "PENA",
    SpeedTrapTriggered: "SPTP"
}

const fastestLap = new Parser()
    .uint8('vehicleIdx')
    .floatle('lapTime');

const vehicleEvent = new Parser()
    .uint8('vehicleIdx');

const penalty = new Parser()
    .uint8('penaltyType')
    .uint8('infringementType')
    .uint8('vehicleIdx')
    .uint8('otherVehicleIdx')
    .uint8('time')
    .uint8('lapNum')
    .uint8('placesGained');

const speedTrap = new Parser()
    .uint8('vehicleIdx')
    .floatle('speed');

const eventPacket = new Parser()
    .string('stringCode', {
        length: 4
    })
    .nest('fastestLap', {
        type: fastestLap
    })
    .nest('retirement', {
        type: vehicleEvent
    })
    .nest('teamMateInPits', {
        type: vehicleEvent
    })
    .nest('raceWinner', {
        type: vehicleEvent
    })
    .nest('penalty', {
        type: penalty
    })
    .nest('speedTrap', {
        type: speedTrap
    });

module.exports = {
    EventPacket: eventPacket,
    Enums: {
        EventType
    }
};
