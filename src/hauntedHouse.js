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

// textures
const textureLoader = new THREE.TextureLoader();
//loading door textur
const doorColorTexture = textureLoader.load('door.jpg');
const doorAlphaTexture = textureLoader.load('/door/alpha.jpg');
const doorOcculisionTexture = textureLoader.load('/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('/door/height.jpg');
const doorNormalTexture = textureLoader.load('/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/door/roughness.jpg');
const bakedShadow = textureLoader.load('bakedShadow.jpg');
const simpleShadow = textureLoader.load('simpleShadow.jpg');

// housegroup
const house = new THREE.Group();
scene.add(house);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.12);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.12);
directionalLight.position.set(2, 2, -1);
directionalLight.castShadow = true;

scene.add(directionalLight);
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 5;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.radius = 10;

// directional Light Camera Helper
const directionalLighCameraHelper = new THREE.CameraHelper(
	directionalLight.shadow.camera
);
directionalLighCameraHelper.visible = false;
scene.add(directionalLighCameraHelper);

// spotlight
const spotLight = new THREE.SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.position.set(0, 2, 2);

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.fov = 30;
spotLight.shadow.camera.far = 5;
spotLight.shadow.camera.left = -2;
spotLight.shadow.camera.right = 2;
spotLight.shadow.camera.bottom = -2;
spotLight.shadow.camera.top = 2;
scene.add(spotLight);
scene.add(spotLight.target);
// spotlight Light Camera Helper
// const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
// scene.add(spotLightCameraHelper);

// const pointLight
const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, 1.4, 2.7);
doorLight.castShadow = true;
house.add(doorLight);
// fog
scene.fog = new THREE.Fog(' #abaeb0', 1, 20);
// const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
// scene.add(pointLightCameraHelper);
/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;

/**
 * Objects
 */

// walls
const walls = new THREE.Mesh(
	new THREE.BoxBufferGeometry(4, 2, 4),
	new THREE.MeshStandardMaterial({ color: '#ac8e82' })
);
walls.position.y = 0.55;
house.add(walls);

//roof
const roof = new THREE.Mesh(
	new THREE.ConeBufferGeometry(3.5, 1, 4),
	new THREE.MeshStandardMaterial({ color: '#b35f45' })
);
roof.rotation.y = Math.PI / 4;
roof.position.y = 2;
house.add(roof);

// door
const door = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(1.5, 1.5, 50, 50),
	new THREE.MeshStandardMaterial({
		transparent: true,
		map: doorColorTexture,
		alphaMap: doorAlphaTexture,
		aoMap: doorOcculisionTexture,
		displacementMap: doorHeightTexture,
		displacementScale: 0.1,
		normalMap: doorNormalTexture,
		metalnessMap: doorMetalnessTexture,
		roughnessMap: doorRoughnessTexture,
	})
);
//uv2 is for ambiend occulision,
door.geometry.setAttribute(
	'uv2',
	new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = 0.24;
door.position.z = 2;
house.add(door);

//bushes
const bushGeometery = new THREE.SphereBufferGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });

// bush1
const bush1 = new THREE.Mesh(bushGeometery, bushMaterial);
bush1.scale.set(0.26, 0.5, 0.15);
bush1.position.set(2, -0.25, 3);
// bush2
const bush2 = new THREE.Mesh(bushGeometery, bushMaterial);
bush2.scale.set(0.6, 0.3, 0.15);
bush2.position.set(2, -0.25, 3);
// bush3
const bush3 = new THREE.Mesh(bushGeometery, bushMaterial);
bush3.scale.set(0.26, 0.05, 0.15);
bush3.position.set(2, -0.25, 3);
// bush4
const bush4 = new THREE.Mesh(bushGeometery, bushMaterial);
bush4.scale.set(0.2, 0.35, 0.15);
bush4.position.set(2, -0.25, 3);

house.add(bush1, bush2, bush3, bush4);

//grave group
const graves = new THREE.Group();
scene.add(graves);
const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

for (let i = 0; i < 80; i++) {
	const angle = Math.random() * Math.PI * 2;
	const radius = 3 + Math.random() * 6;
	const x = Math.sin(angle) * radius;
	const z = Math.cos(angle) * radius;

	const grave = new THREE.Mesh(graveGeometry, graveMaterial);
	grave.position.set(x, 0, z);
	grave.rotation.y = (Math.random() - 0.5) * 0.5;
	grave.rotation.z = (Math.random() - 0.5) * 0.4;
	graves.add(grave);
}

// floor
const plane = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(20, 20),
	new THREE.MeshBasicMaterial({
		color: '#a9c388',
	})
);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;
scene.add(plane);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

// debug gui
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001);
gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001);
gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001);
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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.setClearColor('#abaeb0');
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
