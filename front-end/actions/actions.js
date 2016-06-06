import superagent from 'superagent';

export const SET_INTRA_DAY = 'SET_INTRA_DAY';
export const SET_API = 'SET_API';

let HOST
if (process.env.NODE_ENV == 'production') HOST = 'http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT
else HOST = 'http://localhost:4000'

export function Crawl(data) {
    return dispatch => {
        superagent
            .post(HOST + '/crawl/')
            .send(data)
            .set('Accept', 'jsonp')
            .end(function(err, res) {
                if (err) { return };

                const response = JSON.parse(res.text);

                if (response.error) return console.log('Failed to crawl data from ' + data.url + '.');

                dispatch(setIntraDay(response));
            });
    }
}

export function API(data) {
    return dispatch => {
        superagent
            .post(HOST + '/api/')
            .send(data)
            .set('Accept', 'jsonp')
            .end(function(err, res) {
                if (err) { return };

                const response = JSON.parse(res.text);

                if (response.error) return console.log('Failed to fetch ' + data.type + ' data from API.');

                dispatch(setAPI(response));
            });
    }
}

export function setIntraDay(data) {
    return {
        type: SET_INTRA_DAY,
        data: data
    }
}

export function setAPI(data) {
    return {
        type: SET_API,
        data: data
    }
}
