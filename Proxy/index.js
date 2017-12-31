var console = require('better-console');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
var HomeAssistant = require('./haas.js');
var HAAS = new HomeAssistant();

HAAS.events().on("state_changed", (event) => {
    console.log(event.event_type);
    let e = event.data.new_state;
    let o = event.data.old_state;
    console.table([
        ["Entity ID", e.entity_id], 
        ["New State", e.state], 
        ["Old State", o.state], 
        ["Time", e.last_changed],
    ]);
    console.log(JSON.stringify(e.attributes));
    wss.broadcast(event);
});


HAAS.events().on("haas_connected", (event) => {
    console.log("HAAS Connected & Broadcasting");
    HAAS.conn().callService("light", "lifx_effect_pulse", {"entity_id": "light.matt", "color_name": "green"})
    wss.broadcast({
        "event_type": "service_changed",
        "entity_id":  "haas_server",
        "state":       true
    });
})

wss.broadcast = function broadcast(data) {
    data = JSON.stringify(data);
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN && client.posttwo.isAuthenthicated) {
            client.send(data);
            console.log("BROADCASTING:", client._socket.remoteAddress)
        }
    });
};
wss.on('connection', function connection(ws, req) {
    ws.posttwo = {};
    ws.posttwo.isAuthenthicated = false;
    console.log("CONNECTED", req.connection.remoteAddress);
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        try {
            let obj = JSON.parse(message);
            console.log("OBJECT:", obj);
            switch (obj.event_type){
                case "auth_request":
                    ws.posttwo.isAuthenthicated = true;
                    console.log("Authenthicated Console");
                    ws.send(JSON.stringify(
                        {
                            "event_type": "auth_acknowledge",
                            "success": true
                        }
                    ));
                    wss.broadcast({
                        "event_type": "console_connected"
                    })
                    //probably should send the state of everything here
                    break;
                case "change_state":
                    let domain  = obj.domain;
                    let service = obj.service;
                    let data    = obj.data;
                    let entity  = data.entity_id;
                    //check if user has permission to touch entity

                    HAAS.conn().callService(domain, service, data);
                    break;
                default:
                    console.error("WTF DID I JUST READ");
            }
        } catch (e) {
            console.log(ws._test);
            console.error("NOT JSON");
            HAAS.conn().callService("light", "lifx_effect_pulse", {"entity_id": "light.matt", "color_name": "red"})
        }
    });

    ws.send('CONNECTED');
    //send all titties;
});