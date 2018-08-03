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
	length: 100
};

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
	this weight = weight;
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