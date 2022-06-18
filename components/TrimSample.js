import { Text, View, Pressable, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useSelector } from "react-redux";
import Trimmer from 'react-native-trimmer'
import { sampleSelector } from './LibrarySlice';
import { useDispatch } from "react-redux";
import { updateLibrary } from "./LibrarySlice";
import { useToast } from "react-native-toast-notifications";






const TrimSample = () => {

    /*
    * geting the route params & the sample data
    */
    const toast = useToast();
    const route = useRoute();
    const samplesData = useSelector(sampleSelector);
    const dispatch = useDispatch();
    const item = route.params;

    /*
    * setting the initial values for the trimming
    */
    const [state, setState] = useState({
        trimmerLeftHandlePosition: 0,
        trimmerRightHandlePosition: samplesData[item.id].duration,
    })

    /*
    * updating the library with the new start and end values
    */
    const onHandleChange = ({ leftPosition, rightPosition }) => {
        /*
        *the trimmer can be moved beyond the duration of the sample
        * so we need to check that the left handle isn't a negative value 
        * and the right handle isn't a value greater than the duration of the sample
        */
        if (leftPosition < 0 || rightPosition > samplesData[item.id].duration) {
            setState({
                trimmerRightHandlePosition: samplesData[item.id].duration,
                trimmerLeftHandlePosition: 0
            })
        } else {
            setState({
                trimmerRightHandlePosition: rightPosition,
                trimmerLeftHandlePosition: leftPosition
            })
        }

    }

    /*
    *if the duration of the sample is less than 500 ms we can't trim it
    *because the buffer of the sound object is 500 ms
     */

    return (
        <View>


            {samplesData[item.id].duration > 500 ? <View>
                <Text style={styles.h1}>Veuillez choisir quel partie vous voulez jouer </Text>
                <Trimmer
                    onHandleChange={onHandleChange}
                    totalDuration={samplesData[item.id].duration}
                    trimmerLeftHandlePosition={state.trimmerLeftHandlePosition}
                    trimmerRightHandlePosition={state.trimmerRightHandlePosition}
                />
                <Pressable style={styles.button} onPress={() => {
                    dispatch(updateLibrary({ ...samplesData[item.id], start: state.trimmerLeftHandlePosition, end: state.trimmerRightHandlePosition }))
                    toast.show("Sample modifié", { type: "success", duration: 2000 });
                }}>
                    <Text style={styles.text}>Valider</Text>
                </Pressable>
            </View> : <Text style={styles.h1}>Le sample est trop court pour être trimmé</Text>}

        </View>

    );
}


const styles = StyleSheet.create({
    h1: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'green',
        width: 120,
        height: 40,
        marginLeft: 130,
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    container: {
        marginTop: 20,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default TrimSample;