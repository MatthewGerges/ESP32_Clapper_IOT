# ESP32 Clapper Light - an IOT Project

- This project consists of an ESP32 that can be run on 3 different power supplies - a 3.7V DC lithium ion battery (the PCB is designed in a way that a battery can be recharged by plugging a USB into the side of the circuit).The aim of the project is that when you clap twice, the light state changes from on to off and vice versa 


This repo contains 4 folders - one for the ESP32 code 
one for the backend code - this uses an MVC (model-view-controller) framework and will be connected to the front end of a React-Native app that is on the way of being built
One for the PCB designs - including all the stuff needed for manufacturing the PCB. Created on Altium CircuitMaker. As such all the design files can be viewed here: https://365.altium.com/files/E79B46BD-EABC-40B6-B3DB-7410488752D2

The PCB was taken from start to finish - I did the schematic design - bought the parts off of digikey after creating a BOM and had it manufactured at JLC PCB after comparing pricing and quality of other PCB manufacturers

One for the Fusion360 3D designs (containing f3d - fusion360 design files- and STL files used to print the designs on my ender-3-V2 printer: a servo motor extension
3D view of the PCB
![image](https://user-images.githubusercontent.com/82429124/211705138-c0987d99-0c52-44a8-a789-867db9396d84.png)

PCB Case among other 3D Designs
![image](https://user-images.githubusercontent.com/82429124/211705147-f5677c02-df0e-4a68-a5cd-9b68a38dd38c.png)

