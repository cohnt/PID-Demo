///////////////////////////////////////////
/// CONSTANTS
///////////////////////////////////////////

var parameters = {
	P: 1,
	I: 1,
	D: 1,
	initial: Math.PI * 3 / 4,
	goal: 0,
	weight: 1,
	length: 100 //In *centimeters*
};
var pendulumDisplayRadius = 20;

///////////////////////////////////////////
/// GLOBAL VARIABLES
///////////////////////////////////////////

var canvas;
var ctx;
var pendulum;
var lastTime;
var running = false;
var stop = false;

///////////////////////////////////////////
/// CLASSES
///////////////////////////////////////////

function Pendulum(angle, length, weight) {
	this.angle = angle;
	this.length = length;
	this.weight = weight;

	this.vel = 0;
	this.acl = 0;

	this.draw = function() {
		var weightLoc = [250 + (this.length * Math.cos(this.angle)), 250 + (this.length * Math.sin(this.angle))];

		ctx.beginPath();
		ctx.moveTo(260, 250);
		ctx.arc(250, 250, 10, 0, 2*Math.PI, true);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(250, 250);
		ctx.lineTo(weightLoc[0], weightLoc[1]);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(weightLoc[0], weightLoc[1]);
		ctx.arc(weightLoc[0], weightLoc[1], pendulumDisplayRadius, 0, 2*Math.PI, true);
		ctx.closePath();
		ctx.fill();
	}
	this.computeAcl = function() {
		var gravAngle = Math.PI / 2;
		var dAngle = gravAngle - this.angle;
		var gravForce = 9.8 * this.weight;
		var torque = this.length * (1/100) * gravForce * Math.sin(dAngle);
		this.acl = torque / this.weight;
	}
	this.updateVel = function(dt) {
		//
		this.vel += this.acl * dt;
	}
	this.updateAngle = function(dt) {
		//
		this.angle += this.vel * dt;
	}
}

///////////////////////////////////////////
/// FUNCTIONS
///////////////////////////////////////////

function setup() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	document.getElementById("start").addEventListener("click", start);
	document.getElementById("reset").addEventListener("click", reset);

	pendulum = new Pendulum(parameters.initial, parameters.length, parameters.weight);
}

function start() {
	if(running) {
		return;
	}

	lastTime = window.performance.now();
	requestAnimationFrame(tick);
}
function reset() {
	stop = true;
	pendulum = new Pendulum(parameters.initial, parameters.length, parameters.weight);
}

function drawFrame() {
	clearScreen();
	pendulum.draw();
}
function clearScreen() {
	//
	ctx.clearRect(0, 0, 500, 500);
}

function tick() {
	if(stop) {
		running = false;
		stop = false;
		return;
	}

	var t = window.performance.now();
	var dt = t - lastTime;
	console.log("t: " + t + "\t\tdt: " + dt);

	pendulum.computeAcl();
	pendulum.updateVel(dt / 1000);
	pendulum.updateAngle(dt / 1000);

	console.log(pendulum.acl);
	console.log(pendulum.vel);
	console.log(pendulum.angle);
	console.log("");

	drawFrame();

	lastTime = t;
	requestAnimationFrame(tick);
}

///////////////////////////////////////////
/// EXECUTED CODE
///////////////////////////////////////////

setup();