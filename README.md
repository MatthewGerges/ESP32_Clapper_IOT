# ESP32 Clapper Light - an IOT Project
![image](https://user-images.githubusercontent.com/82429124/211705138-c0987d99-0c52-44a8-a789-867db9396d84.png)
- This project consists of an ESP32 microcontroller (programmed in C++)  that flips a light switch in 0.2 seconds upon detecting 2 claps
- I implemented it to an IOT framework by connecting it to a MongoDB database managed by NodeJS on the backend. The ESP32 will query for changes to the database every 0.5 seconds
- This project will soon have a React Native front end as well
- I also created a PCB that manages all the connections to the ESP32 and allows the circuit to be powered in 3 different ways (via a USB connection, a 3.7V battery connected to a boost converter that increases the voltage to 5V, and through a 12V DC barrel jack ran through a LM7805 converter with 2 capacitors to manage power ripples)
- The PCB was taken from start to finish - I did the schematic design - bought the parts off of digikey after creating a BOM and had it manufactured at JLC PCB after comparing pricing and quality of other PCB manufacturers
- Cases, enclosures and extensions were also created for this project on Fusion360 and printed on my personal Ender 3 V2 Printer (which took several iterations and rounds of prototyping)
 Video demo: https://www.youtube.com/watch?v=oGSny03s_TQ

![image](https://user-images.githubusercontent.com/82429124/211705147-f5677c02-df0e-4a68-a5cd-9b68a38dd38c.png)

This repo contains 4 folders: 
1) The ESP32 code written in C++
2) The backend code written in NodeJS which uses an MVC (model-view-controller) framework and will be connected to the front end of a React-Native app that is on the way of being built
3) The PCB designs - including all the files needed for manufacturing the PCB. It was created on Altium CircuitMaker. As such all the design documents can be viewed here: https://365.altium.com/files/E79B46BD-EABC-40B6-B3DB-7410488752D2
4) The Fusion360 3D designs (containing f3d - fusion360 design files- and STL files used to print the designs on my ender-3-V2 printer). These include several iterations of the PCB case, the servo motor extension and the pentagon-shaped knob extender for the light switch.


