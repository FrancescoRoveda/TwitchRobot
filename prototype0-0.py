import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.OUT)
GPIO.setup(13, GPIO.OUT)

while True:
	GPIO.output(11, True)
	time.sleep(.5)
	GPIO.output(13, True)
	time.sleep(.5)
	GPIO.output(11, False)
	time.sleep(.5)
	GPIO.output(13, False)
	time.sleep(.5)
