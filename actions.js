'use strict';
var alt = require('./alt');

class Actions {
    constructor(){
        this.generateActions('set','load','clear');
    }
}

module.exports = alt.createActions(Actions);