import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { sampleSelector, updateLibrary, sampleSelectorByLocal, sampleSelectorByApi, sampleSelectorByRecord } from "./LibrarySlice";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";

const Library = () => {
    const route = useRoute();
    const dispatch = useDispatch();
    const [dataToDisplay, setDataToDisplay] = useState(1)
    const toast = useToast();

    const padToModify = route.params;
    const libraryData = useSelector(sampleSelector);
    const libraryDataByLocal = useSelector(sampleSelectorByLocal);
    const libraryDataByApi = useSelector(sampleSelectorByApi);
    const libraryDataByRecord = useSelector(sampleSelectorByRecord);
    const [selectedId, setSelectedId] = useState();

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#e9e9e9";
        const color = item.id === selectedId ? 'white' : 'black';
        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.id);
                }}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    const updatePad = (item) => {
        if (item.type === "Local") {
            const modified = { id: padToModify.id, sampleId: item.id, title: item.title, description: item.description, duration: item.duration, start: item.start, end: item.end };
            dispatch(updateLibrary(modified));
        } else {
            const modified = { id: padToModify.id, uri: item.uri, sampleId: item.id, title: item.title, description: item.description, duration: item.duration, start: item.start, end: item.end, type: item.type };
            dispatch(updateLibrary(modified));
        }
        toast.show("Sample modifié", { type: "success", duration: 2000 });
    }

    const Item = ({ item, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={() => { updatePad(item) }} style={[styles.item, backgroundColor]}>
            <Text style={[styles.title, textColor]}>{item.title} | {item.description}</Text>
        </TouchableOpacity>
    );

    /*
    *  Display the data depending on the button pressed
    * 1: All the data
    * 2: Data included with the app 
    * 3: Data fetched from the API
    * 4: Data Recorded by the user
    * by default all the data are displayed
    */
    return (
        <View>
            <View>
                <Button title="Afficher tous les samples" onPress={() => { setDataToDisplay(1) }}></Button>
                <Button title="Afficher tous les samples locales" onPress={() => { setDataToDisplay(2) }}></Button>
                <Button title="Afficher tous les samples via API" onPress={() => { setDataToDisplay(3) }}></Button>
                <Button title="Afficher tous les samples enregistré" onPress={() => { setDataToDisplay(4) }}></Button>
            </View>

            <View>
                {dataToDisplay === 1 ? <FlatList
                    data={libraryData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                /> : dataToDisplay === 2 ? <FlatList
                    data={libraryDataByLocal}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                /> : dataToDisplay === 3 ? <FlatList
                    data={libraryDataByApi}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                /> : dataToDisplay === 4 ? <FlatList
                    data={libraryDataByRecord}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                /> : <FlatList
                    data={libraryData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId} />}

            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }
});

export default Library;