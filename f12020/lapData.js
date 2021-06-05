const { Parser } = require('binary-parser');

const PitStatus = {
    None: 0,
    Pitting: 1,
    InPitArea: 2
};

const Sector = {
    Sector1: 0,
    Sector2: 1,
    Sector3: 2
};

const DriverStatus = {
    InGarage: 0,
    FlyingLap: 1,
    InLap: 2,
    OutLap: 3,
    OnTrack: 4
};

const ResultStatus = {
    Invalid: 0,
    Inactive: 1,
    Active: 2,
    Finished: 3,
    Disqualified: 4,
    NotClassified: 5,
    Retired: 6
};

const lap = new Parser()
    .uint16le('sector1')
    .uint16le('sector2')
    .uint16le('sector3');

const lapRecord = new Parser()
    .uint16le('time')
    .uint8('lap');

const bestSectors = new Parser()
    .nest('sector1', {
        type: lapRecord,
    })
    .nest('sector2', {
        type: lapRecord
    })
    .nest('sector3', {
        type: lapRecord
    });

const lapData = new Parser()
    .floatle('lastLapTime')
    .floatle('currentLapTime')
    .uint16le('sector1Time')
    .uint16le('sector2Time')
    .floatle('bestLapTime')
    .uint8('bestLapNum')
    .nest('bestLap', {
        type: lap
    })
    .nest('bestSectors', {
        type: bestSectors
    })
    .floatle('lapDistance')
    .floatle('totalDistance')
    .floatle('safetyCarDelta')
    .uint8('carPosition')
    .uint8('currentLapNum')
    .uint8('pitStatus')
    .uint8('sector')
    .uint8('currentLapInvalid')
    .uint8('penalties')
    .uint8('gridPosition')
    .uint8('driverStatus')
    .uint8('resultStatus');

const lapDataPacket = new Parser()
    .array('laps', {
        length: 22,
        type: lapData,
    });

module.exports = {
    LapDataPacket: lapDataPacket,
    Enums: {
        PitStatus,
        Sector,
        DriverStatus,
        ResultStatus,
    },
};