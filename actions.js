'use strict';
var {alt} = require('react-native-router-flux');

class Actions {
    constructor(){
        this.generateActions('set','load','clear');
    }
}

module.exports = alt.createActions(Actions);