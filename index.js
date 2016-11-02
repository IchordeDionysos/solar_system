var planets, running, recording, time, playPauseButton, zoomLevelInput, planetSpeedInput, timeContainer,
  planetNameInput, xCoordInput, yCoordInput, xSpeedInput, ySpeedInput, planetContainer, mouseCoords, recordPauseButton,
	chartOverlay, chartCanvas, chartTypeInput, chartPlanetInput, recordingPlanet;

// The statements in the setup() function
// execute once when the program begins
function setup() {
	playPauseButton = document.querySelector('#playPauseButton');
  zoomLevelInput = document.querySelector('#zoomLevel');
  planetSpeedInput = document.querySelector('#planetSpeed');
	timeContainer = document.querySelector('#timeContainer');
	planetNameInput = document.querySelector('#planetName');
	xCoordInput = document.querySelector('#xCoord');
	yCoordInput = document.querySelector('#yCoord');
	xSpeedInput = document.querySelector('#xSpeed');
	ySpeedInput = document.querySelector('#ySpeed');
	planetContainer = document.querySelector('#planetContainer');
	mouseCoords = document.querySelector('#mouseCoords');	
	recordPauseButton = document.querySelector('#recordPauseButton');
	chartOverlay = document.querySelector('#chartOverlay');
	chartCanvas = document.getElementById("chartCanvas");
	chartTypeInput = document.querySelector('#chartType');
	chartPlanetInput = document.querySelector('#chartPlanet');

	createCanvas(DIMENSION, DIMENSION);  // Size must be the first statement
	frameRate(FRAMES);
	planets = [];
	time = 0;
	setRecording(false);
	setRunning(true);
}
// The statements in draw() are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.
function draw() {
  var zoom = zoomLevelInput.value / 100;
  var planetSpeed = planetSpeedInput.value * 1;

  var t = TIME_PER_FRAME * planetSpeed;

	if (running) {
		background(255, 255, 255);   // Set the background to black
		// Draw all planets
		for (var c=0; c<planets.length; c++) {
			planets[c].tick(t);
		}
		fill(249, 216, 44);
		stroke(249, 216, 44);
		ellipse(ORIGIN, ORIGIN, 10, 10);
		for (var d=0; d<planets.length; d++) {
			planets[d].draw(zoom);
		}
		time += t;
		timeContainer.innerText = Math.round(time / MONTH) + '. Monat';
		// Update location display
		// Check if mouse is in canvas
		if (mouseX >= 0 && mouseX <= DIMENSION && mouseY >= 0 && mouseY <= DIMENSION) {
			var xOrientation = mouseX < 400 ? -1 : 1;
			var yOrientation = mouseY < 400 ? -1 : 1;
			mouseCoords.classList.remove('hidden');
			var x = Math.round((-1 * (ORIGIN - mouseX)) / (NORMALISE_DISTANCES * 1e9 * zoom ));
			var y = Math.round((ORIGIN - mouseY) / (NORMALISE_DISTANCES * 1e9 * zoom ));
			mouseCoords.innerText = "x: " + x + " Mio. km / y: " + y + " Mio. km";
			var transX = xOrientation > 0 ? "calc(" + winMouseX + "px - 100%)" : winMouseX + "px";
			var transY = yOrientation > 0 ? "calc(" + winMouseY + "px - 100%)" : winMouseY + "px";
			mouseCoords.style.transform = "translate(" + transX + ", " + transY + ")";
			var mouseCoordsClass;
			if (xOrientation > 0 && yOrientation > 0) {
				mouseCoordsClass = 'bottomLeft';
			}
			if (xOrientation < 0 && yOrientation > 0) {
				mouseCoordsClass = 'bottomRight';
			}
			if (xOrientation > 0 && yOrientation < 0) {
				mouseCoordsClass = 'topRight';
			}
			if (xOrientation < 0 && yOrientation < 0) {
				mouseCoordsClass = 'topLeft';
			}
			mouseCoords.classList.remove('topLeft');
    		mouseCoords.classList.remove('topRight');
		    mouseCoords.classList.remove('bottomRight');
		    mouseCoords.classList.remove('bottomLeft');
			mouseCoords.classList.add(mouseCoordsClass);
		} else {
			mouseCoords.classList.add('hidden');
		}
	}
}

function addPlanet() {
	var name = planetNameInput.value;
	if (!addPlanetByName(name)) {
		var x = Number.parseFloat(xCoordInput.value) * 1e9;
		var y = Number.parseFloat(yCoordInput.value) * 1e9;
		var vx = Number.parseFloat(xSpeedInput.value) * 1e3;
		var vy = Number.parseFloat(ySpeedInput.value) * 1e3;
		planets.push(new Planet(name, x, y, vx, vy));
	}
}

