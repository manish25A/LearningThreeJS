// animation

import './style.css';
import * as THREE from 'three';
import { Mesh } from 'three';
import gsap from 'gsap'; //to create animations like timelines twins and all

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
	width: window.innerWidth,
	height: window.innerHeight,
};

// Camera
// using logical camera
const camera = new THREE.PerspectiveCamera(
	100,
	sizes.width / sizes.height,
	1, //near
	1000 //far
);

// time
let time = Date.now();

camera.position.z = 2;
camera.position.y = 1;
camera.position.x = 1;

scene.add(camera);

// renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
// //gsap animations
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });
//clock
const clock = new THREE.Clock();
// animations
const loop = () => {
	// clock
	const elapsedTime = clock.getElapsedTime();
	// console.log(elapsedTime);
	// same for everyone
	// time
	const currentTime = Date.now();
	const afterTime = currentTime - time;
	time = currentTime;
	console.log(clock);

	//! updates objects
	// mesh.rotation.x += 0.01;
	mesh.rotation.y = elapsedTime * Math.PI * 1; //one revolution per second
	// mesh.position.x = Math.sin(elapsedTime);
	// mesh.position.y = Math.cos(elapsedTime);
	camera.lookAt(mesh.position);
	// mesh.position.y += 0.01;

	// render
	renderer.render(scene, camera);
	window.requestAnimationFrame(loop); //call the functioon on next frame
};

loop();
