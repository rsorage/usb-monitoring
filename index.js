const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const usbDetect = require('usb-detection');

app.use(express.static('public'));

let socket;

const formatDeviceName = device => `[${device.manufacturer}] ${device.deviceName}`;

const handleUsbEvent = (eventType, device) => {
    let msg = `Event received (${eventType}): ${formatDeviceName(device)}`
    console.log(msg);

    if(socket)
        socket.emit('message', msg);
};

const handleClientConnection = sock => {
    console.log('Socket created!')
    socket = sock;
    sock.emit('message', 'Waiting for new device events...')
};

const handleShutdown = function() {
    
    http.close((err) => {
        if(err) {
            console.error(err);
            process.exit(1);
        }
        
        console.log("HTTP Server closed!")
        
        usbDetect.stopMonitoring();
        console.log("USB monitoring stopped...")
        
        process.exit(0);
    });
}


const port = 5003 || process.env.PORT;
http.listen(port, function(){
    console.log(`Server listening on port ${port}`);
});

io.on('connection', handleClientConnection)

console.log("Starting USB monitoring...")
usbDetect.startMonitoring();
usbDetect.on('add', (device) => handleUsbEvent('add', device));
usbDetect.on('remove', (device) => handleUsbEvent('remove', device));

process.on('SIGINT', handleShutdown);
