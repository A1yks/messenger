'use strict';
var packager = require('electron-packager');
var options = {
    arch: 'x64',
    platform: 'win32',
    dir: './build',
    'app-copyright': 'Alexey Kuftirev',
    'app-version': '1.0.0',
    asar: true,
    icon: './build/icon512.ico',
    name: 'Messenger',
    overwrite: true,
    prune: true,
};
packager(options, function done_callback(err, appPaths) {
    console.log('Error: ', err);
    console.log('appPaths: ', appPaths);
});
