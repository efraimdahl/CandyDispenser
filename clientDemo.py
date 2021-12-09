#!/usr/bin/python
import websocket
import time
import json
import serial

def on_message(ws, message):
    print(message)
    json_message = json.loads(message)
    if(json_message["messageType"]=="candy_release"):
        ser = serial.Serial('COM7', 9800, timeout=1)
        for i in range(2):
            time.sleep(0.5)
            ser.write(b'L')   # send the byte string 'H'
            print("writing byte")
            time.sleep(1)   # wait 0.5 seconds'
        ser.close()

def on_error(ws, error):
    print(error)

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    def run(*args):
        for i in range(30000):
            time.sleep(1)
            ws.send("Hello %d" % i)
        time.sleep(1)
        ws.close()


if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://localhost:3000/",
                                on_message = on_message,
                                on_error = on_error,
                                on_close = on_close)
    ws.on_open = on_open

    ws.run_forever()