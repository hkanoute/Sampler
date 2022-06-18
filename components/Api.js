
import { View, TextInput, Button, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useState, useEffect } from 'react';
import * as FS from "expo-file-system";
import { useDispatch } from 'react-redux';
import { updateLibrary } from './LibrarySlice';
import { useRoute } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import Modal from 'react-native-modal';


const Api = () => {

    const dispatch = useDispatch();
    const route = useRoute();
    const [visible, setVisible] = useState(false);
    const toast = useToast();
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const id = route.params.id;
    const [title, setTitle] = useState()
    const [libraryTitle, setLibraryTitle] = useState()
    const [description, setDescription] = useState()
    const [samples, setSamples] = useState()
    const [disabled, setDisabled] = useState(true)
    const base = "https://freesound.org/apiv2/search/text/?query"
    const key = "&token=fhxghEcXx73zb6ORyIqp2LkzfSthP5jbAcH9qaXJ"


    /*
    * Functation that will get the samples from the API according to what the user typed in the search bar
    * We filter the result to only have the name, the id and the preview url (the preview url will be use to download the sample)
    */
    const fetchSample = async (sample) => {
        const response = await fetch(`${base}=${sample}&fields=name,previews,id${key}`)
        const data = await response.json()
        if (data) {
            setSamples(data.results)
        }
    }

    const toggleModal = () => {
        setVisible(!visible);
    }

    useEffect(() => {
        if (typeof libraryTitle !== 'undefined' && typeof libraryTitle !== null && libraryTitle.trim().length > 0) {
            setDisabled(false)
        }
        else setDisabled(true)
    }
        , [libraryTitle])


    /*
    * Function that will download the sample from the API and save it in the filesystem and update the library
    */
    const dowloadSample = async () => {
        try {

            FS.downloadAsync(selectedItem.previews['preview-hq-mp3'], FS.documentDirectory + libraryTitle)
                .then((status) => {
                    let sample = { id: id, title: libraryTitle, description: description, uri: status.uri, type: "API" }
                    dispatch(updateLibrary(sample))
                    toast.show("Sample modifié", { type: "success", duration: 2000 });
                })
        } catch (e) {
            console.error(e);
        }
    }

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

    const Item = ({ item, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={() => { toggleModal(); setSelectedItem(item) }} style={[styles.item, backgroundColor]}>
            <Text style={[styles.title, textColor]}>{item.name}</Text>
        </TouchableOpacity>
    );



    return (
        <View>
            <TextInput
                value={title}
                placeholder="Titre"
                onChangeText={setTitle}
                style={{
                    height: 56,
                    borderRadius: 4,
                    position: "relative",
                    backgroundColor: "rgba(255,255,255,0.3)",
                    borderColor: "#D3D3D3",
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                }}
            />
            <Button
                title="Rechercher un sample"
                onPress={() => {
                    fetchSample(title)
                }}></Button>

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={samples}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                />
                <Modal isVisible={visible} style={{ backgroundColor: '#fff', borderRadius: 20 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                        <TextInput
                            value={libraryTitle}
                            placeholder="Titre"
                            onChangeText={setLibraryTitle}
                            style={{
                                height: 56,
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
                                borderRadius: 4,
                                position: "relative",
                                backgroundColor: "rgba(255,255,255,0.3)",
                                borderColor: "#D3D3D3",
                                margin: 12,
                                borderWidth: 1,
                                padding: 10,
                            }}
                        />

                        <Button title="Valider les modification" disabled={disabled} onPress={() => { toggleModal(), dowloadSample() }} />
                    </View>
                </Modal>
            </SafeAreaView>
        </View>
    )

}

const styles = StyleSheet.create({
    text: {
        fontSize: 8,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 18,
    },
});

export default Api;