function Planet(name, x, y, vx, vy) {

	this.init = function() {
		// Setup sidenav item
		this.id = name;
		this.name = name;

		this.planetContainer = document.createElement('div');
		this.planetContainer.classList.add('planet');
		planetContainer.appendChild(this.planetContainer);

		this.deleteButton = document.createElement('button');
		this.deleteButton.classList.add('deleteButton');
		this.deleteButton.innerHTML = '<i class="material-icons">delete_forever</i>';
		this.deleteButton.onclick = this.delete.bind(this);
		this.planetContainer.appendChild(this.deleteButton);

		this.infoContainer = document.createElement('div');
		this.infoContainer.classList.add('planetInfo');
		this.planetContainer.appendChild(this.infoContainer);

		this.nameContainer = document.createElement('div');
		this.nameContainer.classList.add('planetName');
		this.nameContainer.innerText = this.name;
		this.infoContainer.appendChild(this.nameContainer);

		this.speedContainer = document.createElement('div');
		this.speedContainer.classList.add('planetSpeed');
		this.infoContainer.appendChild(this.speedContainer);

		this.acclerationContainer = document.createElement('div');
		this.acclerationContainer.classList.add('planetAccleration');
		this.infoContainer.appendChild(this.acclerationContainer);

		this.chartPlanetOption = document.createElement('option');
		this.chartPlanetOption.innerText = this.name;
		chartPlanetInput.appendChild(this.chartPlanetOption);

		this.px = x;
		this.py = y;
		this.vx = vx;
		this.vy = vy;

		this.points = [];
		
		this.recordType;
		this.recordTime = 0;
		this.recordData = [];
	};

	this.tick = function (t) {
		var a = G * SUN.m / (this.px * this.px + this.py * this.py);
		this.acclerationContainer.innerText = Math.floor(a * 1e3, 3) + ' mm/s^2';
		var v_g = -1 * a * t * Math.sign(this.py);
		var alpha = Math.atan(this.px / this.py);
		var vx_g = Math.sin(alpha) * v_g;
		var vy_g = Math.cos(alpha) * v_g;
		this.vx = this.vx + vx_g;
		this.vy = this.vy + vy_g;
		var v = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
		this.speedContainer.innerText = Math.floor(v/1e3, 3) + ' km/s';
		this.px = this.px + this.vx * t;
		this.py = this.py + this.vy * t;

		if (this.points.length > 400)
			this.points.shift();
		this.points.push({x: this.px, y: this.py});

		if (this.recordType === 's-t') {
			this.recordData.push({x: this.recordTime, y: Math.sqrt(this.px * this.px + this.py * this.py) / 1e9});
		} else if (this.recordType === 'v-t') {
			this.recordData.push({x: this.recordTime, y: Math.sqrt(this.vx * this.vx + this.vy * this.vy) / 1e3});
		} else if (this.recordType === 'a-t') {
			this.recordData.push({x: this.recordTime, y: a});
		}
		this.recordTime++;
	};

	this.record = function (type) {
		this.recordData = [];
		this.recordType = type;
		this.recordTime = 0;
	};

	this.stopRecording = function() {
		this.recordType = null;
		return this.recordData;
	};

	this.draw = function () {
		this.earth++;
		fill(150, 150, 150);
		stroke(150, 150, 150);
		for (var i = 0; i < this.points.length; i++) {
			ellipse(this.points[i].x * NORMALISE_DISTANCES + ORIGIN, this.points[i].y * NORMALISE_DISTANCES + ORIGIN, 2, 2);
		}
		fill(0, 0, 200);
		stroke(0, 0, 200);
		ellipse(this.px * NORMALISE_DISTANCES + ORIGIN, this.py * NORMALISE_DISTANCES + ORIGIN, 5, 5);
	};

	this.delete = function() {
		var index = planets.indexOf(this);
		planets.splice(index, 1);
		planetContainer.removeChild(this.planetContainer);
		chartPlanetInput.removeChild(this.chartPlanetOption);
	};

	this.init();
}
