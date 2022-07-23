# CSE6242_FinalProject
Predicting music trends through pre-defined popularity
https://awesomebit.github.io/CSE6242/

## Data extraction / Machine Learning model training
Extracts data from billboards api and spotify api.

Install billboards api
```
pip install billboard.py
```

Must also have access to spotify api. Details on using the spotiy api can be found at https://developer.spotify.com/documentation/web-api/.

Use the requirements.txt file to install all the required dependencies for running any files in code folder.

```
conda create --name <env> --file requirements.txt
```

## Data Visualization

This program is the visualization of music trends over the years. 
The first part of the program is the radar chart created with D3.js. 
Radar charts are implemented to show the difference in music features in a given year.

The following two music visualizers are created to show the difference in a given song.
The music is loaded from the /music_library file.
The circle in the middle represents the energy of different frequencies, and the color of the rings are represented by different keys. 

The number of particles flying away from the middle is generated according to the speechiness of the song, which means more lyrics, more particles. In addition, the speed of particles flying is affected by the song's tempo. Also, once the beat kicks in, the particles accelerate from the middle.

The last two charts show 1) Musical Features Trends for each of the features extracted from the popular songs and 2) ML Model Performance Metric from the year 1980 to 2021. There are 12 different features to choose from including: danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, tempo, and duration_ms.


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

