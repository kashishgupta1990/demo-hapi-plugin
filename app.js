//Requiring Hapi NPM module
var Hapi = require('hapi'),

//Creating Hapi object
    server = Hapi.createServer('localhost', 4567),

//Requiring Custom Hapi Plugin Namespace
    plugin = {
        api: require('./customHapiPlugin/apiPlugin'),
        auth: require('./customHapiPlugin/authPlugin'),
        web: require('./customHapiPlugin/webPlugin')
    };


//Server is having there own route defined
//Object in the route method can be Array of route objects
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

//Injecting Custom Hapi PlugIn into our App
//Custom Plugin: apiPlugin
server.pack.register(plugin.api, {route: {prefix: '/api'}}, function (err) {
    if (err) {
        console.log('Failed to Load Plugin,Some Error Occur in Injecting Api-Plugin');
    } else {
        console.log('Api-Plugin Successfully Loaded');
    }
});
//Custom Plugin: authPlugin
server.pack.register(plugin.auth, {route: {prefix: '/auth'}}, function (err) {
    if (err) {
        console.log('Failed to Load Plugin,Some Error Occur in Injecting Auth-Plugin');
    } else {
        console.log('Auth-Plugin Successfully Loaded');
    }
});
//Custom Plugin: authPlugin
server.pack.register(plugin.web, {route: {prefix: '/web'}}, function (err) {
    if (err) {
        console.log('Failed to Load Plugin,Some Error Occur in Injecting Web-Plugin');
    } else {
        console.log('Web-Plugin Successfully Loaded');
    }
});

server.start(function (err) {
    if (err) {
        console.log('Error occur in creating server');
    } else {
        console.log('Server is Running on ' + server.info.uri);
    }
});

