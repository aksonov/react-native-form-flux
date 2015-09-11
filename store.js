'use strict';
var {alt, Actions} = require('react-native-router-flux');
var FormActions = require('./actions');
var React = require('react-native');
var {
    AsyncStorage
    } = React;

var STORAGE_KEY = 'FormStoreKey';

AsyncStorage.getItem(STORAGE_KEY, (error, result)=> FormActions.load(result));

class FormStore {
    constructor(){
        this.data = {};
        this.bindAction(FormActions.set, this.onSet);
        this.bindAction(FormActions.load, this.onLoad);
        this.bindAction(FormActions.clear, this.onClear);
    }

    onSet(map){
        //console.log("FormStore.onSet: "+JSON.stringify(map));
        for (var key in map){
            this.data[key] = map[key];
        }
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
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