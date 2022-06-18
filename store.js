import { configureStore, combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";
import padReducer from './components/PadSlice';
import libraryReducer from './components/LibrarySlice';

const reducers = combineReducers({ pad: padReducer, library: libraryReducer });
const persistConfig = { key: "root", storage: AsyncStorage };
const persistedReducer = persistReducer(persistConfig, reducers);



export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});
