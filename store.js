'use strict';
var {alt, Actions, PageStore} = require('react-native-router-flux');
var FormActions = require('./actions');
var React = require('react-native');
var {
    AsyncStorage
    } = React;

var STORAGE_KEY = 'FormStorageKey';


class FormStore {
    constructor(){
        this.all = {};
        this.bindAction(FormActions.set, this.onSet);
        this.bindAction(FormActions.clear, this.onClear);
        this.bindAction(Actions.init, this.onPageOpened);
        this.bindAction(Actions.push, this.onPageOpened);
        this.bindAction(Actions.custom, this.onCustom);
        this.bindAction(Actions.pop, this.onPageClosed);
        this.bindAction(Actions.dismiss, this.onPageClosed);
    }

    onPageOpened(data){
        this.waitFor(PageStore.dispatchToken);
        this.route = PageStore.getState().currentRoute;
//        console.log("onPageOpened"+JSON.stringify(data)+" route "+ this.route);
        // load data for current route
        this.all[this.route] = {};
        AsyncStorage.getItem(STORAGE_KEY+this.route, (error, result)=> this.onLoad(result));
        return false;
    }

    onCustom({data}){
        this.onSet(data||{});
    }

    onPageClosed(data){
        console.log("onPageClosed"+data+" route "+ this.route);

        // change current route
        this.waitFor(PageStore.dispatchToken);

        // store data for prev route
        this.onSet(data || {});
        this.route = PageStore.getState().currentRoute;

        // store data for new current route
        this.onSet(data || {});
        return false;
    }

    onSet(map){
        for (var key in map){
            this.all[this.route][key] = map[key];
        }
//        console.log("FormStore.onSet: "+JSON.stringify(map)+" for route:"+this.route+" DATA"+JSON.stringify(this.all[this.route]));
        AsyncStorage.setItem(STORAGE_KEY+this.route, JSON.stringify(this.all[this.route]||{}));
        this.setState({data:this.all[this.route]});
    }

    onLoad(data){
        if (data) {
//            console.log("onPageOpened loaded "+data+" route "+ this.route);
            data = JSON.parse(data);
            for (var key in data){
                this.all[this.route][key] = data[key];
            }
            this.setState({data:this.all[this.route]});
        }
    }

    onClear(){
        AsyncStorage.removeItem(STORAGE_KEY+this.route);
        this.setState({data:{}});
    }
}


module.exports = alt.createStore(FormStore);