// animation

import './style.css';
import * as THREE from 'three';
import {
	CubeTextureLoader,
	DirectionalLight,
	HemisphereLight,
	Mesh,
	PointLight,
	PointLightHelper,
	TextureLoader,
} from 'three';
import gsap from 'gsap'; //to create animations like timelines twins and all
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';

//debug gui
const gui = new dat.GUI();

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const doorColorTexture = textureLoader.load('door.jpg');
const doorNormalTexture = textureLoader.load('door/normal.jpg');
const doorRoughnessTexture = textureLoader.load('door/roughness.jpg');
const doorAlphaTexture = textureLoader.load('door/alpha.jpg');
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;

const environmentMapTexture = cubeTextureLoader.load([
	'/environmentMaps/1/px.png',
	'/environmentMaps/1/nx.png',
	'/environmentMaps/1/py.png',
	'/environmentMaps/1/ny.png',
	'/environmentMaps/1/pz.png',
	'/environmentMaps/1/nz.png',
]);
// creating scene
const scene = new THREE.Scene();
const material = new THREE.MeshStandardMaterial();

// light
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffd345);
ambientLight.intensity = 0.5;
// scene.add(ambientLight);

//directional lights
const directionalLight = new DirectionalLight(0xff00ff, 0.5);
scene.add(directionalLight);

// hemispherical light
const hemisphere = new THREE.HemisphereLight(0xffff00, 0x000fdf);
scene.add(hemisphere);

//pointLight
const pointLight = new THREE.PointLight(0xffffff, 0.7);
pointLight.position.set(1, 0.5, 3);
scene.add(pointLight);

// rect area light
const rectAreaLight = new THREE.RectAreaLight(0x00ffee, 2, 1, 1); //works only with standar and physical materail
rectAreaLight.intensity = 1;
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

//spotlight
const spotlight = new THREE.SpotLight(
	0x0033ff, //color
	0.5, //intensity
	10, //
	Math.PI * 0.1,
	0.25,
	1
);
spotlight.position.set(0, 2, 3);
spotlight.position.set(0, 2, 3);
scene.add(spotlight);

//helpers
const HemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphere, 0.2);
scene.add(HemisphereLightHelper);
//directionLightHelper
const directionalLightHelper = new THREE.DirectionalLightHelper(
	directionalLight,
	0.2
);
scene.add(directionalLightHelper);

//point light helper
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);

//spot light helper
const spotLightHelper = new THREE.SpotLightHelper(spotlight);
scene.add(spotLightHelper);
window.requestAnimationFrame(() => {
	spotLightHelper.update();
});

//rect area light helper
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);

window.requestAnimationFrame(() => {
	rectAreaLightHelper.position.copy(rectAreaLight.position);
	rectAreaLightHelper.quaternion.copy(rectAreaLight.quaternion);
	// rectAreaLightHelper.position.x = rectAreaLight.position.x;
	// rectAreaLightHelper.position.y = rectAreaLight.position.y;
	// rectAreaLightHelper.position.z = rectAreaLight.position.z;
	rectAreaLightHelper.update();
});

material.metalness = 0.45;
material.roughness = 0.1;

gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.0001);
gui
	.add(directionalLight, 'intensity')
	.min(0)
	.max(1)
	.step(0.0001)
	.name('directional light intensity');

// objects
const sphere = new THREE.Mesh(
	new THREE.SphereBufferGeometry(0.5, 32, 32),
	material
);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(
	new THREE.BoxBufferGeometry(0.75, 0.75, 0.75),
	material
);

const torus = new THREE.Mesh(
	new THREE.TorusBufferGeometry(0.3, 0.2, 32, 64),
	material
);

torus.position.x = 1.5;

const ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(5, 5), material);
ground.rotation.x = -Math.PI * 0.5;
ground.position.y = -0.5;

scene.add(sphere, cube, torus, ground);

// axes helper(see the position of x y and z axis and their position)
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// mesh.position.normalize();

//lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 0.5);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);
// sizes
const sizes = {
	width: window.innerHeight,
	height: window.innerHeight,
};
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
// controls.enableDamping = true; //for smoothness
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
	const elapsedTime = clock.getElapsedTime();
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
	// rotate or update objects
	sphere.rotation.y = 0.15 * elapsedTime;
	torus.rotation.y = 0.15 * elapsedTime;
	cube.rotation.y = 0.15 * elapsedTime;
	// update controls
	// controls.update(); //update controls on each frame for damping

	// render
	renderer.render(scene, camera);
	window.requestAnimationFrame(loop); //call the functioon on next frame
};

loop();
