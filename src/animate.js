// animation

import './style.css';
import * as THREE from 'three';
import { Mesh } from 'three';

// creating scene
const scene = new THREE.Scene();

// objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// axes helper(see the position of x y and z axis and their position)
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// mesh.position.normalize();
// sizes
const sizes = {
	width: 400,
	height: 400,
};

// Camera
// using logical camera
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height);

// time
let time = Date.now();

camera.position.z = 3;

scene.add(camera);

// renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
	canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//clock
const clock = new THREE.Clock();
// animations
const loop = () => {
	// clock
	const elapsedTime = clock.getElapsedTime();
	// console.log(elapsedTime);
	// same for everyone
	// time
	// const currentTime = Date.now();
	// const afterTime = currentTime - time;
	// time = currentTime;
	// console.log(clock);

	//! updates objects
	// mesh.rotation.x += -0.01;
	mesh.rotation.y = elapsedTime * Math.PI * 2; //one revolution per second
	mesh.position.x = Math.sin(elapsedTime);
	mesh.position.y = Math.cos(elapsedTime);
	camera.lookAt(mesh.position);
	// mesh.position.y += 0.01;

	// render
	renderer.render(scene, camera);
	window.requestAnimationFrame(loop); //call the functioon on next frame
};

loop();
