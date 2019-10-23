const request = require('request-promise');
const config = require('../wdio.conf.js').config;

const tough = require('tough-cookie');
const _ = require('lodash');

// The utility file can be used to implement 3rd party tools interfaces
export default class utility {

    /**
     * This is an implementation of 'request-promise' node module used to make api calls to various api services
     * @param {string} method This variables indicates what HTTP operation needs to be done POST, PUT, GET or DELETE
     * @param {string} uri Uri tells the actual resources and entities for which the above said opertation needs to be performed
     * This function can aslo accept JSON if we were to perform POST and PUT HTTP operations
     */
    async makeAPIRequest(method, uri) {

        let cookies = await browser.cookie();
        let cookieOfInterest = _.find(cookies.value, {name: 'NYT-S'});

        //setting cookie
        let cookie = new tough.Cookie({
            domain: 'cooking.nytimes.com',
            name: 'NYT-S',
            value: cookieOfInterest.value,
            httpOnly: false,
            path: '/',
            secure: false
        });

        let cookieJar = request.jar();
        cookieJar.setCookie(cookie, 'https://cooking.nytimes.com');

        var options = {
            method: method,
            uri: config.baseUrl + uri,
            jar: cookieJar
        };

        return await request(options)
            .then(function(parsedBody) {
                console.log(parsedBody);
                return parsedBody;
            })
            .catch(function(error) {
                console.log(error.message);
                return error.message;
            });
    }

}