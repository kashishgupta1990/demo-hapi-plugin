var package = require('./package.json');

module.exports = exports = {

    //Required Property to make plugin
    name: package.name,

    //Optional Property to make plugin
    version: package.version,

    //Optional Property by default its false
    multiple: false,

    /*Setting Default Options
    * If you want to over-write your default option
    * Just set this option where you using it.*/
    options: {
        message: 'you are using web plugin'
    },

    //Entry point of PLUG-IN
    register: function (plugin, options, next) {

        //You can use plugin object as server object of REAL all

        //Default API
        plugin.route({ method: 'GET', path: '/', handler: function (request, reply) {
            reply({msg: 'Welcome to default web hit'});
        } });

        //Get Your Message Data
        plugin.route({ method: 'GET', path: '/data', handler: function (request, reply) {
            reply({yourdata: options.message});
        } });

        //When every thing is over just call the next() Method
        next();
    }
};