///////////////////////////////////////////
/// CONSTANTS
///////////////////////////////////////////

var parameters = {
	P: 5,
	I: 8,
	D: 5,
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
var stopRunning = false;

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
	this.computeAcl = function(fApplied) {
		var gravAngle = Math.PI / 2;
		var dAngle = gravAngle - this.angle;
		var gravForce = 9.8 * this.weight;
		var torque = this.length * (1/100) * gravForce * Math.sin(dAngle);
		this.acl = (torque / this.weight) + fApplied;
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
function MotorController(P, I, D) {
	this.P = P;
	this.I = I;
	this.D = D;

	this.eIntegral = 0;
	this.eDerivative = 0;
	this.lastE = 0;

	this.output = function(error, dt) {
		return this.pTerm(error) + this.iTerm(error, dt) + this.dTerm(error, dt);
	}

	this.pTerm = function(error) {
		return this.P * error;
	}
	this.iTerm = function(error, dt) {
		this.updateIntegral(error, dt);
		return this.I * this.eIntegral;
	}
	this.dTerm = function(error, dt) {
		this.updateDerivative(error, dt);
		return this.D * this.eDerivative;
	}

	this.updateIntegral = function(error, dt) {
		this.eIntegral += error * dt;
	}
	this.updateDerivative = function(error, dt) {
		this.eDerivative = (error - this.lastE) / dt;
		this.lastE = error;
	}
}

///////////////////////////////////////////
/// FUNCTIONS
///////////////////////////////////////////

function setup() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	document.getElementById("start").addEventListener("click", start);
	document.getElementById("stop").addEventListener("click", stop);
	document.getElementById("reset").addEventListener("click", reset);

	pendulum = new Pendulum(parameters.initial, parameters.length, parameters.weight);
	mc = new MotorController(parameters.P, parameters.I, parameters.D);
}

function start() {
	if(running) {
		return;
	}

	running = true;

	lastTime = window.performance.now();
	requestAnimationFrame(tick);
}
function stop() {
	if(running) {
		stopRunning = true;
	}
}
function reset() {
	if(running) {
		return;
	}
	pendulum = new Pendulum(parameters.initial, parameters.length, parameters.weight);
	mc = new MotorController(parameters.P, parameters.I, parameters.D);
	drawFrame();
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
	if(stopRunning) {
		running = false;
		stopRunning = false;
		return;
	}

	var t = window.performance.now();
	var dt = (t - lastTime) / 1000; //ms to seconds
	console.log("t: " + t + "\t\tdt: " + dt);

	var error = parameters.goal - pendulum.angle;

	pendulum.computeAcl(mc.output(error, dt));
	pendulum.updateVel(dt);
	pendulum.updateAngle(dt);

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