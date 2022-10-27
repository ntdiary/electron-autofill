
// setup
import {showPopup, handleInput} from "./container";
import localforage from "localforage";
import * as LocalForage from "localforage";

interface Option {
    fontFamily: string;
    heuristic: boolean;
}

// for test
declare global {
    interface Window{
        localforage: LocalForage;
    }    
}
window.localforage = localforage;
localforage.config({
    name: 'demo',
    storeName: 'demo',
});

function setup() {
    window.addEventListener('click', showPopup, {capture: true});
    window.addEventListener('input', handleInput);
}

setup();
