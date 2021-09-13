// animation

import './style.css';
import * as THREE from 'three';
import { Mesh, TextureLoader } from 'three';
import gsap from 'gsap'; //to create animations like timelines twins and all
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

//debug gui
//debug
const gui = new dat.GUI();

// cursor
//cursor coordinate only inside the canvas
const cursor = {
	x: 0,
	y: 0,
};
window.addEventListener('mousemove', (event) => {
	cursor.x = -(event.clientX / sizes.width - 0.5);
	cursor.y = event.clientY / sizes.height - 0.5;
});
// textures
const image = new Image();
const loadingManager = new THREE.LoadingManager();
// loadingManager.onStart = () => {};
// loadingManager.onLoad = () => {};
// loadingManager.onProgress = () => {};
const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load(
	'displacementMap.png'
	// () => {
	// 	console.log('load');
	// },
	// () => {
	// 	console.log('progress');
	// },
	// () => {
	// 	console.log('error');
	// }
);

// creating scene
const scene = new THREE.Scene();

// objects
const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1, 2);
const material = new THREE.MeshBasicMaterial({
	map: texture,
	// color: 0xff0000,
	// wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
const parameter = {
	color: 0x000fff,
	spin: () => {
		gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 });
	},
};
//gui debug
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('positionY');
gui.add(mesh.rotation, 'y').min(-3).max(3).step(0.01).name('rotateY');
gui.add(mesh, 'visible');
gui.add(mesh.position, 'x', -3, 3, 0.01);
gui.add(mesh.position, 'z', -3, 3, 0.01);
gui.addColor(parameter, 'color').onChange(() => {
	material.color.set(parameter.color);
});
gui.add(parameter, 'spin');

// axes helper(see the position of x y and z axis and their position)
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// mesh.position.normalize();
// sizes
const sizes = {
	width: window.innerHeight,
	height: window.innerHeight,
};
window.addEventListener('resize', () => {
	// update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
// listen to doubleclick for fullscreen handling
window.addEventListener('keypress', (event) => {
	const fullscreenElement =
		document.fullscreenElement || document.webkitFullScreen;
	if (event.key == 'f') {
		if (!fullscreenElement) {
			canvas.requestFullscreen();
		} else if (canvas.webkitRequestFullScreen) {
			//for safari
			canvas.webkitRequestFullScreen();
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullScreen) {
				document.webkitExitFullScreen();
			}
		}
	}
});

// Camera
// using logical camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	1, //near
	1000 //far
);

// time
let time = Date.now();

camera.position.z = 2;

scene.add(camera);

// renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true,
});

//controls
const controls = new OrbitControls(camera, canvas);
// controls.enableZoom = false;
controls.enableDamping = true; //for smoothness
// controls.target.y = 1;
// controls.update();

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
console.log(window.devicePixelRatio);
// //gsap animations
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });
//clock
const clock = new THREE.Clock();
// animations
const loop = () => {
	// clock
	// const elapsedTime = clock.getElapsedTime();
	// console.log(elapsedTime);
	// same for everyone
	// time
	// const currentTime = Date.now();
	// const afterTime = currentTime - time;
	// time = currentTime;
	// console.log(clock);

	//! updates objects
	// mesh.rotation.x += 0.01;
	// mesh.rotation.y = elapsedTime * Math.PI * 1; //one revolution per second
	// mesh.position.x = Math.sin(elapsedTime);
	// mesh.position.y = Math.cos(elapsedTime);
	// camera.lookAt(mesh.position);
	// mesh.position.y += 0.01;

	//update camera and objects
	// camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
	// camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
	// camera.position.y = cursor.y * 5;
	// camera.lookAt(mesh.position);
	// update controls
	controls.update(); //update controls on each frame for damping

	// render
	renderer.render(scene, camera);
	window.requestAnimationFrame(loop); //call the functioon on next frame
};

loop();
