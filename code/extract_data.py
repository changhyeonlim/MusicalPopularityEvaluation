import billboard
import spotipy
import pandas as pd
import random
import string
from spotipy.oauth2 import SpotifyClientCredentials
import numpy as np
from difflib import SequenceMatcher
import time
import gc



# please make sure your spotify api is activated before running
# accesses the billboard api to obatin all the weekly charts for a specific year.
# using those charts audio features have been extracted from the spotify api
# and saved as .csv files.

def getWeekly(chart, sp):

    year = chart.date[:4]
    data = []
    index = 0
    hashmap = {}
    in_top_100 = []

    while chart.previousDate:
        print(chart.date)

        # For creating entire .csv file
        songs = []

        # processing to match the song name from billboards with spotify.
        for song in chart:
            arr = []
            arr.append(song.title)
            arr.append(song.artist)

            title = song.title.split(" ")
            artist = song.artist.split(" ")

            if len(title) > 2:
                title = title[:2]
                
            title = ' '.join(title)

            if len(artist) > 2:
                artist = artist[:2]
            artist = ' '.join(artist)
            artist = artist.replace(' Featuring', '').replace(' X', '').replace(' x', '').replace(' &', '')
            
            arr.append(title)
            arr.append(artist)
            arr.append(song.weeks)

            songs.append(arr)

            del arr
            del title
            del artist


        output = []

        # extract data from spotify
        for song in songs:
            while True:
                try:
                    results = sp.search(q = ' '.join([song[3], song[2]]), type = 'track')
                except:
                    time.sleep(30)
                    continue
                break

            try:
                name = results['tracks']['items'][0]['name']
                artists = [artist['name'] for artist in results['tracks']['items'][0]['artists']]
                ratio1 = SequenceMatcher(None, name, song[0]).real_quick_ratio()
                ratio2 = SequenceMatcher(None, artists[0], song[1]).real_quick_ratio()
                id = results['tracks']['items'][0]['id']
                features = list(sp.audio_features(id)[0].values())
                output.append([(ratio1 + ratio2)/2, song[0], name, song[1], artists, id, *features[0:11], *features[16:], song[4]])
                if name not in hashmap:
                    hashmap[name] = 1
                    in_top_100.append([(ratio1 + ratio2)/2, song[0], name, song[1], artists, id, *features[0:11], *features[16:], song[4]])
                del name
                del artists
                del ratio1
                del ratio2
                del id
                del features
            except:
                output.append([0, song[0], '', song[1], ''])
            
            del results
            del song


        # save the data as .csv
        df = pd.DataFrame(output)
        df.columns = ['match','billboard_track', 'spotify_track', 'billboard_artist','spotify_artist', 'spotify_id', 'danceability', 'energy', 'key', 'loudness', 'mode', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo', 'duration_ms', 'time_signature', 'weeks']
        df.to_csv('weeks/' + chart.date + '.csv')
        previous_date = chart.previousDate
        del output
        del df
        del chart
        chart = billboard.ChartData('hot-100', previous_date)

        # if all the weeks have been accessed, save a compiled data into a year
        # and return to main method.

        if chart.date[:4] != year:
            print(year)
            df = pd.DataFrame(in_top_100)
            df.columns = ['match','billboard_track', 'spotify_track', 'billboard_artist','spotify_artist', 'spotify_id', 'danceability', 'energy', 'key', 'loudness', 'mode', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo', 'duration_ms', 'time_signature', 'weeks']
            df.to_csv('years/' + year + '.csv')
            year = chart.date[:4]
            hashmap = {}
            in_top_100 = []
            del df
            del in_top_100
            del hashmap

            return chart.date
        
        del songs
        gc.collect()


# main method where you can specify the start and end year to extract data
def main():
    auth_manager = SpotifyClientCredentials()
    sp = spotipy.Spotify(auth_manager=auth_manager)

    start = 2021
    end = 2010
    chart = billboard.ChartData('hot-100', f"{start}-12-31")

    while start > end:
        date = getWeekly(chart, sp)
        chart = billboard.ChartData('hot-100', date)
        start = int(date[:4])

    

if __name__ == "__main__":
    main()