# Linux USB monitoring system

This is a prototype system that watches for USB devices events on Linux and communicates changes with a web browser via WebSocket.

## Dependencies

* NodeJS 10.x
* `libudev`: necessary for NodeJS lib **usb-detection**.

    ```bash
    sudo apt-get install libudev-dev
    ```

## Running

1. Clone this repository: `git clone`
2. Install NodeJS dependencies: `npm install`
3. Run the server: `npm start`

    ```bash
    > node index.js

    Starting USB monitoring...
    Server listening on port 3000
    ```
4. Navigate to http://localhost:3000
5. Insert/Remove USB devices and watch events appear on browser.

    ``` 
    Waiting for new device events...
    Event received (remove): [Logitech] USB Receiver
    Event received (add): [Logitech] USB_Receiver
    ```