function addPlanetByAphel(name, a, aphel) {
	var x = aphel;
	var y = ORIGIN;
	var vx = 0;
	var vy = Math.sqrt(G * SUN.m * (2/aphel - 1/a));
	planets.push(new Planet(name, x, y, vx, vy));
}

function addPlanetByName(name) {
	var lower_name = name.toLowerCase();
	var isSolarSystem = lower_name === SOLAR_SYSTEM;
  var nameSaved = false;

	//noinspection FallThroughInSwitchStatementJS
  switch (lower_name) {
    case SOLAR_SYSTEM:
      nameSaved = true;
		case MERCURY:
      nameSaved = true;
      addPlanetByAphel(capitalize(MERCURY), A_MERCURY, APHEL_MERCURY);
			if (!isSolarSystem) break;
		case VENUS:
      nameSaved = true;
      addPlanetByAphel(capitalize(VENUS), A_VENUS, APHEL_VENUS);
			if (!isSolarSystem) break;
		case EARTH:
      nameSaved = true;
      addPlanetByAphel(capitalize(EARTH), A_EARTH, APHEL_EARTH);
			if (!isSolarSystem) break;
		case MARS:
      nameSaved = true;
      addPlanetByAphel(capitalize(MARS), A_MARS, APHEL_MARS);
			if (!isSolarSystem) break;
		case JUPITER:
      nameSaved = true;
      addPlanetByAphel(capitalize(JUPITER), A_JUPITER, APHEL_JUPITER);
			if (!isSolarSystem) break;
		case SATURN:
      nameSaved = true;
      addPlanetByAphel(capitalize(SATURN), A_SATURN, APHEL_SATURN);
			if (!isSolarSystem) break;
		case URANUS:
      nameSaved = true;
      addPlanetByAphel(capitalize(URANUS), A_URANUS, APHEL_URANUS);
			if (!isSolarSystem) break;
		case NEPTUNE:
      nameSaved = true;
      addPlanetByAphel(capitalize(NEPTUNE), A_NEPTUNE, APHEL_NEPTUNE);
			if (!isSolarSystem) break;
		case PLUTO:
      nameSaved = true;
      addPlanetByAphel(capitalize(PLUTO), A_PLUTO, APHEL_PLUTO);
			if (!isSolarSystem) break;
			if (!isSolarSystem) break;
	}
  return nameSaved;
}

function setRunning(r) {
	playPauseButton.innerHTML =
		running ? '<i class="material-icons">play_arrow</i>' : '<i class="material-icons">pause</i>';

	running = r;
}

function setRecording(rec) {
	recording = rec;
	recordPauseButton.innerHTML =
		recording ? '<i class="material-icons">stop</i>' : '<i class="material-icons">show_chart</i>';
	if (recording) {
		var chartType = chartTypeInput.value;
		var chartPlanetOption = chartPlanetInput.selectedOptions[0];
		// Find planet to track
		for (var r=0; r<planets.length; r++) {
			if (planets[r].chartPlanetOption === chartPlanetOption) {
				recordingPlanet = planets[r];
				recordingPlanet.record(chartType);
			}
		}
	} else if(recordingPlanet) {
		var recordType = recordingPlanet.recordType;
		var recordData = recordingPlanet.stopRecording();
		var labels = [];
		for (var i=0; i<recordData.length; i++) {
			labels.push(recordData[i].x + 'd');
		}
		new Chart(chartCanvas, {
		    type: 'line',
		    data: {
		    	labels: labels,
		        datasets: [{
		            label: recordType + ' Diagramm',
		            data: recordData
		        }]
		    }
		});
		chartOverlay.classList.remove('hidden');
	}
}

function printChart() {
	var dataUrl = chartCanvas.toDataURL(); //attempt to save base64 string to server using this var
	var windowContent = '<!DOCTYPE html>';
	windowContent += '<html>';
	windowContent += '<head><title>Print chart</title></head>';
	windowContent += '<body>';
	windowContent += '<img src="' + dataUrl + '">';
	windowContent += '</body>';
	windowContent += '</html>';
	var printWin = window.open('','','width=1040,height=900');
	printWin.document.open();
	printWin.document.write(windowContent);
	printWin.document.close();
	printWin.focus();
	printWin.print();
	printWin.close();
}

function closeChartOverlay() {
	chartOverlay.classList.add('hidden');
}

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}