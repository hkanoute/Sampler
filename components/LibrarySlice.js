import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import data from "../data";

const LibrarySlice = createSlice({
    name: "library",
    initialState: [
        {
            "id": 0,
            'sampleId': 0,
            "uri": "",
            "title": "Sonnerie",
            "type": "Local",
            "duration": 0,
            "start": 0,
            "end": 0,
            'description': 'Son de base inclut dans le projet ! ',
        },
        {
            "id": 1,
            'sampleId': 1,
            "uri": "",
            "title": "clap",
            "type": "Local",
            "duration": 0,
            "start": 0,
            "end": 0,
            'description': 'Son de base inclut dans le projet ! ',

        },
        {
            "id": 2,
            'sampleId': 2,
            "uri": "",
            "title": "fx_1",
            "type": "Local",
            "duration": 0,
            "start": 0,
            "end": 0,
            'description': 'Son de base inclut dans le projet ! ',
        },
        {
            "id": 3,
            'sampleId': 3,
            "uri": "",
            "title": "fx_2",
            "type": "Local",
            "duration": 0,
            "start": 0,
            "end": 0,
            'description': 'Son de base inclut dans le projet ! ',
        },
        {
            "id": 4,
            'sampleId': 4,
            "uri": "",
            "title": "kick_1",
            "type": "Local",
            "duration": 0,
            "start": 0,
            "end": 0,
            'description': 'Son de base inclut dans le projet ! ',
        },
        {
            "id": 5,
            'sampleId': 5,
            "uri": "",
            "title": "kick_2",
            "type": "Local",
            "duration": 0,
            "start": 0,
            "end": 0,
            'description': 'Son de base inclut dans le projet ! ',
        },
        {
            "id": 6,
            'sampleId': 6,
            "uri": "",
            "title": "shaker_1",
            "type": "Local",
            "duration": 0,
            "start": 0,
            "end": 0,
            'description': 'Son de base inclut dans le projet ! ',
        },
        {
            "id": 7,
            'sampleId': 7,
            "uri": "",
            "title": "shaker_2",
            "type": "Local",
            "duration": 0,
            "start": 0,
            "end": 0,
            'description': 'Son de base inclut dans le projet ! ',
        },
        {
            "id": 8,
            'sampleId': 8,
            "uri": "",
            "title": "snare_1",
            "type": "Local",
            "duration": 0,
            "start": 0,
            "end": 0,
            'description': 'Son de base inclut dans le projet ! ',
        },
        {
            "id": 9,
            'sampleId': 9,
            "uri": "",
            "title": "snare_2",
            "type": "Local",
            "duration": 0,
            "start": 0,
            "end": 0,
            'description': 'Son de base inclut dans le projet ! ',
        },
        {
            "id": 10,
            'sampleId': 10,
            "uri": "",
            "title": "tom_1",
            "type": "Local",
            "duration": 0,
            "start": 0,
            "end": 0,
            'description': 'Son de base inclut dans le projet ! ',
        },
        {
            "id": 11,
            'sampleId': 11,
            "uri": "",
            "title": "tom_3",
            "type": "Local",
            "duration": 0,
            "start": 0,
            "end": 0,
            'description': 'Son de base inclut dans le projet ! ',
        },
    ]
    ,
    reducers: {
        updateLibrary: (state, action) => {
            const { id, uri, title, description, type, duration, start, end, sampleId } = action.payload;
            const index = state.findIndex(item => item.id === id);
            state[index] = {
                id,
                sampleId,
                uri,
                title,
                type,
                duration,
                start,
                end,
                description
            };
            return state
        },


    }
})

export const { addLibrary, removeLibrary, updateLibrary } = LibrarySlice.actions
export const sampleSelector = (state) => state.library
export const sampleSelectorByLocal = (state) => state.library.filter(state => state.type === "Local")
export const sampleSelectorByApi = (state) => state.library.filter(state => state.type === "API")
export const sampleSelectorByRecord = (state) => state.library.filter(state => state.type === "Record")
export default LibrarySlice.reducer