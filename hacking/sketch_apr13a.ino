// ARDUINO CODE

#define trigPin1 13 // Right IR ports
#define echoPin1 12
#define trigPin2 4 // Front IR ports
#define echoPin2 5
#define trigPin3 8 //Left IR ports
#define echoPin3 9
#define warningDist 50 // Distance in cm for proximity notification to start
#define buzzer1 7 // Buzzer port

#include <Wire.h> // Libraries for Accelerometer
#include "SparkFun_MMA8452Q.h"

MMA8452Q accel; // accelerometer object

long duration, distance, RightSensor,BackSensor,FrontSensor,LeftSensor;
long warning;
void setup()
{
  Serial.begin (9600);
  Wire.begin();
  if (accel.begin() == false)  // Checks if accelerometer is connected
  {
    Serial.println("Not Connected. Please check connections and read the hookup guide.");
    while (1);
  }
  //Setting mode for all IR Sensors and buzzer
  pinMode(trigPin1, OUTPUT);
  pinMode(echoPin1, INPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  pinMode(trigPin3, OUTPUT);
  pinMode(echoPin3, INPUT);
  pinMode(buzzer1, OUTPUT);
}

void loop() { // Data input loop
  SonarSensor(trigPin1, echoPin1);
  RightSensor = distance;
  SonarSensor(trigPin2, echoPin2);
  FrontSensor = distance;
  SonarSensor(trigPin3, echoPin3);
  LeftSensor = distance;

  warning = getMin(LeftSensor, RightSensor, FrontSensor); // defaults to 25, otherwise = to smallest distance reading
  if(accel.available()) {
      Serial.print(accel.getCalculatedY(), 3);
      Serial.println();
   }

  //Serial.print("1ST SENSOR:  ");
  Serial.println(FrontSensor);

  //Serial.print("2ND SENSOR:  ");
  Serial.println(RightSensor);

  //Serial.print("3RD SENSOR:  ");
  Serial.println(LeftSensor);

  delay(warning*8); // Loop quickens as distance decreases, buzzer increases speed
  noTone(buzzer1); // Shut off buzzer
}

void SonarSensor(int trigPin,int echoPin)
{
  digitalWrite(trigPin, LOW);
  delayMicroseconds(10);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = (duration/2) / 29.1; // Find distance to object and convert to cm

}

long getMin(long l, long r, long f)
{
  //Buzz on different frequencies based on which direction is closest (right vs left vs front)
  warning = 25;
  if(l < warningDist)
  {
    warning = min(min(l, r), f);
    tone(buzzer1, 200);
  }
  else if(r < warningDist)
  {
    warning = min(min(l, r), f);
    tone(buzzer1, 1000);
  }
  else if(f < warningDist)
  {
    warning = min(min(l, r), f);
    tone(buzzer1, 600);
  }
  return warning;
}
