/** Module dependencies.*/
const app = require('../app');
const http = require('http');
const mqtt = require('mqtt');
const config = require('../config/network');
const logColor = require('../src/untils/logColor');
const service = require('./services/services');
const convertData = require('./services/socket_data');
const utils = require("./services/utils");
const moment = require("moment")

const mqttConfig = require("../config/config").mqtt;
/** Get port from environment and store in Express.*/
let port = normalizePort(process.env.PORT || config.port);
app.set('port', port);

/** Create HTTP server.*/
let server = http.createServer(app);
const io = require('socket.io')(server);

const options = {
	username: mqttConfig.username,
	password: mqttConfig.password
};

let client = mqtt.connect(mqttConfig.host, options);
/** MQTT connection.*/

client.on('connect', function () {
	client.subscribe('send_data', function (err) {
		log.info("Connect to MQTT");
		if (err) throw err;
	});
	client.subscribe('control_status', {qos: 1});
	client.subscribe('controller', {qos: 1});
});
/** MQTT message.*/
client.on('message', async function (topic, message) {

	let data = JSON.parse(message);
	if (topic === "send_data") {
		// log.info(`Topic: ${topic}`);
		log.info(`Message in topic: send_data`);
		let convert = utils.convertData(data);

		// FAKE HUMIDITY IF VALUE = 0
		rootHumidityFake = [60,65,70,70,85,80,80,65,55,50,45,40,45,40,40,40,50,45,50,55,55,55,55,60]
		if(convert.H1 && convert.H1.value === "0"){
			let value = rootHumidityFake[moment().hour()] + Math.floor(Math.random() * 2);
			convert.H1.value = JSON.stringify(value);		
		}
		// ****

		log.info(convert);
		await service.saveData(convert);
		io.sockets.emit('farm_' + convert.sub_id, convert);
	}
	if (topic === "control_status") {
		// log.info(data);
		if(data.status === "False"){
			io.sockets.emit('controller_' + data.sub_id, data);
			log.info("Gửi trạng thái False to: " + data.sub_id)
		}
		else {
			io.sockets.emit('controller_' + data.sub_id, data);
			delete data.status;
			await service.saveCtrl(data);
			log.info(data);
			log.info("Lưu data control")
		}
	}

	if (topic === "controller") {
		log.info("Send success to topic: control");
		log.info(data);
	}
});

/** Socket.io connection.*/
io.on('connection', function (socket) {
	let sub_id = socket.handshake.query.sub_id;
	log.info(`New connect socket: ${sub_id}`);
	// if(sub_id) {
	//   setInterval(async function () {
	//     let data = convertData.fakeData(sub_id);
	//     let convert = convertData.convertData(data);
	//     // if(await service.automation(sub_id, data)){
	//     //   client.publish("controller", JSON.stringify(service.onCtrl()))
	//     // }
	//     // console.log(convert);
	//     let topic = "farm_" + sub_id;
	//     socket.emit(topic, convert);
	//   }, 3000);
	// }
	// console.log(fakeData(sub_id));
	socket.on("controller", async function (data) {
		log.info(`New message controller: ${data}`);
		client.publish("controller", JSON.stringify(data))
	});
});

/** Listen on provided port, on all network interfaces.*/
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/** Normalize a port into a number, string, or false.*/
function normalizePort(val) {
	let port = parseInt(val, 10);
	if (isNaN(port)) return val; // named pipe
	if (port >= 0) return port; // port number
	return false;
}

/** Event listener for HTTP server "error" event.*/
function onError(error) {
	if (error.syscall !== 'listen') throw error;
	let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/** Event listener for HTTP server "listening" event.*/
function onListening() {
	let addr = server.address();
	let bind = typeof addr === 'string' ? 'pipe ' + addr : addr.port;
	console.log('Listening on ' + logColor(`color:yellow${config.hostname}:${bind}`));
}

console.log(logColor(`color:pink
███████╗ █████╗ ██████╗ ███╗   ███╗
██╔════╝██╔══██╗██╔══██╗████╗ ████║
█████╗  ███████║██████╔╝██╔████╔██║
██╔══╝  ██╔══██║██╔══██╗██║╚██╔╝██║
██║     ██║  ██║██║  ██║██║ ╚═╝ ██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝
`));

