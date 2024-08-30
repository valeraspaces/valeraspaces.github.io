const camera = new WorldObject();
const scene = new Scene();
const object = new WorldObject();
const object2 = new WorldObject();
const object3 = new WorldObject();
const canvas = document.querySelector("#output");
const fpsCounter = document.querySelector("#fps");
const fpsCounterGraph = document.querySelectorAll("#fps-graph canvas")[0];
const fpsCounterGraphLabel = document.querySelectorAll("#fps-graph .info")[0];
const fpsCounterGraphContext = fpsCounterGraph.getContext("2d");
const fpsTimeLine = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

object.transform.scale = [3, 3, 3];

object.geometry = new Geometry();
object.geometry.lines = [
  [[-0.5, 0, -0.5], [-0.5, 0, 0.5]],
  [[-0.5, 0, 0.5], [0.5, 0, 0.5]],
  [[0.5, 0, 0.5], [0.5, 0, -0.5]],
  [[0.5, 0, -0.5], [-0.5, 0, -0.5]],
  [[-0.5, -0.5, 0], [0.5, -0.5, 0]],
  [[0.5, 0.5, 0], [-0.5, 0.5, 0]]
];
object.geometry.linesAngleX = [[0, 0], [0, 0], [0, 0], [0, 0], [Math.PI/2, Math.PI/2], [Math.PI/2, Math.PI/2]];
//object.geometry.linesHeight = [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]];
//object.geometry.texture.color = [0, 0, 0, 255];
//object.geometry.texture.width = 10;
//object.geometry.texture.height = 10;
//object.geometry.texture.data = new Uint8ClampedArray(object.geometry.texture.height * object.geometry.texture.width * 4);
//const debugFace = [
//		255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
//		255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
//		255, 255, 0, 255, 255, 255, 255, 0, 255, 255,
//		255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
//		255, 255, 255, 255, 0, 255, 255, 255, 255, 255,
//		255, 255, 255, 255, 0, 0, 255, 255, 255, 255,
//		255, 0, 255, 255, 255, 255, 255, 255, 0, 255,
//		255, 255, 0, 255, 255, 255, 255, 0, 255, 255,
//		255, 255, 255, 0, 0, 0, 0, 255, 255, 255,
//		255, 255, 255, 255, 255, 255, 255, 255, 255, 255
//];
//for (let i = 0; i < object.geometry.texture.data.length; i += 4) {
//  object.geometry.texture.data[i + 0] = debugFace[i / 4];
//  object.geometry.texture.data[i + 1] = debugFace[i / 4];
//  object.geometry.texture.data[i + 2] = debugFace[i / 4];
//  object.geometry.texture.data[i + 3] = 255;
//}
//const imageDataTexture = new ImageData(10, 10);
//for (let i = 0; i < object.geometry.texture.data.length; i++) {
//	imageDataTexture.data[i] = object.geometry.texture.data[i];
//}
function imageToArrayBuffer(img) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            resolve(event.target.result);
        };
        reader.onerror = reject;

        fetch(img.src)
            .then(res => res.blob())
            .then(blob => reader.readAsArrayBuffer(blob))
            .catch(reject);
    });
}
const img = new Image();
img.src = './product-3101010070.jpg';  // Вкажіть шлях до вашого зображення
img.crossOrigin = "Anonymous";  // Для уникнення проблем з CORS, якщо зображення знаходиться на іншому домені

img.onload = () => {
	imageToArrayBuffer(img).then(arrayBuffer => {
		object.geometry.texture.data = new Uint8Array(arrayBuffer);
		object.geometry.texture.width = 500;
		object.geometry.texture.height = 500;
	});
};
object.geometry.uv = [[[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]]];
object.geometry.texture.wireframeColor = [0, 255, 0, 255];
scene.objects.push(object);

object2.geometry = new Geometry();
object2.geometry.lines = [
  [[-0.5, 0, -0.5], [-0.5, 0, 0.5]],
  [[-0.5, 0, 0.5], [0.5, 0, 0.5]],
  [[0.5, 0, 0.5], [0.5, 0, -0.5]],
  [[0.5, 0, -0.5], [-0.5, 0, -0.5]],
  [[-0.5, -0.5, 0], [0.5, -0.5, 0]],
  [[0.5, 0.5, 0], [-0.5, 0.5, 0]]
];
object2.geometry.linesAngleX = [[0, 0], [0, 0], [0, 0], [0, 0], [Math.PI/2, Math.PI/2], [Math.PI/2, Math.PI/2]];
object2.geometry.linesHeight = [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]];
object2.geometry.texture.color = [255, 0, 255, 255];
object2.geometry.texture.wireframeColor = [255, 0, 0, 255];
object2.geometry.texture.wireframe = true;
object.geometry.texture.wireframe = true;
//scene.objects.push(object2);

object3.geometry = new Geometry();
object3.transform.scale = [60, 60, 60];
object3.transform.position[2] = 60;
object3.geometry.lines = [
  [[-0.5, 0, -0.5], [-0.5, 0, 0.5]],
  [[-0.5, 0, 0.5], [0.5, 0, 0.5]],
  [[0.5, 0, 0.5], [0.5, 0, -0.5]],
  [[0.5, 0, -0.5], [-0.5, 0, -0.5]],
  [[-0.5, -0.5, 0], [0.5, -0.5, 0]],
  [[0.5, 0.5, 0], [-0.5, 0.5, 0]]
];
object3.geometry.linesAngleX = [[0, 0], [0, 0], [0, 0], [0, 0], [Math.PI/2, Math.PI/2], [Math.PI/2, Math.PI/2]];
object3.geometry.linesHeight = [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]];
object3.geometry.texture.color = [255, 255, 255, 255];
//scene.objects.push(object3);

