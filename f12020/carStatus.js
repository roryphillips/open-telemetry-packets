const {Parser} = require('binary-parser');
const {CarQuadrants} = require('./common');

const TyreCompound = {
    C5: 16,
    C4: 17,
    C3: 18,
    C2: 19,
    C1: 20,
    Intermediate: 7,
    Wet: 8,
    ClassicDry: 9,
    ClassicWet: 10,
    F2SuperSoft: 11,
    F2Soft: 12,
    F2Medium: 13,
    F2Hard: 14,
    F2Wet: 15
};

const VisualTyreCompound = {
    Soft: 16,
    Medium: 17,
    Hard: 18,
    Intermediate: 7,
    Wet: 8,
    ClassicDry: 9,
    ClassicWet: 10,
    F2SuperSoft: 11,
    F2Soft: 12,
    F2Medium: 13,
    F2Hard: 14,
    F2Wet: 15
};

const driverControls = new Parser()
    .uint8('tractionControl')
    .uint8('antiLockBrakes')
    .uint8('fuelMix')
    .uint8('frontBrakeBias')
    .uint8('pitLimiterStatus');

const fuel = new Parser()
    .floatle('inTank')
    .floatle('capacity')
    .floatle('remainingLaps')

const carCapabilities = new Parser()
    .uint16le('maxRPM')
    .uint16le('idleRPM')
    .uint8('maxGears')
    .uint8('drsAllowed');

const tyres = new Parser()
    .nest('tyreWear', {
        type: CarQuadrants.Uint8
    })
    .uint8('tyreCompound')
    .uint8('visualTyreCompound')
    .uint8('tyreAgeLaps');

const damage = new Parser()
    .nest('tyre', {
        type: CarQuadrants.Uint8
    })
    .uint8('frontLeftWing')
    .uint8('frontRightWing')
    .uint8('rearWing')
    .uint8('drsFault')
    .uint8('engine')
    .uint8('gearBox');

const ers = new Parser()
    .floatle('storeEnergy')
    .uint8('deployMode')
    .floatle('harvestedMGUK')
    .floatle('harvestedMGUH')
    .floatle('deployed');

const carStatusData = new Parser()
    .nest('driverControls', {
        type: driverControls,
    })
    .nest('fuel', {
        type: fuel,
    })
    .nest('carCapabilities', {
        type: carCapabilities,
    })
    .uint16le('drsActivationDistance')
    .nest('tyres', {
        type: tyres,
    })
    .nest('damage', {
        type: damage
    })
    .int8('vehicleFiaFlags')
    .nest('ers', {
        type: ers
    });

const carStatusPacket = new Parser()
    .array('data', {
        length: 22,
        type: carStatusData
    });

module.exports = {
    CarStatusPacket: carStatusPacket,
    Enums: {
        TyreCompound,
        VisualTyreCompound,
    },
};