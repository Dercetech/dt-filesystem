'use strict';
module.exports = function configure(injector) {
    
    // Filesystem utils
    injector.register('dtFS', require('./dt-filesystem'));
};