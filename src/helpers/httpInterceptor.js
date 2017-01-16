import 'whatwg-fetch';

export const httpInterceptor = {


    get: (url, params) => {
        url = url + "?" + httpInterceptor.stringify(params);
        return fetch(url, {credentials: 'same-origin', Accept: 'application/json'})
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                }
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            })
    },

    stringify: (params) => {
        var encode = (key) => {
            return encodeURIComponent(key)
        };
        return params ? Object.keys(params).map(function (key) {
            var val = params[key];

            if (val === undefined) {
                return '';
            }

            if (val === null) {
                return encode(key);
            }

            if (Array.isArray(val)) {
                var result = [];

                val.slice().forEach(function (val2) {
                    if (val2 === undefined) {
                        return;
                    }

                    if (val2 === null) {
                        result.push(encode(key));
                    } else {
                        result.push(encode(key) + '=' + encode(val2));
                    }
                });

                return result.join('&');
            }

            return encode(key) + '=' + encode(val);
        }).filter(function (x) {
            return x.length > 0;
        }).join('&') : '';
    }

};
