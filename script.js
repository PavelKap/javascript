const doc = document;
const canvas = doc.querySelector ('#canv');
const ctx = canvas.getContext ('2d');

const system = {
	width: canvas.getAttribute ('width'),
	height: canvas.getAttribute ('height'),
	currentTool: '',
	currentColor: 'black',
	brushSize: 10
}

function reRenderSystem (obj, elem, action) {
	obj [elem] = action
}

function getCoords (evt) {
	doc.querySelector ('#xCoord').innerText = evt.offsetX
	doc.querySelector ('#yCoord').innerText = evt.offsetY
}

function chooseTool (evt) {
	if (evt.target.classList.contains ('tool-button')) {
		reRenderSystem (system, 'currentTool', evt.target.id)
	}
}

function inputer (evt) {
	if (evt.target.id === 'size-select') {
		reRenderSystem (system, 'brushSize', evt.target.value)
	} else if (evt.target.id ==='color') {
		reRenderSystem (system, 'currentColor', evt.target.value)
	}
}

//выбирает рис. функцию, в зав от текущего инструмента
function startDraw (evt) {
	if (system.currentTool === 'pencil') {drawLineRect (evt)}
 	else if (system.currentTool === 'brush') {drawLineCircle (evt)}
 	else if (system.currentTool === 'eraser') {drawLineEraser (evt)}
 	else if (system.currentTool === 'fill') {fillPoligon (evt)}
 	else if (system.currentTool === 'rectangle') {rectangle (evt)}
 	else if (system.currentTool === 'spray') {spray (evt)}
 	else if (system.currentTool === 'save') {save (evt)}
}

function endDraw () {
	canvas.onmousemove = null
};

//рисовательные функции
function drawLineRect (evt) {
	canvas.onmousemove = (evt) => {
		ctx.fillStyle = system.currentColor
		ctx.fillRect (+doc.querySelector ('#xCoord').innerText, +doc.querySelector ('#yCoord').innerText, system.brushSize, system.brushSize)
	}
};

function drawLineCircle (evt) {
	canvas.onmousemove = (evt) => {
		ctx.fillStyle = system.currentColor
		ctx.beginPath();
		ctx.arc(+doc.querySelector ('#xCoord').innerText, +doc.querySelector ('#yCoord').innerText, system.brushSize, system.brushSize, Math.PI*2)
		ctx.fill()
	}
};

function drawLineEraser (evt) {
	canvas.onmousemove = (evt) => {
		ctx.clearRect (+doc.querySelector ('#xCoord').innerText, +doc.querySelector ('#yCoord').innerText, system.brushSize, system.brushSize)
	}
};

function fillPoligon (evt) {
	ctx.fillStyle = system.currentColor
	ctx.fillRect (0, 0, system.width, system.height)
};

function rectangle (evt) {
	let point = [+doc.querySelector ('#xCoord').innerText, +doc.querySelector ('#yCoord').innerText]
	canvas.onclick = (evt) => {
		ctx.beginPath();
		ctx.strokeStyle = system.currentColor;
		ctx.lineWidth = system.brushSize;
		ctx.rect(point[0], point[1], (evt.offsetX - point[0]), (evt.offsetY - point[1]));
		ctx.stroke();
		point = [];
	}
};


	function getRandomOffset(radius) {
	    var random_angle = Math.random() * (2*Math.PI);
	    var random_radius = Math.random() * radius;    
	    return {
	        x: Math.cos(random_angle) * random_radius,
	        y: Math.sin(random_angle) * random_radius
	    };
	};

	function spray() {
		canvas.onmousemove = (evt) => {
		    var density = 50; 
		    for (var i = 0; i < density; i++) {
		        var offset = getRandomOffset(system.brushSize);
		         
		        var x = +doc.querySelector ('#xCoord').innerText + offset.x;
		        var y = +doc.querySelector ('#yCoord').innerText + offset.y;
		         
		        ctx.fillRect(x, y, 1, 1);
		    }
		}
	};


	function getImage(canva) {
		let imageData = canva.toDataURL();
		let image = new Image();
		image.src = imageData;
		return image
	};
	function saveImage(img) {
		let link = doc.createElement("a");
		link.setAttribute("href", img.src);
		link.setAttribute("download", "canvasImage");
		link.click();
	};
	function save() {
		let image = getImage(canvas);
		saveImage(image);
	};

doc.addEventListener ('input', inputer);
doc.addEventListener ('click', chooseTool);
canvas.addEventListener ('mousemove', getCoords);
canvas.addEventListener ('mousedown', startDraw);
canvas.addEventListener ('mouseup', endDraw);



function clock(){

	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	if(hours < 10)
		hours = "0" + hours;
	if(minutes < 10)
		minutes = "0" + minutes;
	if(seconds < 10)
		seconds = "0" + seconds;

	var str = hours + ":" + minutes + ":" + seconds;

	document.getElementById("clock").innerHTML = str;
	setTimeout("clock()", 1000);
};

clock();