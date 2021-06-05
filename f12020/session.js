const { Parser } = require("binary-parser");

const ZoneFlag = {
    Unknown: -1,
    None: 0,
    Green: 1,
    Blue: 2,
    Yellow: 3,
    Red: 4,
};

const SessionType = {
    Unknown: 0,
    Practice1: 1,
    Practice2: 2,
    Practice3: 3,
    ShortPractice: 4,
    Qualifying1: 5,
    Qualifying2: 6,
    Qualifying3: 7,
    ShortQualifying: 8,
    OneShotQualifying: 9,
    Race: 10,
    Race2: 11,
    TimeTrial: 12,
};

const WeatherType = {
    Clear: 0,
    LightCloud: 1,
    Overcast: 2,
    LightRain: 3,
    HeavyRain: 4,
    Storm: 5,
};

const FormulaType = {
    F1Modern: 0,
    F1Classic: 1,
    F2: 2,
    F1Generic: 3,
};

const SafetyCarStatus = {
    None: 0,
    Full: 1,
    Virtual: 2,
};

const marshalZone = new Parser()
    .floatle('start')
    .int8('flag');

const weatherForecastSample = new Parser()
    .uint8('sessionType')
    .uint8('timeOffset')
    .uint8('weather')
    .int8('trackTemperature')
    .int8('airTemperature');

const sessionPacket = new Parser()
    .uint8('weather')
    .int8('trackTemperature')
    .int8('airTemperature')
    .uint8('totalLaps')
    .uint16le('trackLength')
    .uint8('sessionType')
    .int8('trackId')
    .uint8('formula')
    .uint16le('sessionTimeLeft')
    .uint16le('sessionDuration')
    .uint8('pitSpeedLimit')
    .uint8('gamePaused')
    .uint8('isSpectating')
    .uint8('spectatorCarIndex')
    .uint8('sliProNativeSupport')
    .uint8('numMarshalZones')
    .array('marshalZones', {
        length: 21,
        type: marshalZone,
    })
    .uint8('safetyCarStatus')
    .uint8('networkGame')
    .uint8('numWeatherForecastSamples')
    .array('weatherForecastSamples', {
        length: 20,
        type: weatherForecastSample,
    });

module.exports = {
    SessionPacket: sessionPacket,
    Enums: {
        ZoneFlag,
        SessionType,
        WeatherType,
        FormulaType,
        SafetyCarStatus,
    },
};
