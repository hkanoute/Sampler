import { View, StyleSheet, Pressable, Button, TextInput } from "react-native";
import { Audio } from 'expo-av';
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateLibrary } from "./LibrarySlice";
import { useToast } from "react-native-toast-notifications";









const Record = () => {
    const route = useRoute();
    const toast = useToast();
    const [recording, setRecording] = useState();
    const item = route.params;
    const dispatch = useDispatch();
    const [description, setDescription] = useState();
    const [libraryTitle, setLibraryTitle] = useState();
    const [disabled, setDisabled] = useState(true);





    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }


    const updatePad = (uri) => {


        const modified = { id: item.item.id, uri: uri, sampleId: item.item.id, title: libraryTitle, description: description, duration: 0, start: 0, end: 0, type: "Record" };
        dispatch(updateLibrary(modified));

        toast.show("Sample modifié", { type: "success", duration: 2000 });
    }



    useEffect(() => {
        if (typeof libraryTitle !== 'undefined' && typeof libraryTitle !== null && libraryTitle.trim().length > 0) {
            setDisabled(false)
        }
        else setDisabled(true)
    }
        , [libraryTitle])



    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        updatePad(uri);
        console.log('Recording stopped and stored at', uri);

    }




    return (
        <View style={styles.container}>

            <TextInput
                value={libraryTitle}
                placeholder="Titre"
                onChangeText={setLibraryTitle}
                multiline={true}
                numberOfLines={4}
                style={{
                    height: 50,
                    width: 350,
                    borderRadius: 4,
                    position: "relative",
                    backgroundColor: "rgba(255,255,255,0.3)",
                    borderColor: "#D3D3D3",
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                }}
            />

            <TextInput
                value={description}
                placeholder="Description"
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={4}
                style={{
                    height: 100,
                    width: 350,
                    borderRadius: 4,
                    position: "relative",
                    backgroundColor: "rgba(255,255,255,0.3)",
                    borderColor: "#D3D3D3",
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                }}
            />
            <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
                disabled={disabled}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 150,
        alignContent: 'center',
    },
});

export default Record;