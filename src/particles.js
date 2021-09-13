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

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('particles/10.png');
/*
particles
*/
//Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 5000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
	positions[i] = (Math.random() - 0.5) * 3;
	colors[i] = Math.random();
}
particlesGeometry.setAttribute(
	'position',
	new THREE.BufferAttribute(positions, 3)
);
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// material
const particlesMaterials = new THREE.PointsMaterial();
particlesMaterials.size = 0.05;
particlesMaterials.sizeAttenuation = true;
particlesMaterials.color = new THREE.Color('#ff3eff');
// particlesMaterials.map = particleTexture;
particlesMaterials.transparent = true;
particlesMaterials.alphaMap = particleTexture;
// particlesMaterials.alphaTest = 0.001;
// particlesMaterials.depthTest = false;
particlesMaterials.depthWrite = false;
particlesMaterials.blending = THREE.AdditiveBlending;
particlesMaterials.vertexColors = true;
// particle
const particles = new THREE.Points(particlesGeometry, particlesMaterials);
scene.add(particles);

// adding cube in between
// const cube = new THREE.Mesh(
// 	new THREE.BoxBufferGeometry(),
// 	new THREE.MeshBasicMaterial()
// );
// scene.add(cube);
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
camera.position.z = 1;
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

	// update particles as a whole

	particles.rotation.y = -elapsedTime * 0.2;
	particles.rotation.x = -elapsedTime * 0.2;
	particles.rotation.z = elapsedTime * 0.5;

	// for (let i = 0; i < count; i++) {
	// const i3 = i * 3;
	// const x = particlesGeometry.attributes.position.array[i3];
	// particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime);
	// particlesGeometry.attributes.position.needsUpdate = true;
	// }
	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call loop again on the next frame
	window.requestAnimationFrame(loop);
};

loop();
