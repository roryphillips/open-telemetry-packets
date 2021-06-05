const { Parser } = require('binary-parser');

const ResultStatus = {
    Invalid: 0,
    Inactive: 1,
    Active: 2,
    Finished: 3,
    Disqualified: 4,
    NotClassified: 5,
    Retired: 6
};

const finalClassificationData = new Parser()
    .uint8('position')
    .uint8('numLaps')
    .uint8('gridPosition')
    .uint8('points')
    .uint8('numPitStops')
    .uint8('resultStatus')
    .floatle('bestLapTime')
    .doublele('totalRaceTime')
    .uint8('penaltiesTime')
    .uint8('numPenalties')
    .uint8('numTyreStints')
    .array('tyreStints', {
        length: 8,
        type: new Parser().uint8('type')
    })
    .array('tyreStintsVisual', {
        length: 8,
        type: new Parser().uint8('type')
    });

const finalClassificationPacket = new Parser()
    .uint8('numCars')
    .array('classifications', {
        length: 22,
        type: finalClassificationData,
    });

module.exports = {
    FinalClassificationPacket: finalClassificationPacket,
    Enums: {
        ResultStatus,
    },
};