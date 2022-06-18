import { Text, View, Pressable, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation, } from "@react-navigation/native";


const EditSample = () => {

    /*
   * geting the route params & making the navigation 
   */
    const route = useRoute();
    const navigation = useNavigation();

    const item = route.params;
    return (
        <View style={styles.container}>
            <Pressable onPress={() => { navigation.navigate("Trim Sample", { id: item.id }); }} style={styles.pads}><Text style={styles.text} >Modifier le sample</Text></Pressable>
            <Pressable onPress={() => { navigation.navigate("Api", { id: item.id }); }} style={styles.pads}><Text style={styles.text}>Selectionner un sample depuis l'API</Text></Pressable>
            <Pressable onPress={() => { navigation.navigate("Library", { id: item.id }); }} style={styles.pads}><Text style={styles.text}>Selectionner un sample depuis la librairie</Text></Pressable>
            <Pressable onPress={() => { navigation.navigate("Record", { item }); }} style={styles.pads}><Text style={styles.text}>Enregistrer un sample</Text></Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    pads: {
        borderRadius: 4,
        backgroundColor: '#fff',
        width: 130,
        height: 110,
        margin: 5,
        marginLeft: 5
    },
    text: {
        fontWeight: 'bold',
        padding: 10,
        margin: 10,
        textAlign: 'center',
    },
    container: {
        flexDirection: 'row',
        flex: 3,
        flexWrap: 'wrap',
        backgroundColor: '#dedede',
        alignItems: 'center',
        padding: 15,
        alignContent: 'center',
        justifyContent: 'center',
    },
});

export default EditSample;