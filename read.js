const fs = require('fs');
const { Packet, Enums } = require('./index.js').F12020;

async function readPackets(dir) {
    const success = []
    const failures = [];
    const files = fs.readdirSync(dir)
    for (let file of files) {
        const buf = fs.readFileSync(`${dir}/${file}`);
        let saveLocation = file.replace(/.data/gi, '.json')
        try {
            const pkt = Packet.parse(buf);
            success.push({
                file: saveLocation,
                data: pkt
            })
        } catch (err) {
            failures.push({
                file: saveLocation,
                data: {
                    err
                }
            });
        }
    }

    for (let s of success) {
        let subType = '';
        switch (s.data.header.packetId) {
            case Enums.Header.PacketType.Motion:
                subType = 'motion';
                break;
            case Enums.Header.PacketType.Session:
                subType = 'session';
                break;
            case Enums.Header.PacketType.LapData:
                subType = 'lapData';
                break;
            case Enums.Header.PacketType.Event:
                subType = 'event';
                break;
            case Enums.Header.PacketType.Participants:
                subType = 'participants';
                break;
            case Enums.Header.PacketType.CarSetups:
                subType = 'carSetups';
                break;
            case Enums.Header.PacketType.CarTelemetry:
                subType = 'carTelemetry';
                break;
            case Enums.Header.PacketType.CarStatus:
                subType = 'carStatus';
                break;
            case Enums.Header.PacketType.FinalClassification:
                subType = 'finalClassification';
                break;
            case Enums.Header.PacketType.LobbyInfo:
                subType = 'lobbyInfo';
                break;
        }
        if (subType) {
            fs.writeFileSync(`./output/success/${subType}/${s.file}`, JSON.stringify(s.data));
        }
    }
    for (let f of failures) {
        fs.writeFileSync(`./output/failure/${f.file}`, JSON.stringify(f.data));
    }
}

readPackets('./packets/1620450021')
    .catch((err) => {
        console.error(err);
    });