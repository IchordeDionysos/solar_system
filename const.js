var DIMEN = 800;

var ORIGIN = DIMEN / 2;

var G = 6.6738e-11;

var SUN = {
	m: 1.989e30
};

var A = 1.4960e11;

var APHEL = 152.1e9;

var NORMALISE_DISTANCES = ORIGIN / APHEL;

var FRAMES = 30;

var MINUTE = 60;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var MONTH = 30 * DAY;
var YEAR = 365 * DAY;

var TIME_PER_FRAME = DAY;
