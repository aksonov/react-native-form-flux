'use strict';
var {alt} = require('react-native-router-flux');

class Actions {
    constructor(){
        this.generateActions('set','clear');
    }
}

module.exports = alt.createActions(Actions);