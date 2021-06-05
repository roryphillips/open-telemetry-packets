const { Parser } = require('binary-parser');

const vector3Int16 = new Parser()
    .int16le('x')
    .int16le('y')
    .int16le('z');

const vector3Float = new Parser()
    .floatle('x')
    .floatle('y')
    .floatle('z');

const carBalanceFloat = new Parser()
    .floatle('front')
    .floatle('rear');

const carBalanceUint8 = new Parser()
    .uint8('front')
    .uint8('rear');

const carQuadrantsFloat = new Parser()
    .floatle('rearLeft')
    .floatle('rearRight')
    .floatle('frontLeft')
    .floatle('frontRight');

const carQuadrantsUint8 = new Parser()
    .uint8('rearLeft')
    .uint8('rearRight')
    .uint8('frontLeft')
    .uint8('frontRight');

const carQuadrantsUint16 = new Parser()
    .uint16le('rearLeft')
    .uint16le('rearRight')
    .uint16le('frontLeft')
    .uint16le('frontRight');

const gForce = new Parser()
    .floatle('lateral')
    .floatle('longitudinal')
    .floatle('vertical');

const rotation =  new Parser()
    .floatle('yaw')
    .floatle('pitch')
    .floatle('roll');

module.exports = {
    Vector3: {
        Int16: vector3Int16,
        Float: vector3Float,
    },
    CarQuadrants: {
        Float: carQuadrantsFloat,
        Uint16: carQuadrantsUint16,
        Uint8: carQuadrantsUint8
    },
    CarBalance: {
        Float: carBalanceFloat,
        Uint8: carBalanceUint8,
    },
    GForce: gForce,
    Rotation: rotation,
};
