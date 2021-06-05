const { Parser } = require('binary-parser');
const { CarQuadrants } = require('./common');

const MDFPanel = {
    Closed: 255,
    CarSetup: 0,
    Pits: 1,
    Damage: 2,
    Engine: 3,
    Temperatures: 4
}

const temperature = new Parser()
    .nest('brake', {
        type: CarQuadrants.Uint16
    })
    .nest('tyreSurface', {
        type: CarQuadrants.Uint8
    })
    .nest('tyreInner', {
        type: CarQuadrants.Uint8
    })
    .uint16le('engineTemperature');

const carTelemetryData = new Parser()
    .uint16le('speed')
    .floatle('throttle')
    .floatle('steer')
    .floatle('brake')
    .uint8('clutch')
    .int8('gear')
    .uint16le('engineRPM')
    .uint8('drs')
    .uint8('revLightsPercent')
    .nest('temperature', {
        type: temperature,
    })
    .nest('tyrePressure', {
        type: CarQuadrants.Float
    })
    .nest('surfaceType', {
        type: CarQuadrants.Uint8
    });

const carTelemetryPacket = new Parser()
    .array('data', {
        length: 22,
        type: carTelemetryData
    })
    .uint32le('buttonStatus')
    .uint8('mfdPanelIdx')
    .uint8('mdfPanelIdxSecondaryPlayer')
    .int8('suggestedGear');

module.exports = {
    CarTelemetryPacket: carTelemetryPacket,
    Enums: {
        MDFPanel
    },
};