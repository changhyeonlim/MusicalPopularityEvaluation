## Introduction

This program is the visualization of music trends over the years. 
The first part of the program is the radar chart created with D3.js. 
Radar charts are implemented to show the difference in music features in a given year.

The following two music visualizers are created to show the difference in a given song.
The music is loaded from the /music_library file.
The circle in the middle represents the energy of different frequencies, and the color of the rings are represented by different keys. 

The number of particles flying away from the middle is generated according to the speechiness of the song, which means more lyrics, more particles. In addition, the speed of particles flying is affected by the song's tempo. Also, once the beat kicks in, the particles accelerate from the middle.


## Related files
    1. index.html
    2. linechart.js
    3. radarChart.js
    4. sketch_combine.js
    5. features.js
    6. music.css

## Packages
    1. D3.js
    2. P5.js

## Music Visualizaer
    The rings represent the energy of the following frequencies
    1. 5~100
    2. 101~300
    3. 301~500
    4. 501~700
    5. 701~1000

    In addition, glowing effect on the outer ring correspond to the frequency between 1200~1300

    The colors of the rings correspond to the keys of the music. For example:

    Key 0 -> Red
    Key 6 -> Purple
    Key 7 -> Orange
    Key 10 -> Light blue to green

## Steps to run
    1. Direct to the file path
    2. Run the following command 
    ```
    python3 -m http.server <port>
    ```
