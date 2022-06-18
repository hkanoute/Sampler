import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const PadSlice = createSlice({
    name: "pad",
    /*
    * The sound that a stored in the project can be played only with a require that is not dinamically generated
    */
    initialState: [
        require('../assets/samples/ok.wav'),
        require('../assets/samples/clap_2.wav'),
        require('../assets/samples/fx_1.wav'),
        require('../assets/samples/fx_2.wav'),
        require('../assets/samples/kick_1.wav'),
        require('../assets/samples/kick_2.wav'),
        require('../assets/samples/shaker_1.wav'),
        require('../assets/samples/shaker_2.wav'),
        require('../assets/samples/snare_1.wav'),
        require('../assets/samples/snare_2.wav'),
        require('../assets/samples/tom_1.wav'),
        require('../assets/samples/tom_3.wav')],
    reducers: {
        cropSample: (state, action) => { },
        updatePad: (state, action) => {
            state[action.payload.id] = action.payload.uri;
            return state
        },
    }
})

export const { cropSample, updatePad } = PadSlice.actions
export const selectPad = (state) => state.pad
export default PadSlice.reducer