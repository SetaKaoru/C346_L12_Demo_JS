import React,{useState, useEffect} from 'react';
import {StatusBar, Button, StyleSheet, Text, View} from 'react-native';
import {Audio} from "expo-av";
import {Gyroscope} from "expo-sensors";

const styles = StyleSheet.create({
  shake: {
      fontSize: 90,
      fontWeight: 'bold',
      textAlign: 'center',
  },
});


export default function App() {
    const [{x, y, z}, setData] = useState({x:0, y:0, z:0});
    const [mySound, setMySound] = useState();

    async function playSound(){
        const soundfile = require('./montaguewhistle.mp3');
        const { sound } = await Audio.Sound.createAsync(soundfile);
        setMySound(sound);
        await sound.playAsync();
    };

    useEffect(() => {
        Gyroscope.setUpdateInterval(500);
        const subscription = Gyroscope.addListener(setData);
        return () => subscription.remove();
        return mySound
            ? () => {
                console.log('Unloading Sound');
                mySound.unloadAsync();
            }
            :undefined
    }, [], [mySound]);

    function Rotate() {
        if (y > 0.1) {
            playSound();
            return (
                <Text style={styles.shake}> {(y > 0.1) ? "SHAKE!" : ""}</Text>
            )
        }
    }

  return (
    <View>
      <StatusBar />
        <Text>x: {x}</Text>
        <Text>y: {y}</Text>
        <Text>z: {z}</Text>


        {Rotate()}
    </View>
  );
}


