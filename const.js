var DIMENSION = 800;

var ORIGIN = DIMENSION / 2;

var G = 6.6738e-11;

var SUN = {
	m: 1.989e30
};

var SOLAR_SYSTEM = 'system';
var MERCURY = 'merkur';
var VENUS = 'venus';
var EARTH = 'erde';
var MARS = 'mars';
var JUPITER = 'jupiter';
var SATURN = 'saturn';
var URANUS = 'uranus';
var NEPTUNE = 'neptun';
var PLUTO = 'pluto';

var A_MERCURY = 0.5789e11;
var APHEL_MERCURY = 69.8e9;
var A_VENUS = 1.0816e11;
var APHEL_VENUS = 108.9e9;
var A_EARTH = 1.4960e11;
var APHEL_EARTH = 152.1e9;
var A_MARS = 2.2739e11;
var APHEL_MARS = 249.2e9;
var A_JUPITER = 7.7791e11;
var APHEL_JUPITER = 816.0e9;
var A_SATURN = 14.3315e11;
var APHEL_SATURN = 1503.5e9;
var A_URANUS = 28.7228e11;
var APHEL_URANUS = 3006.3e9;
var A_NEPTUNE = 45.0290e11;
var APHEL_NEPTUNE = 4537.0e9;
var A_PLUTO = 59.064e11;
var APHEL_PLUTO = 7376.1e9;

var NORMALISE_DISTANCES = ORIGIN / APHEL_NEPTUNE;

var FRAMES = 30;

var MINUTE = 60;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var MONTH = 30 * DAY;
var YEAR = 365 * DAY;

var TIME_PER_FRAME = DAY;
