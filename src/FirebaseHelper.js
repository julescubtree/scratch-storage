/**
 * @file A helper that loads/stores assets from Firebase.
 * @author Julius Diaz Panoriñgan
 */

const nets = require('nets');

const Asset = require('./Asset');
const AssetType = require('./AssetType');
const Helper = require('./Helper');

const firebaseStorage = require('./firebase');

class FirebaseHelper extends Helper {
    constructor (parent) {
        super(parent);
        this.firebaseStorage = firebaseStorage;
    }

    load (assetType, assetId, dataFormat) {

      console.log("loading from cloud storage for firebase");

        const asset = new Asset(assetType, assetId, dataFormat);

        switch (assetType) {
        case AssetType.ImageBitmap:
        case AssetType.ImageVector:
            return this.firebaseStorage.ref().child(`${assetId}.${dataFormat}`)
                .getDownloadURL()
                .then(
                    url => new Promise((resolve, reject) => {
                        nets({method: 'get', url}, (err, resp, body) => {
                            // body is a Buffer
                            if (err || Math.floor(resp.statusCode / 100) !== 2) {
                                resolve(null);
                            } else {
                                asset.setData(body, dataFormat);
                                resolve(asset);
                            }
                        });
                    }),
                    () => Promise.reject()
                );
        default:
            return Promise.resolve(null);
        }
    }

    store (assetType, dataFormat, data, assetId) {
        switch (assetType) {
        case AssetType.ImageBitmap:
        case AssetType.ImageVector:
            return new Promise((resolve, reject) => {
                const uploadTask = this.firebaseStorage.ref().child(`${assetId}.${dataFormat}`).put(data);
                uploadTask.on('state_changed', {
                    next: () => {
                        console.log("upload uploading");
                    },
                    error: error => {
                        console.log("error on firebase upload");
                        reject(error);
                    },
                    complete: () => {
                        console.log("completed firebase upload");
                        resolve();
                    }
                });
            });
        default:
            return Promise.reject();
        }
    }
}

module.exports = FirebaseHelper;
