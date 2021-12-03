# CandyDispenser

This repository contains a node server, a python client and code to run a ardiono to support the following workflow:

# Workflow

A user connects to the server with a moblie device (i.e) by scanning a QR code.
They press a button on the website, submit a form, etc (currently this behavior is simulated by catching a long-tap event on the website)
The server then broadcasts a message.
The connected python client receives the message and controls the arduino through the serial port.

# Node Server

start the server by running `node app.js`
It will serve the contents of the public-folder on `localhost:3000`

# Python client
start the client by running `python clientDemo.py`
the client will be waiting for a broadcast from the server. To send a broadcast visit `localhost:3000` in your browser (when the node server is running) and do a long tap. Press your finger or mouse down for two seconds, then release.

# Arduino Set Up
The arduino set up is very minimalist. I control a motor using the setup outlined here: https://www.dummies.com/computers/arduino/how-to-spin-a-dc-motor-with-the-arduino/
In order for the python script to communicate with the arduino it is necessary to connect the computer with the arduino through a USB cable, 
then make sure that the COMS variable in `clientDemo.py` is set to match your USB set up.
You can find the arduino code in the BaseSerial directory