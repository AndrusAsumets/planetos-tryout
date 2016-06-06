require('dotenv').config();

let app = require('koa')();
let router = require('koa-router')();
var bodyParser = require('koa-bodyparser');
var cors = require('koa-cors');
import { Crawler } from './src/crawler';
import { PlanetOS } from './src/planetOS';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 4000;
const INTERVAL = 3 * 60 * 60 * 1000;
const queries = [
    {
        solar: {
            url: 'http://api.planetos.com/v1/datasets/bom_access-g_global_40km/point',
            qs: {
                lon: '51.54',
                lat: '12.27',
                var: 'av_swsfcdown',
                csv: 'false',
                count: '50'
            }
        }
    },
    {
        cloud: {
            url: 'http://api.planetos.com/v1/datasets/bom_access-g_global_40km/point',
            qs: {
                lon: '51.54',
                lat: '12.27',
                var: 'av_ttl_cld',
                csv: 'false',
                count: '50'
            }
        }
    }
]

fetch(queries);
setInterval(function(){ fetch(queries) }, INTERVAL);

function fetch(queries) {
    queries.forEach(async function(query) {
        const TYPE = Object.keys(query)[0];
        const FOLDER_PATH = path.join(__dirname, '/data');
        const FILE_PATH = path.join(FOLDER_PATH, TYPE + '.json');
        let data = { time: 0, query: query[TYPE], data: {} };

        if (!fs.existsSync(FOLDER_PATH)) fs.mkdirSync(FOLDER_PATH);
        if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, JSON.stringify(data, 0, 4), 'utf8');

        data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));

        if ((new Date).getTime() - INTERVAL > data.time) {
            const RESPONSE = await PlanetOS(data);

            if (RESPONSE.error) return console.log(RESPONSE.error);

            data = RESPONSE.data;
            data.time = (new Date).getTime();

            fs.writeFileSync(FILE_PATH, JSON.stringify(data, 0, 4), 'utf8');
        }
    });
}

router.post('/crawl',
    async function(next) {
        this.type = 'jsonp';
        this.body = await Crawler(this.request.body);
    }
)

router.post('/api',
    async function(next) {
        const TYPE = this.request.body.type;
        const FOLDER_PATH = path.join(__dirname, '/data');
        const FILE_PATH = path.join(FOLDER_PATH, TYPE + '.json');

        this.type = 'jsonp';
        if (fs.existsSync(FILE_PATH)) this.body = { error: false, data: JSON.parse(fs.readFileSync(FILE_PATH, 'utf8')).data, type: TYPE }
        else this.body = { error: true }
    }
)

app.use(bodyParser());
app.use(cors());
app.use(router.routes());
app.listen(PORT);

console.log('API is listening on', PORT + '.');
