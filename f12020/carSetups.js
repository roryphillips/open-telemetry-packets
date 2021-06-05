const { Parser } = require('binary-parser');
const { CarBalance, CarQuadrants } = require('./common');

const diff = new Parser()
    .uint8('onThrottle')
    .uint8('offThrottle');

const alignment = new Parser()
    .nest('camber', {
        type: CarBalance.Float
    })
    .nest('toe', {
        type: CarBalance.Float
    });

const suspension = new Parser()
    .nest('strength', {
        type: CarBalance.Uint8
    })
    .nest('antiRollBar', {
        type: CarBalance.Uint8
    })
    .nest('height', {
        type: CarBalance.Uint8
    });

const brakes = new Parser()
    .uint8('pressure')
    .uint8('bias');

const carSetup = new Parser()
    .nest('wing', {
        type: CarBalance.Uint8,
    })
    .nest('diff', {
        type: diff,
    })
    .nest('alignment', {
        type: alignment,
    })
    .nest('suspension', {
        type: suspension,
    })
    .nest('brakes', {
        type: brakes
    })
    .nest('typePressure', {
        type: CarQuadrants.Float
    })
    .uint8('ballast')
    .floatle('fuelLoad');

const carSetupsPacket = new Parser()
    .array('setups', {
        length: 22,
        type: carSetup
    });

module.exports = {
    CarSetupsPacket: carSetupsPacket,
    Enums: {}
}