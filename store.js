'use strict';
var alt = require('./alt');
var actions = require('./actions');
var React = require('react-native');
var {
    AsyncStorage
    } = React;

var STORAGE_KEY = 'FormStoreKey';

AsyncStorage.getItem(STORAGE_KEY, (error, result)=> actions.load(result));

class FormStore {
    constructor(){
        this.data = {};
        this.bindAction(actions.set, this.onSet);
        this.bindAction(actions.load, this.onLoad);
        this.bindAction(actions.clear, this.onClear);
    }

    onSet(map){
        console.log("FormStore.onSet: "+JSON.stringify(map));
        for (var key in map){
            this.data[key] = map[key];
        }
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.data), (error)=>console.log("SAVED"+error));
    }

    onLoad(data){
        if (data) {
            data = JSON.parse(data);
            this.data = data;
        }
    }

    onClear(){
        AsyncStorage.removeItem(STORAGE_KEY);
        this.data = {};
    }
}


module.exports = alt.createStore(FormStore);