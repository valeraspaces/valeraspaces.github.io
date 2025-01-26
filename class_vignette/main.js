const camera = new WorldObject();
const scene = new Scene();
const map = new WorldObject();
const canvas = document.querySelector("#output");

let properties = {
    cameraSpeed: 2.5,
    controls: {
        moveForward: "w",
        moveBack: "s",
        moveLeft: "a",
        moveRight: "d"
    },
    rendererResolution: 1,
    invertMouse: {
        x: false,
        y: false
    },
    fieldOfView: Math.PI / 2,
    unlockXRotation: false
};

const Time = {
    prevStartupTimer: performance.now(),
    deltaTimeUpdate() {
        window.requestAnimationFrame(Time.deltaTimeUpdate);
        const currentStartupTimer = performance.now();
        this.deltaTime = (currentStartupTimer - this.prevStartupTimer) / 1000;
        this.fps = 1 / this.deltaTime;
        this.prevStartupTimer = currentStartupTimer;
        camera.transform.rotation[1] += Time.deltaTime;
    }
}

map.geometry = new Geometry();
map.geometry.lines = [
  [[-0.5, 0, -0.5], [-0.5, 0, 0.5]],
  [[-0.5, 0, 0.5], [0.5, 0, 0.5]],
  [[0.5, 0, 0.5], [0.5, 0, -0.5]],
  [[0.5, 0, -0.5], [-0.5, 0, -0.5]],
  [[-0.5, -0.5, 0], [0.5, -0.5, 0]],
  [[0.5, 0.5, 0], [-0.5, 0.5, 0]]
];
map.geometry.linesAngleX = [[0, 0], [0, 0], [0, 0], [0, 0], [Math.PI/2, Math.PI/2], [Math.PI/2, Math.PI/2]];
//map.geometry.uv = [[[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]], [[0, 0], [1, 0], [0, 1], [1, 1]], [[1, 1], [0, 1], [1, 0], [0, 0]]];
scene.objects.push(map);

camera.transform.position[2] = -5;
const renderer = new Renderer(scene, camera);
renderer.context = canvas.getContext("2d");
renderer.cameraScale = [1, 1];

let [mousePosition, prevMousePosition, mouseMovement] = [[0, 0], [0, 0], [0, 0]];
addEventListener("mousemove", (e) => {
    console.log(e);
    prevMousePosition = mousePosition;
	mousePosition = [e.clientX, e.clientY];
    mouseMovement = [e.movementX, e.movementY]
});

function control() {
    //Миша
    if (mouseMovement[0] != 0 || mouseMovement[1] != 0) camera.transform.rotation = Mathf.vectorsAddCoords(camera.transform.rotation, Mathf.vectorsMultipleCoords([-mouseMovement[1], mouseMovement[0]], [Time.deltaTime, Time.deltaTime]));
}

function updateTick() {
	window.requestAnimationFrame(updateTick);
	canvas.width = Math.round(window.innerWidth * properties.rendererResolution);
	canvas.height = Math.round(window.innerHeight * properties.rendererResolution);

	map.transform.rotation[0] += Time.deltaTime;
	map.transform.rotation[1] += Time.deltaTime;
	map.transform.rotation[2] += Time.deltaTime;

    control();

	renderer.screenSize = [canvas.width, canvas.height];
	renderer.aspectRatio = renderer.screenSize[0] / renderer.screenSize[1];
	renderer.updateConstants();
	renderer.rendering();
}
Time.deltaTimeUpdate();
updateTick();
