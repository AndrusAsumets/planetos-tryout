# This is a source code of a dashboard for an UI/UX engineer post in PlanetOS. 

The project has been divided into two separate folders (front-end and back-end). The role of the front-end is visualize energy production coming through two separate API-s, and has been developed using React.js using a FLUX pattern (redux). In development mode it runs on WebPack and is served by Node.js's Express framework. For production use, it needs to be pre-built (there's introductions on how to do it on production tab under 'Installation' section). Back-end has been written in JavaScript and runs on Node.js, and is being served by Koa.js framework. 

The dashboard queries back-end for both power and voltage data as it crawls this link: http://pvoutput.org/intraday.jsp?id=6577&sid=7367 (A solar farm near Sandersdorf, Germany, that consists of 30 panels) in 10 second intervals. Secondly, it queries PlanetOS's api for cloud coverage and solar activity corresponding to the location with a 24hour resolution, and caches it into a file for the usage of front-end. After receiving data from the back-end it will is use it draw a grid for power and voltage and two separate graphs for cloud and solar data using d3.js's component for React.js. 


### Installation (development) 
Clone the repository: 
git clone https://github.com/AndrusAsumets/planetos-tryout.git 

Change the current directory to front-end: 
cd planetos-tryout/front-end/ 

Install relevant modules: 
npm install 

Run it: 
npm run development 

For back-end open new shell tab and cd into the root directory of the project: 
cd planetos-tryout/back-end/ 

Create an .env file inside of the root directory of back-end for a PlanetOS API key and enter:  
PLANETOS_API_KEY={YOUR_API_KEY_HERE}  

Install relevant modules: 
npm install 

Run it: 
node init.js 

Now open http://localhost:3000 in your browser and see the magic happening right in front of your eyes! 

(Disclaimer: If it isn't displaying anything but the UI, clean out planetos-tryout/back-end/data/ and try again.) 

### Installation (production) 

Create .env file under planetos-tryout/front-end/ and insert back-end's host and ip (those values injected into build.min.js after build process):  
SERVER_HOST={SERVER_HOST_HERE}  
SERVER_PORT={SERVER_PORT_HERE}  

Build it: 
npm run build 

Run it in production: 
npm run production 

Optionally, you can also change local PORT variables for both front-end and back-end by including:  
PORT=<YOUR_PORT_HERE>  
into relevant .env files.  

This setup has been tested with Node.js v6.1.0 and v5.2.0. 
