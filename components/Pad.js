import { View, StyleSheet, Pressable } from "react-native";
import { Audio } from 'expo-av';
import { useNavigation, } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateLibrary } from "./LibrarySlice";
import { sampleSelector } from "./LibrarySlice";
import { selectPad } from "./PadSlice";
import { useSelector } from "react-redux";



const Pad = () => {
    const [sound, setSound] = useState();
    const soundObject = new Audio.Sound();
    const navigation = useNavigation();
    const SamplesData = useSelector(sampleSelector);
    const padFiles = useSelector(selectPad);
    const dispatch = useDispatch();




    async function playSound(item) {
        /*
        * if the sound has been dowloaded, we have to load it with the uri of the file
        * if not, we can juste load it with a require from the pad Slice 
        */
        try {
            console.log(item);
            if (item.type === "API" || item.type === "Record") {
                await soundObject.loadAsync({ uri: item.uri });
                /*
                *if the user has trimmed the sample, the start point will be the left handle position
                *if not the default start point will be 0
                */
                await soundObject.playFromPositionAsync(SamplesData[item.id].start);
                await stopTrimmedSound(item);

            } else {
                await soundObject.loadAsync(padFiles[item.sampleId]);
                await soundObject.playFromPositionAsync(SamplesData[item.id].start);
                await stopTrimmedSound(item);
            }

        } catch (error) {
            console.log(error);
        }
    }

    /*
    *We can't stop the sound like the "playFromPositionAsync" function does
    *So we need get the status of the sound and if it reaches the end point choose by the user, we stop the sound
    *To avoid strange behaviors, we check that the end point is greater than 1000ms because the buffer is called every 500ms
    *
    */
    const stopTrimmedSound = async (item) => {
        if (SamplesData[item.id].end > 1000) {
            soundObject.setOnPlaybackStatusUpdate(status => {
                if (status.positionMillis >= SamplesData[item.id].end) {
                    soundObject.stopAsync();
                }
            })
        }
    }
    useEffect(() => {
        return sound ? () => { sound.unloadAsync(); } : undefined;
    }, [sound]);
    return (
        <View style={styles.container}>
            {SamplesData.map(item => {
                return <Pressable key={item.id} style={styles.pads} onLongPress={async () => {
                    /*
                    *Setting the sound that will be modified
                    */
                    try {

                        item.type === "API" || item.type === "Record" ? await soundObject.loadAsync({ uri: item.uri }) : await soundObject.loadAsync(padFiles[item.sampleId]);
                        setSound(soundObject);

                    } catch (error) {
                        console.log(error);
                    }

                    soundObject.getStatusAsync().then(status => {
                        dispatch(updateLibrary({ ...item, duration: status.durationMillis }));
                    });
                    navigation.navigate("Edit Sample", item);
                }} onPress={() => { setSound(soundObject); playSound(item) }} />
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    pads: {
        borderRadius: 4,
        backgroundColor: '#fff',
        width: 110,
        height: 110,
        margin: 5,
        marginLeft: 5

    },
    container: {
        flexDirection: 'row',
        flex: 3,
        flexWrap: 'wrap',
        backgroundColor: '#dedede',
        alignItems: 'center',
        padding: 15,
        alignContent: 'center',
    },
});
export default Pad;