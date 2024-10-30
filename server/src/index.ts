import osc from 'osc';

import { OBSWebSocket, OBSRequestTypes } from 'obs-websocket-js';

const EOS_IP = "127.0.0.1";
const EOS_PORT = 3037;
const OBS_IP = "127.0.0.1";
const OBS_PORT = 4455;

const OBS_URL = `ws://${OBS_IP}:${OBS_PORT}`;
const OBS_PASSWORD: string = ""; // todo: environment variables

function main() {
    // Create an OSC Server
    let oscPort = new osc.TCPSocketPort({ address: EOS_IP, port: EOS_PORT });

    let obs = new OBSWebSocket();
    if (OBS_PASSWORD != '') {
        obs.connect(OBS_URL, OBS_PASSWORD);
    } else {
        obs.connect(OBS_URL);
    };

    oscPort.on("message", function (oscMsg: any) {
        let handled = false;

        if (oscMsg.address == "/eos/out/active/cue/text") {
            // handled = true;
            // console.log('Cue:', oscMsg);
            let text: string = oscMsg.args[0];
            let cueAndList: string = text.split(' ')[0];
            // let cueNumber: number = parseInt(cueAndList.split('/')[1]);
            let cueLabel: string;
            console.log(text.match(/ /g) || []);
            if ((text.match(/ /g) || []).length >= 3) {
                // This is a cue with a cueLabel
                cueLabel = text.split(' ')[1];

            } else {
                cueLabel = '';
            };
            let cueTimeLeft: number = parseFloat(text.split(' ').at(-2) || '');
            let cuePercent: string = text.split(" ").at(-1) || '';
            console.log('Cue:', cueAndList || 0, cueLabel, cueTimeLeft);
            obs.call('SetInputSettings', {
                inputName: 'Eos Cue',
                inputSettings: {
                    "text": "Cue: " + cueAndList + (cueLabel && ": " + cueLabel)
                }
            })
            obs.call('SetInputSettings', {
                inputName: 'Cue TTL',
                inputSettings: {
                    "text": cueTimeLeft + "s " + cuePercent
                }
            })
        };

        if (!handled) {
            console.log("An OSC Message was received!", oscMsg);

        }
    });

    oscPort.open();

    oscPort.on("ready", function () {
        oscPort.send({ address: `/eos/ping` });
    });

};

main();