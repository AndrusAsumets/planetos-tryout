import request from 'request';

export function PlanetOS(data) {
    const PLANETOS_API_KEY = process.env.PLANETOS_API_KEY;
    let query = data.query;

    query.qs.apikey = PLANETOS_API_KEY;

	return new Promise(function(resolve, reject) {
        request(query, function (err, response, body) {

            if (err) return resolve({ error: true });

            delete data.query.qs['apikey'];
            data.data = JSON.parse(body);
            resolve({ error: null, data: data });
        });
	});
}
