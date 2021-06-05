const { Parser } = require('binary-parser');
const { Vector3, GForce, Rotation, CarQuadrants } = require('./common')

const carMotionData = new Parser()
    .nest('worldPosition', {
        type: Vector3.Float
    })
    .nest('worldVelocity', {
        type: Vector3.Float
    })
    .nest('worldForwardDir', {
        type: Vector3.Int16
    })
    .nest('worldRightDir', {
        type: Vector3.Int16
    })
    .nest('gForce', {
        type: GForce
    })
    .nest('rotation', {
        type: Rotation
    });

const carSuspensionSet = new Parser()
    .nest('position', {
        type: CarQuadrants.Float
    })
    .nest('velocity', {
        type: CarQuadrants.Float
    })
    .nest('acceleration', {
        type: CarQuadrants.Float
    });

const carWheelSet = new Parser()
    .nest('speed', {
        type: CarQuadrants.Float
    })
    .nest('slip', {
        type: CarQuadrants.Float
    });

const motionPacket = new Parser()
    .array('carMotionData', {
        length: 22,
        type: carMotionData
    })
    .nest('suspension', {
        type: carSuspensionSet
    })
    .nest('wheel', {
        type: carWheelSet
    })
    .nest('localVelocity', {
        type: Vector3.Float
    })
    .nest('angularVelocity', {
        type: Vector3.Float
    })
    .nest('angularAcceleration', {
        type: Vector3.Float
    })
    .floatle('frontWheelAngle');

module.exports = {
    MotionPacket: motionPacket
};
