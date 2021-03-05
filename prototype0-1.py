from flask import Flask, render_template, url_for, request
from flask_bootstrap import Bootstrap
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)
# LED
GPIO.setup(7, GPIO.OUT)
GPIO.setup(11, GPIO.OUT)

# Motor 1
GPIO.setup(13, GPIO.OUT)
GPIO.setup(15, GPIO.OUT)

# Motor 2
GPIO.setup(29, GPIO.OUT)
GPIO.setup(31, GPIO.OUT)

app = Flask(__name__)
bootstrap = Bootstrap(app)

@app.route('/')
def index():
    return render_template('index.html')



#background process happening without any refreshing
@app.route('/movement', methods=['POST'])
def movement():
    comand = request.get_data(cache=True, as_text=True, parse_form_data=False)
    if comand == 'forward':
        GPIO.output(13, True)
        GPIO.output(15, False)
        GPIO.output(29, True)
        GPIO.output(31, False)
        time.sleep(.5)
        GPIO.output(13, False)
        GPIO.output(15, False)
        GPIO.output(29, False)
        GPIO.output(31, False)
        time.sleep(.5)
    elif comand == 'back':
        GPIO.output(13, False)
        GPIO.output(15, True)
        GPIO.output(29, False)
        GPIO.output(31, True)
        time.sleep(.5)
        GPIO.output(13, False)
        GPIO.output(15, False)
        GPIO.output(29, False)
        GPIO.output(31, False)
        time.sleep(.5)
    elif comand == 'right':
        GPIO.output(13, True)
        GPIO.output(15, False)
        GPIO.output(29, False)
        GPIO.output(31, True)
        time.sleep(.5)
        GPIO.output(13, False)
        GPIO.output(15, False)
        GPIO.output(29, False)
        GPIO.output(31, False)
    elif comand == 'left':
        GPIO.output(13, False)
        GPIO.output(15, True)
        GPIO.output(29, True)
        GPIO.output(31, False)
        time.sleep(.5)
        GPIO.output(13, False)
        GPIO.output(15, False)
        GPIO.output(29, False)
        GPIO.output(31, False)
    elif comand == 'option1':
        GPIO.output(7, True)
        time.sleep(.5)
        GPIO.output(7, False)
    elif comand == 'option2':
        GPIO.output(11, True)
        time.sleep(.5)
        GPIO.output(11, False)
    return ("nothing")




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