camera.transform.position[2] = -5;
const renderer = new Renderer(scene, camera);
renderer.context = canvas.getContext("2d");
renderer.cameraScale = [1, 1];
let mousePosition = [0, 0];
let fpsBuffer = [];
const startTimeBufferingFPS = 0.2;
let timeBufferingFPS = 0;
let averageFromStartup = 0;
let updateNum = 0;

let deltaTime = 0;
let lastTime = performance.now();

addEventListener("mousemove", (e) => {
	mousePosition = [e.clientX, e.clientY];
});
fpsCounter.innerHTML = deltaTime < 1 ? `${Math.floor(1 / deltaTime)} fps` : `${Math.floor(deltaTime)} s`;


function anim () {
	window.requestAnimationFrame(anim);
	updateNum++;
	canvas.width = window.innerWidth / 5;
	canvas.height = window.innerHeight / 5;
	
  	//camera.transform.rotation = [0, Math.sin(performance.now() / 5000 - Math.PI / 6) * renderer.fieldOfView[0], 0];
	//camera.transform.position[2] = Math.sin(performance.now() / 15000 * Math.PI) * 10 + 15;
	let [maxTimeLineFPS, minTimeLineFPS] = [0, Infinity];
	let averageTimeLineFPS = 0;
	for (let index in fpsTimeLine) {
		if (index == 0) continue;
		const currentElement = fpsTimeLine[index];
		fpsTimeLine[Number(index) - 1] = currentElement;
	}
	const fps = 1 / deltaTime;
	fpsTimeLine[fpsTimeLine.length - 1] = fps;
	averageFromStartup = fps < Infinity && fps > -Infinity ? (averageFromStartup * (updateNum - 1) + fps) / updateNum : averageFromStartup;
	for (let element of fpsTimeLine) {
		maxTimeLineFPS = Math.max(maxTimeLineFPS, element);
		minTimeLineFPS = Math.min(minTimeLineFPS, element);
		averageTimeLineFPS += element;
	}
	averageTimeLineFPS /= fpsTimeLine.length;
	fpsCounterGraphContext.clearRect(0, 0, fpsCounterGraph.width, fpsCounterGraph.height);
	fpsCounterGraphContext.beginPath();
	fpsCounterGraphContext.lineWidth = 1.5;
	fpsCounterGraphContext.lineCap = "round";
	fpsCounterGraphContext.lineJoin = "round";
	fpsCounterGraphContext.strokeStyle = minTimeLineFPS < 120 ? (averageTimeLineFPS < 40 || maxTimeLineFPS < 50 ? "red" : "green") : "blue";
	for (let index in fpsTimeLine) {
		const currentElement = fpsTimeLine[index];
		const [currentElementOnCanvasY, currentElementOnCanvasX] = [(1 - (currentElement - minTimeLineFPS / 2) / maxTimeLineFPS) * fpsCounterGraph.height, index / (fpsTimeLine.length - 1) * fpsCounterGraph.width];
		if (index == 0) {
			fpsCounterGraphContext.moveTo(currentElementOnCanvasX,currentElementOnCanvasY);
			continue;
		}
		fpsCounterGraphContext.lineTo(currentElementOnCanvasX, currentElementOnCanvasY);
	}
	fpsCounterGraphContext.stroke();
	fpsCounterGraphLabel.innerHTML = `
	  Max: ${Math.floor(maxTimeLineFPS)} fps<br />
	  Average: ${Math.floor(averageTimeLineFPS)} fps<br />
	  ${averageFromStartup >= 50 ? "<span style=\"color: green\">•</span> " : (averageFromStartup <= 24 ? "<span style=\"color: red\">•</span> " : '')}SMA: ${Math.floor(averageFromStartup)} fps<br />
	  Min: ${Math.floor(minTimeLineFPS)} fps
	`;
	
	const performanceNow = performance.now();
	object.transform.rotation[0] = performanceNow / 2000;
	object.transform.rotation[1] = performanceNow / 2000;
	object.transform.rotation[2] = performanceNow / 2000;
	
	object2.transform.rotation[0] = -performanceNow / 2000;
	object2.transform.rotation[1] = -performanceNow / 2000;
	object2.transform.rotation[2] = -performanceNow / 2000;
	//object2.transform.position[2] = -Math.cos(performance.now() / 10000) * 10;

	object.geometry.texture.color = Mathf.vectorsMultipleCoords([Math.sin(performanceNow / 1500), Math.sin(performanceNow / 2000), Math.cos(performanceNow / 1000), 1], [255, 255, 255, 255]);
	//object.geometry.normalDirection = Math.sin(performanceNow / 10000 * 2 * Math.PI);
	
	renderer.screenSize = [canvas.width, canvas.height];
	renderer.aspectRatio = renderer.screenSize[0] / renderer.screenSize[1];
	renderer.updateConstants();
	renderer.rendering();
	
	if (timeBufferingFPS >= startTimeBufferingFPS) {
	  timeBufferingFPS = 0;
	  let average = 0;
	  for (let el of fpsBuffer) {
	    average += el;
	  }
	  average /= fpsBuffer.length;
	  fpsBuffer = [];
	  fpsCounter.innerHTML = average < 1 ? `${Math.floor(1 / average)} fps` : `${Math.floor(average)} s`;
	} else {
	  timeBufferingFPS += deltaTime;
	  fpsBuffer.push(deltaTime);
	}
	
	const currentTime = performance.now();
	deltaTime = (currentTime - lastTime) / 1000;
	lastTime = currentTime;
}
anim();