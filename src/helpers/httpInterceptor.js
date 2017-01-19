import 'whatwg-fetch';
import isEmpty from 'lodash/isEmpty';

export const httpInterceptor = {


  get: (url, params) => {
    let urlWithParams = url;
    const stringifiedParams = httpInterceptor.stringify(params);
    if (!isEmpty(stringifiedParams)) {
      urlWithParams = `${url}?${stringifiedParams}`;
    }
    return fetch(urlWithParams, { credentials: 'same-origin', Accept: 'application/json' })
            .then((response) => {
              if (response.status >= 200 && response.status < 300) {
                return response.json();
              }
              const error = new Error(response.statusText);
              error.response = response;
              throw error;
            });
  },

  stringify: (params) => {
    const encode = (key) => encodeURIComponent(key);
    return params ? Object.keys(params).map((key) => {
      const val = params[key];

      if (val === undefined) {
        return '';
      }

      if (val === null) {
        return encode(key);
      }

      if (Array.isArray(val)) {
        const result = [];

        val.slice().forEach((val2) => {
          if (val2 === undefined) {
            return;
          }

          if (val2 === null) {
            result.push(encode(key));
          } else {
            result.push(`${encode(key)}=${encode(val2)}`);
          }
        });

        return result.join('&');
      }

      return `${encode(key)}=${encode(val)}`;
    }).filter((x) => x.length > 0).join('&') : '';
  },

};
