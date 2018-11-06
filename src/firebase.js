/**
 * @file Provides Firebase functionality to be used with/by storage.
 * @author Julius Diaz Panoriñgan
 */

const firebase = require('firebase/app');
require('firebase/storage');

const config = {
    apiKey: 'AIzaSyBOk85Sqxim1pI7OMZWaWsEkOXBkfazcX8',
    authDomain: 'windy-access-221123.firebaseapp.com',
    databaseURL: 'https://windy-access-221123.firebaseio.com',
    projectId: 'windy-access-221123',
    storageBucket: 'jct-scratch-graphical-asset-sandbox',
    messagingSenderId: '933195205612'
};
/* const firebaseApp = */ firebase.initializeApp(config);
const firebaseStorage = firebase.storage();

module.exports = firebaseStorage;
