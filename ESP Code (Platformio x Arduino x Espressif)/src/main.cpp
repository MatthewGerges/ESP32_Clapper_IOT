/*
 * Blink
 * Turns on an LED on for one second,
 * then off for one second, repeatedly.
 */

#include <Arduino.h>
//#include <ESP32_Servo.h>
#include "ESP32Servo.h"
#include <WiFi.h>
#include <ESPmDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>


// Set LED_BUILTIN if it is not defined by Arduino framework
#ifndef LED_BUILTIN
    #define LED_BUILTIN 2
#endif
#define PIN_SERVO 5
#define MIC_OUT_PIN 13
Servo myServo;
const char* ssid = "Jojofofa";
const char* password = "Fofafofa";

int micPin = 32;
int micPinDigital = 3;
int sensorValue = 0;
int digitalState = 0;


int mic = 13;
int indicLED = 9;
int lightPin = 2;
bool lightState = true;
bool ignoreInt = false;
bool clapDetected = false;
uint32_t ClapDetectedTime[3]{};
void ISR_ClapDetected();

void setup() {
  //Serial.begin(115200);
  pinMode(indicLED, OUTPUT);
  pinMode(lightPin, OUTPUT);
  digitalWrite(lightPin, lightState);
  attachInterrupt(digitalPinToInterrupt(mic), ISR_ClapDetected, FALLING);
  
  //pinMode(LED_BUILTIN, OUTPUT);
  pinMode(micPinDigital, INPUT);
  myServo.attach(PIN_SERVO);
  myServo.write(110);
  Serial.begin(115200);
  Serial.println("Booting");

}

void loop() {
  // myServo.write(150);
  // delay(500);
  // myServo.write(50);
  // delay(500);

  delay(2);

  if (millis() - ClapDetectedTime[2] >= 800)
  {
    digitalWrite(indicLED, LOW);
  }
  if (millis() - ClapDetectedTime[2] < 800 && millis() - ClapDetectedTime[1] < 800 && clapDetected && ClapDetectedTime[1] - ClapDetectedTime[0 >= 800])
  {
    Serial.println("double clap detected");
    digitalWrite(indicLED, LOW);
    Serial.print("Setting light to");
    Serial.println(String(!lightState));

    if(lightState)
  {
    myServo.write(105);
  }
  else{
  //delay(1000);
  myServo.write(135);
  }
    digitalWrite(lightPin, lightState);

    delay(820);
    lightState = !lightState;
    clapDetected = false;
  }

}

void ISR_ClapDetected()
{
  if(millis() - ClapDetectedTime[2] > 200)
  {
    for (int i = 0; i != 2; i++)
    {
      ClapDetectedTime[i] = ClapDetectedTime[i + 1];
    }

    ClapDetectedTime[2] = millis();
    clapDetected = true;
    Serial.println("clap detected");
    digitalWrite(indicLED, HIGH);
  }
}



// void setup()
// {
//   // initialize LED digital pin as an output.
//   pinMode(LED_BUILTIN, OUTPUT);
//   pinMode(micPinDigital, INPUT);
//   myServo.attach(PIN_SERVO);
//   Serial.begin(115200);
//   Serial.println("Booting");
//   #if WIFI
//   WiFi.mode(WIFI_STA);
//   WiFi.begin(ssid, password);
//   while (WiFi.waitForConnectResult() != WL_CONNECTED) {
//     Serial.println("Connection Failed! Rebooting...");
//     delay(5000);
//     ESP.restart();
//   }

//   // Port defaults to 3232
//   // ArduinoOTA.setPort(3232);

//   // Hostname defaults to esp3232-[MAC]
//   // ArduinoOTA.setHostname("myesp32");

//   // No authentication by default
//   // ArduinoOTA.setPassword("admin");

//   // Password can be set with it's md5 value as well
//   // MD5(admin) = 21232f297a57a5a743894a0e4a801fc3
//   // ArduinoOTA.setPasswordHash("21232f297a57a5a743894a0e4a801fc3");

//   ArduinoOTA
//     .onStart([]() {
//       String type;
//       if (ArduinoOTA.getCommand() == U_FLASH)
//         type = "sketch";
//       else // U_SPIFFS
//         type = "filesystem";

//       // NOTE: if updating SPIFFS this would be the place to unmount SPIFFS using SPIFFS.end()
//       Serial.println("Start updating " + type);
//     })
//     .onEnd([]() {
//       Serial.println("\nEnd");
//     })
//     .onProgress([](unsigned int progress, unsigned int total) {
//       Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
//     })
//     .onError([](ota_error_t error) {
//       Serial.printf("Error[%u]: ", error);
//       if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
//       else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
//       else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
//       else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
//       else if (error == OTA_END_ERROR) Serial.println("End Failed");
//     });

//   ArduinoOTA.begin();

//   Serial.println("Ready");
//   Serial.print("IP address: ");
//   Serial.println(WiFi.localIP());
//   #endif
// }

// int delayTime = 100;

// void loop()
// {
//   #if WIFI
//   ArduinoOTA.handle();  
//   #endif
//   // turn the LED on (HIGH is the voltage level)
//   digitalWrite(LED_BUILTIN, HIGH);
//   // wait for a second
//   delay(delayTime);
//   // turn the LED off by making the voltage LOW
//   digitalWrite(LED_BUILTIN, LOW);
//    // wait for a second
//   delay(delayTime);

//   // for (int pos = 0; pos <= 300; pos += 20)
//   // {
//   //   myServo.write(pos);
//   //   delay(500);
//   // }

//   // for (int i = 0; i < 10; i++)
//   // {
//   //   myServo.write(100);
//   //   delay(3000);
//   //   myServo.write(120);
//   //   delay(3000);
//   // }

//   myServo.write(170);
//   delay(1000);
//   myServo.write(20);
  
//   #ifdef WIFI
//   sensorValue = analogRead(micPin);
//   digitalState = digitalRead(micPinDigital);
//   Serial.println(sensorValue, DEC);
//   Serial.println(digitalState);
//   delay(500);

//   Serial.println(digitalRead(MIC_OUT_PIN));
//   #endif

  
  
// }
