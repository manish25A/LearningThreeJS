import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// galaxy
const parameters = {};
parameters.count = 1000;
parameters.size = 0.02;
parameters.radius = 5;
let geometry = null;
let material = null;
let points = null;
//geometry
const generateGalaxy = () => {
	// destory while changing values
	if (points !== null) {
		geometry.dispose();
		material.dispose();
		scene.remove(points);
	}

	geometry = new THREE.BufferGeometry();
	const positions = new Float32Array(parameters.count * 3);
	for (let i = 0; i < parameters.count; i++) {
		const i3 = i * 3;
		const radius = Math.random() * parameters.radius;
		positions[i3 + 0] = radius;
		positions[i3 + 1] = 0;
		positions[i3 + 2] = 0;
	}
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

	// Material for points
	material = new THREE.PointsMaterial({
		size: parameters.size,
		sizeAttenuation: true,
		depthWrite: false,
		blending: THREE.AdditiveBlending,
	});

	// Points
	points = new THREE.Points(geometry, material);
	scene.add(points);
};
generateGalaxy();
//gui for generate galaxy

gui
	.add(parameters, 'count')
	.min(100)
	.max(100000)
	.step(100)
	.onFinishChange(generateGalaxy);
gui
	.add(parameters, 'size')
	.min(0.001)
	.max(0.1)
	.step(0.001)
	.onFinishChange(generateGalaxy);
gui
	.add(parameters, 'radius')
	.min(0.001)
	.max(20)
	.step(0.001)
	.onFinishChange(generateGalaxy);
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const loop = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call loop again on the next frame
	window.requestAnimationFrame(loop);
};

loop();
