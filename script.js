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
	//
}
function reset() {
	//
}

function drawFrame() {
	//
}

///////////////////////////////////////////
/// EXECUTED CODE
///////////////////////////////////////////

setup();