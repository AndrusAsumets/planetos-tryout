import jsdom from 'jsdom';

export function Crawler(options) {
    const url = options.url;
    const selector = options.selector;

	return new Promise(function(resolve, reject) {
        jsdom.env({
            url: url,
            scripts: ['http://code.jquery.com/jquery.js'],
            done: function (err, window) {
                if (err) return resolve({ error: true })

                const $ = window.$;
                let response = [];

                $(selector).each(function() {
                    response.push($(this).text());
                });

                resolve({ error: null, response: response });
            }
        });
	});
}
